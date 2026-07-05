import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/search";
import type { ServiceResult } from "@/lib/types";

type ServiceRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: ServiceRouteContext
): Promise<NextResponse<ServiceResult | { error: string }>> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return NextResponse.json({ error: "Service provider not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}
