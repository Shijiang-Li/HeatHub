import type { MetadataRoute } from "next";
import { categoryLabels } from "@/lib/content";
import { cities, merchants, products, serviceProviders } from "@/lib/data";
import { promotionGuides } from "@/lib/promotion";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heathub-xi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/map",
    "/guides",
    "/guides/chinese-cooling-brands-europe",
    "/promote",
    "/about",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-07-06")
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt)
  }));

  const merchantRoutes = merchants.map((merchant) => ({
    url: `${siteUrl}/merchants/${merchant.slug}`,
    lastModified: new Date(merchant.updatedAt)
  }));

  const serviceRoutes = serviceProviders.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(service.sourceUpdatedAt)
  }));

  const cityRoutes = cities.flatMap((city) => [
    {
      url: `${siteUrl}/cities/${city.slug}`,
      lastModified: new Date("2026-07-05")
    },
    ...Object.keys(categoryLabels).map((category) => ({
      url: `${siteUrl}/cities/${city.slug}/${category}`,
      lastModified: new Date("2026-07-05")
    }))
  ]);

  const categoryRoutes = Object.keys(categoryLabels).map((category) => ({
    url: `${siteUrl}/categories/${category}`,
    lastModified: new Date("2026-07-05")
  }));

  const promotionGuideRoutes = promotionGuides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: new Date("2026-07-06")
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...merchantRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...categoryRoutes,
    ...promotionGuideRoutes
  ];
}
