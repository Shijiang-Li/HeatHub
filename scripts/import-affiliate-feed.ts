import { readFile } from "node:fs/promises";
import { affiliateFeedSchema, normalizeFeedProducts } from "../lib/feed-schema";

async function main() {
  const feedPath = process.argv[2] ?? "data/affiliate-feed.sample.json";
  const rawFeed = await readFile(feedPath, "utf8");
  const feed = affiliateFeedSchema.parse(JSON.parse(rawFeed));
  const normalizedProducts = normalizeFeedProducts(feed);

  console.info(
    JSON.stringify(
      {
        source: {
          id: feed.source.id,
          name: feed.source.name,
          website: feed.source.website
        },
        productCount: normalizedProducts.length,
        products: normalizedProducts
      },
      null,
      2
    )
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
