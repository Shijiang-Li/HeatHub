import { NextResponse } from "next/server";
import { getDataSnapshot } from "@/lib/live-data";
import type { OutboundClickRequest, OutboundClickResponse } from "@/lib/types";

const allowedTargets = new Set(["product", "merchant", "service"]);

export async function POST(
  request: Request
): Promise<NextResponse<OutboundClickResponse | { error: string }>> {
  const payload = (await request.json().catch(() => undefined)) as
    | Partial<OutboundClickRequest>
    | undefined;

  if (
    !payload ||
    !payload.target_type ||
    !allowedTargets.has(payload.target_type) ||
    !payload.target_id ||
    !payload.destination_url
  ) {
    return NextResponse.json({ error: "Invalid outbound click payload" }, { status: 400 });
  }

  const destination = safeOutboundUrl(payload.destination_url);

  const snapshot = await getDataSnapshot();

  if (!destination || !isKnownDestination(payload, destination, snapshot)) {
    return NextResponse.json({ error: "Invalid outbound destination" }, { status: 400 });
  }

  console.info("outbound_click", {
    targetType: payload.target_type,
    targetId: payload.target_id,
    destinationUrl: destination,
    referrerPath: payload.referrer_path,
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({
    redirect_url: destination
  });
}

function safeOutboundUrl(value: string): string | undefined {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

function isKnownDestination(
  payload: Partial<OutboundClickRequest>,
  destination: string,
  snapshot: Awaited<ReturnType<typeof getDataSnapshot>>
): boolean {
  if (payload.target_type === "product") {
    const product = snapshot.products.find((item) => item.id === payload.target_id);
    return Boolean(
      product &&
        [product.merchantProductUrl, product.affiliateUrl].filter(Boolean).includes(destination)
    );
  }

  if (payload.target_type === "merchant") {
    const merchant = snapshot.merchants.find((item) => item.id === payload.target_id);
    return Boolean(
      merchant && [merchant.websiteUrl, merchant.affiliateBaseUrl].filter(Boolean).includes(destination)
    );
  }

  if (payload.target_type === "service") {
    const service = snapshot.serviceProviders.find((item) => item.id === payload.target_id);
    return Boolean(
      service && [service.websiteUrl, service.affiliateUrl].filter(Boolean).includes(destination)
    );
  }

  return false;
}
