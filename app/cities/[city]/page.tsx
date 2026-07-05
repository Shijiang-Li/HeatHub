import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductCard } from "@/components/product-card";
import { ServiceCard } from "@/components/service-card";
import { WeatherBanner } from "@/components/weather-banner";
import { cities } from "@/lib/data";
import { searchHeatHub } from "@/lib/search";

type CityPageProps = {
  params: Promise<{
    city: string;
  }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);

  return {
    title: city ? `${city.name} cooling search` : "City cooling search",
    description: city
      ? `Search cooling products, service providers, and weather context in ${city.name}.`
      : "Search cooling products, service providers, and weather context by city."
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug);

  if (!city) {
    notFound();
  }

  const results = searchHeatHub({ city: city.name });

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">Cooling options in {city.name}</h1>
      <WeatherBanner weather={results.weather} />
      <CategoryTabs city={city.name} />
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
    </div>
  );
}
