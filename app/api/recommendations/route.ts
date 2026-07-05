import { NextResponse } from "next/server";
import { recommendFromResults } from "@/lib/recommendation";
import { parseCategory, searchHeatHubLive } from "@/lib/search";
import type { RecommendationResponse } from "@/lib/recommendation";

export async function GET(request: Request): Promise<NextResponse<RecommendationResponse>> {
  const { searchParams } = new URL(request.url);

  const results = await searchHeatHubLive({
      q: searchParams.get("q") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      country: searchParams.get("country") ?? undefined,
      category: parseCategory(searchParams.get("category"))
  });

  return NextResponse.json(recommendFromResults(results));
}
