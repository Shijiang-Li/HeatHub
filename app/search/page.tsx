import type { Metadata } from "next";
import { CategoryTabs } from "@/components/category-tabs";
import { EmptyState } from "@/components/empty-state";
import { MapPanel } from "@/components/map-panel";
import { MerchantCard } from "@/components/merchant-card";
import { ProductCard } from "@/components/product-card";
import { RecommendationPanel } from "@/components/recommendation-panel";
import { SearchForm } from "@/components/search-form";
import { ServiceCard } from "@/components/service-card";
import { SortMenu } from "@/components/sort-menu";
import { WeatherBanner } from "@/components/weather-banner";
import { parseCategory, parseSort, searchHeatHubLive } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search urgent cooling options",
  description:
    "Search and compare cooling products, merchants, service providers, weather context, and official outbound links."
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const q = getParam(resolvedSearchParams.q);
  const city = getParam(resolvedSearchParams.city);
  const country = getParam(resolvedSearchParams.country);
  const category = parseCategory(getParam(resolvedSearchParams.category) ?? null);
  const sort = parseSort(getParam(resolvedSearchParams.sort) ?? null);
  const delivery = getParam(resolvedSearchParams.delivery);
  const installation = getParam(resolvedSearchParams.installation) === "true";
  const results = await searchHeatHubLive({
    q,
    city,
    country,
    category,
    sort,
    delivery: delivery === "today" || delivery === "pickup" ? delivery : undefined,
    installation
  });

  const hasResults =
    results.products.length > 0 || results.services.length > 0 || results.merchants.length > 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-heat">Search HeatHub</p>
        <h1 className="mt-2 text-3xl font-semibold">Compare cooling options</h1>
      </div>
      <SearchForm
        defaultQuery={q}
        defaultCity={city}
        defaultCategory={category}
        defaultSort={sort}
      />
      <WeatherBanner weather={results.weather} />
      <RecommendationPanel results={results} />
      <CategoryTabs city={city} activeCategory={category} />
      <SortMenu
        current={sort}
        query={{
          q,
          city,
          country,
          category,
          delivery,
          installation: installation ? "true" : undefined
        }}
      />
      <p className="text-sm text-ink/70">{results.rankingExplanation}</p>
      <p className="text-xs font-medium text-ink/60">
        Data source: {results.dataSourceMode === "live" ? "approved live feed" : "curated fallback"}
      </p>

      {!hasResults ? (
        <EmptyState />
      ) : (
        <div className="grid gap-8">
          {results.products.length > 0 && (
            <section className="grid gap-4" aria-labelledby="product-results">
              <h2 id="product-results" className="text-2xl font-semibold">
                Products
              </h2>
              {results.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          )}

          {results.services.length > 0 && (
            <section className="grid gap-4" aria-labelledby="service-results">
              <h2 id="service-results" className="text-2xl font-semibold">
                Services
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          )}

          {results.merchants.length > 0 && (
            <section className="grid gap-4" aria-labelledby="merchant-results">
              <h2 id="merchant-results" className="text-2xl font-semibold">
                Merchants
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {results.merchants.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} />
                ))}
              </div>
            </section>
          )}

          <MapPanel city={city} />
        </div>
      )}
    </div>
  );
}

function getParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
