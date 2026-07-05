import Link from "next/link";
import { CategoryTabs } from "@/components/category-tabs";
import { ProductCard } from "@/components/product-card";
import { SearchForm } from "@/components/search-form";
import { ServiceCard } from "@/components/service-card";
import { WeatherBanner } from "@/components/weather-banner";
import { searchHeatHubLive } from "@/lib/search";

export default async function HomePage() {
  const results = await searchHeatHubLive({ city: "Madrid", sort: "recommended" });
  const featuredProducts = results.products.slice(0, 2);
  const featuredServices = results.services.slice(0, 2);

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-heat">
              Europe heat response search
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Find the fastest reliable cooling option near you.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/70">
              Search products, merchants, installers, repair providers, cooling centers, and weather context.
            </p>
          </div>
          <div className="self-end">
            <SearchForm defaultCity="Madrid" compact />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
        <WeatherBanner weather={results.weather} />
        <CategoryTabs city="Madrid" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Recommended in Madrid</h2>
            <p className="mt-1 text-sm text-ink/70">{results.rankingExplanation}</p>
          </div>
          <Link className="focus-ring rounded-md font-semibold text-mint hover:text-ink" href="/search?city=Madrid">
            View all results
          </Link>
        </div>
        <div className="grid gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
