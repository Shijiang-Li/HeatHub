import { NextResponse } from "next/server";
import { getProductBySlugLive } from "@/lib/search";
import type { ProductResult } from "@/lib/types";

type ProductRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: ProductRouteContext
): Promise<NextResponse<ProductResult | { error: string }>> {
  const { slug } = await params;
  const product = await getProductBySlugLive(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
