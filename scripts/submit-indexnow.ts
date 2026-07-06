import { categoryLabels } from "../lib/content";
import { cities, merchants, products, serviceProviders } from "../lib/data";
import { promotionGuides } from "../lib/promotion";

const indexNowKey = "5b2c631c716a4c9e91af157d2b230813";
const defaultSiteUrl = "https://heathub-xi.vercel.app";
const indexNowEndpoint = process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/indexnow";
const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl);
const host = new URL(siteUrl).host;
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;

async function main() {
  const urls = uniqueUrls(buildUrlList());
  const batches = chunk(urls, 1000);
  const results: Array<{ status: number; count: number; body: string }> = [];

  for (const batch of batches) {
    const response = await fetch(indexNowEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        host,
        key: indexNowKey,
        keyLocation,
        urlList: batch
      })
    });

    results.push({
      status: response.status,
      count: batch.length,
      body: await response.text().catch(() => "")
    });
  }

  for (const result of results) {
    console.log(`IndexNow status=${result.status} urls=${result.count}`);
    if (result.body) {
      console.log(result.body);
    }
  }

  const failed = results.filter((result) => ![200, 202].includes(result.status));

  if (failed.length > 0) {
    throw new Error(`IndexNow submission failed for ${failed.length} batch(es).`);
  }
}

function buildUrlList(): string[] {
  const staticPaths = [
    "",
    "/search",
    "/map",
    "/guides",
    "/guides/chinese-cooling-brands-europe",
    "/promote",
    "/about",
    "/privacy",
    "/terms",
    "/sitemap.xml"
  ];

  const cityPaths = cities.flatMap((city) => [
    `/cities/${city.slug}`,
    ...Object.keys(categoryLabels).map((category) => `/cities/${city.slug}/${category}`)
  ]);

  const categoryPaths = Object.keys(categoryLabels).map((category) => `/categories/${category}`);
  const productPaths = products.map((product) => `/products/${product.slug}`);
  const merchantPaths = merchants.map((merchant) => `/merchants/${merchant.slug}`);
  const servicePaths = serviceProviders.map((service) => `/services/${service.slug}`);
  const promotionGuidePaths = promotionGuides.map((guide) => `/guides/${guide.slug}`);

  return [
    ...staticPaths,
    ...cityPaths,
    ...categoryPaths,
    ...productPaths,
    ...merchantPaths,
    ...servicePaths,
    ...promotionGuidePaths
  ].map((path) => `${siteUrl}${path}`);
}

function normalizeSiteUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls)];
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
