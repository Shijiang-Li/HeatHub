import {
  cities,
  merchants,
  products as seedProducts,
  serviceProviders,
  weatherSnapshots
} from "@/lib/data";
import { affiliateFeedSchema, normalizeFeedProducts } from "@/lib/feed-schema";
import type { Product } from "@/lib/types";

export type DataSnapshot = {
  cities: typeof cities;
  merchants: typeof merchants;
  products: Product[];
  serviceProviders: typeof serviceProviders;
  weatherSnapshots: typeof weatherSnapshots;
  sourceMode: "live" | "seed";
  feedErrors: string[];
};

const defaultRevalidateSeconds = 300;

export async function getDataSnapshot(): Promise<DataSnapshot> {
  const remoteFeedUrls = getFeedUrls();

  if (remoteFeedUrls.length === 0) {
    return seedSnapshot([]);
  }

  const feedResults = await Promise.allSettled(remoteFeedUrls.map(fetchAffiliateFeed));
  const feedErrors: string[] = [];
  const liveProducts: Product[] = [];

  for (const result of feedResults) {
    if (result.status === "fulfilled") {
      liveProducts.push(...result.value);
    } else {
      feedErrors.push(result.reason instanceof Error ? result.reason.message : "Unknown feed error");
    }
  }

  if (liveProducts.length === 0) {
    return seedSnapshot(feedErrors);
  }

  return {
    cities,
    merchants,
    products: mergeProducts(seedProducts, liveProducts),
    serviceProviders,
    weatherSnapshots,
    sourceMode: "live",
    feedErrors
  };
}

function getFeedUrls(): string[] {
  return (process.env.AFFILIATE_FEED_URLS ?? "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)
    .filter((url) => {
      try {
        return new URL(url).protocol === "https:";
      } catch {
        return false;
      }
    });
}

async function fetchAffiliateFeed(url: string): Promise<Product[]> {
  const response = await fetch(url, {
    next: {
      revalidate: getRevalidateSeconds()
    }
  });

  if (!response.ok) {
    throw new Error(`Feed ${url} returned ${response.status}`);
  }

  const feed = affiliateFeedSchema.parse(await response.json());
  const knownMerchantIds = new Set(merchants.map((merchant) => merchant.id));

  return normalizeFeedProducts(feed).filter((product) => knownMerchantIds.has(product.merchantId));
}

function mergeProducts(seed: Product[], live: Product[]): Product[] {
  const byId = new Map<string, Product>();

  for (const product of seed) {
    byId.set(product.id, product);
  }

  for (const product of live) {
    byId.set(product.id, product);
  }

  return [...byId.values()];
}

function seedSnapshot(feedErrors: string[]): DataSnapshot {
  return {
    cities,
    merchants,
    products: seedProducts,
    serviceProviders,
    weatherSnapshots,
    sourceMode: "seed",
    feedErrors
  };
}

function getRevalidateSeconds(): number {
  const parsed = Number(process.env.FEED_REVALIDATE_SECONDS);

  if (Number.isFinite(parsed) && parsed >= 60) {
    return parsed;
  }

  return defaultRevalidateSeconds;
}
