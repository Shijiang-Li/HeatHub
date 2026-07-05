import { NextResponse } from "next/server";
import { getMerchantBySlugLive } from "@/lib/search";
import type { MerchantWithProducts } from "@/lib/search";

type MerchantRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: MerchantRouteContext
): Promise<NextResponse<MerchantWithProducts | { error: string }>> {
  const { slug } = await params;
  const merchant = await getMerchantBySlugLive(slug);

  if (!merchant) {
    return NextResponse.json({ error: "Merchant not found" }, { status: 404 });
  }

  return NextResponse.json(merchant);
}
