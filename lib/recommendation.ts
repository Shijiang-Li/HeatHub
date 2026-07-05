import { searchHeatHub } from "@/lib/search";
import type { SearchFilters, SearchResponse } from "@/lib/types";

export type RecommendationResponse = {
  title: string;
  summary: string;
  targetType: "product" | "service" | "none";
  targetId?: string;
  reasons: string[];
};

export function recommendFastestReliableOption(
  filters: SearchFilters
): RecommendationResponse {
  return recommendFromResults(
    searchHeatHub({
      ...filters,
      sort: "recommended"
    })
  );
}

export function recommendFromResults(results: SearchResponse): RecommendationResponse {
  const topProduct = results.products[0];
  const topService = results.services[0];

  if (!topProduct && !topService) {
    return {
      title: "No recommendation available",
      summary: "Try a broader city or category to compare more approved sources.",
      targetType: "none",
      reasons: ["No matching source data"]
    };
  }

  if (!topService || (topProduct && topProduct.score >= topService.score)) {
    return {
      title: topProduct.name,
      summary: `${topProduct.merchant.name} is the strongest match for speed, rating, freshness, and local heat context.`,
      targetType: "product",
      targetId: topProduct.id,
      reasons: topProduct.reasons
    };
  }

  return {
    title: topService.name,
    summary: `${topService.name} is the strongest service match for response time, distance, and emergency availability.`,
    targetType: "service",
    targetId: topService.id,
    reasons: topService.reasons
  };
}
