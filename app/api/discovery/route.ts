import { NextResponse } from "next/server";
import { discoverOpenDataPlaces } from "@/lib/open-data-discovery";
import { parseCategory } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 20);
  const places = await discoverOpenDataPlaces({
    city: searchParams.get("city") ?? undefined,
    category: parseCategory(searchParams.get("category")),
    limit: Number.isFinite(limit) ? limit : 20
  });

  return NextResponse.json({
    source: "OpenStreetMap",
    mode: "live-open-data",
    places
  });
}
