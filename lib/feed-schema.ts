import { z } from "zod";
import type { Product } from "./types";

export const affiliateFeedSchema = z.object({
  source: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    website: z.string().url(),
    license_notes: z.string().min(1),
    allowed_use: z.string().min(1)
  }),
  products: z.array(
    z.object({
      id: z.string().min(1),
      merchant_id: z.string().min(1),
      category: z.enum([
        "portable-ac",
        "fan",
        "ac-installation",
        "ac-repair",
        "generator",
        "ice",
        "cooling-center"
      ]),
      name: z.string().min(1),
      slug: z.string().min(1),
      brand: z.string().min(1),
      description: z.string().min(1),
      price: z.number().nonnegative(),
      currency: z.literal("EUR"),
      delivery_estimate: z.string().min(1),
      delivery_hours: z.number().int().nonnegative(),
      pickup_available: z.boolean(),
      installation_available: z.boolean(),
      merchant_product_url: z.string().url(),
      affiliate_url: z.string().url().optional(),
      image_url: z.string().min(1),
      source_updated_at: z.string().datetime()
    })
  )
});

export type AffiliateFeed = z.infer<typeof affiliateFeedSchema>;

export function normalizeFeedProducts(feed: AffiliateFeed): Product[] {
  return feed.products.map((product) => ({
    id: product.id,
    merchantId: product.merchant_id,
    category: product.category,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    description: product.description,
    price: product.price,
    currency: product.currency,
    deliveryEstimate: product.delivery_estimate,
    deliveryHours: product.delivery_hours,
    pickupAvailable: product.pickup_available,
    installationAvailable: product.installation_available,
    merchantProductUrl: product.merchant_product_url,
    affiliateUrl: product.affiliate_url,
    imageUrl: product.image_url,
    sourceUpdatedAt: product.source_updated_at,
    createdAt: product.source_updated_at,
    updatedAt: product.source_updated_at
  }));
}
