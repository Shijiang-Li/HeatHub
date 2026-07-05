import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { ServiceCard } from "@/components/service-card";
import { WeatherBanner } from "@/components/weather-banner";
import { categoryLabels } from "@/lib/content";
import { cities } from "@/lib/data";
import { parseCategory, searchHeatHub } from "@/lib/search";
import type { Category } from "@/lib/types";

type CityCategoryPageProps = {
  params: Promise<{
    city: string;
    category: string;
  }>;
};

const categorySlugs: Category[] = [
  "portable-ac",
  "fan",
  "ac-installation",
  "ac-repair",
  "generator",
  "ice",
  "cooling-center"
];

export function generateStaticParams() {
  return cities.flatMap((city) =>
    categorySlugs.map((category) => ({
      city: city.slug,
      category
    }))
  );
}

export async function generateMetadata({
  params
}: CityCategoryPageProps): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const category = parseCategory(categorySlug);
  const label = category ? categoryLabels[category] : "Cooling";

  return {
    title: city ? `${label} in ${city.name}` : `${label} search`,
    description: city
      ? `Compare ${label.toLowerCase()} options, weather context, and official links in ${city.name}.`
      : `Compare ${label.toLowerCase()} options, weather context, and official links.`
  };
}

export default async function CityCategoryPage({ params }: CityCategoryPageProps) {
  const { city: citySlug, category: categorySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);
  const category = parseCategory(categorySlug);

  if (!city || !category) {
    notFound();
  }

  const results = searchHeatHub({ city: city.name, category });
  const hasResults = results.products.length > 0 || results.services.length > 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">
        {categoryLabels[category]} in {city.name}
      </h1>
      <WeatherBanner weather={results.weather} />
      {!hasResults ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid gap-4">
            {results.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          <section className="grid gap-4 md:grid-cols-2">
            {results.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
