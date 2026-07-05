import { NextResponse } from "next/server";
import { parseCategory, parseSort, searchHeatHubLive } from "@/lib/search";
import type { SearchResponse } from "@/lib/types";

export async function GET(request: Request): Promise<NextResponse<SearchResponse>> {
  const { searchParams } = new URL(request.url);
  const delivery = searchParams.get("delivery");
  const response = await searchHeatHubLive({
    q: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    country: searchParams.get("country") ?? undefined,
    category: parseCategory(searchParams.get("category")),
    sort: parseSort(searchParams.get("sort")),
    delivery: delivery === "today" || delivery === "pickup" ? delivery : undefined,
    installation: searchParams.get("installation") === "true"
  });

  return NextResponse.json(response);
}
