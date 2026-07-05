import {
  cities,
  merchants,
  products,
  serviceProviders,
  weatherSnapshots
} from "@/lib/data";
import type {
  Category,
  Merchant,
  Product,
  ProductResult,
  SearchFilters,
  SearchResponse,
  ServiceProvider,
  ServiceResult,
  SortOption,
  WeatherSnapshot
} from "@/lib/types";
import { getDataSnapshot, type DataSnapshot } from "@/lib/live-data";

type SearchDataset = Pick<DataSnapshot, "merchants" | "products" | "serviceProviders"> &
  Partial<Pick<DataSnapshot, "sourceMode" | "feedErrors">>;

const sortOptions: SortOption[] = [
  "recommended",
  "fastest",
  "lowest-price",
  "nearest",
  "highest-rated",
  "recently-updated"
];

const categories: Category[] = [
  "portable-ac",
  "fan",
  "ac-installation",
  "ac-repair",
  "generator",
  "ice",
  "cooling-center"
];

export function parseCategory(value: string | null): Category | undefined {
  return categories.find((category) => category === value);
}

export function parseSort(value: string | null): SortOption {
  return sortOptions.find((sort) => sort === value) ?? "recommended";
}

export function normalize(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

export function findCity(city: string | undefined) {
  const normalized = normalize(city);
  if (!normalized) {
    return undefined;
  }

  return cities.find(
    (item) =>
      item.slug === normalized ||
      item.name.toLowerCase() === normalized ||
      item.country.toLowerCase() === normalized
  );
}

export function getWeatherForCity(cityName: string | undefined): WeatherSnapshot | undefined {
  const city = findCity(cityName);
  if (!city) {
    return weatherSnapshots[0];
  }

  return weatherSnapshots.find((weather) => weather.cityId === city.id);
}

function textMatchesProduct(
  product: Product,
  query: string,
  datasetMerchants: Merchant[]
): boolean {
  if (!query) {
    return true;
  }

  const merchant = datasetMerchants.find((item) => item.id === product.merchantId);
  const haystack = [
    product.name,
    product.brand,
    product.description,
    product.category,
    merchant?.name,
    merchant?.city,
    merchant?.country
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function textMatchesService(service: ServiceProvider, query: string): boolean {
  if (!query) {
    return true;
  }

  return [service.name, service.serviceType, service.city, service.country]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function freshnessScore(updatedAt: string): number {
  const updated = new Date(updatedAt).getTime();
  const now = new Date("2026-07-05T08:00:00.000Z").getTime();
  const hours = Math.max(1, (now - updated) / 36e5);
  return Math.max(0, 20 - hours);
}

function weatherUrgency(weather: WeatherSnapshot | undefined): number {
  if (!weather) {
    return 0;
  }

  if (weather.alertLevel === "extreme") {
    return 18;
  }

  if (weather.alertLevel === "high") {
    return 12;
  }

  if (weather.alertLevel === "watch") {
    return 6;
  }

  return 0;
}

function productReasons(product: Product, merchantRating: number): string[] {
  const reasons: string[] = [];

  if (product.deliveryHours <= 8) {
    reasons.push("Fastest delivery");
  }

  if (product.pickupAvailable) {
    reasons.push("Pickup available");
  }

  if (product.installationAvailable) {
    reasons.push("Installation available");
  }

  if (merchantRating >= 4.6) {
    reasons.push("Highly rated merchant");
  }

  if (freshnessScore(product.sourceUpdatedAt) > 12) {
    reasons.push("Recently updated");
  }

  return reasons.slice(0, 3);
}

function serviceReasons(service: ServiceProvider): string[] {
  const reasons: string[] = [];

  if (service.emergencyAvailable) {
    reasons.push("Emergency availability");
  }

  if (service.responseHours <= 8) {
    reasons.push("Fast response");
  }

  if (service.distanceKm <= 3) {
    reasons.push("Nearby provider");
  }

  if (service.rating >= 4.6) {
    reasons.push("Highly rated");
  }

  return reasons.slice(0, 3);
}

function scoreProduct(
  product: Product,
  weather: WeatherSnapshot | undefined,
  datasetMerchants: Merchant[]
): ProductResult | undefined {
  const merchant = datasetMerchants.find((item) => item.id === product.merchantId);
  if (!merchant) {
    return undefined;
  }

  const deliveryScore = Math.max(0, 30 - product.deliveryHours);
  const distanceScore = Math.max(0, 15 - merchant.distanceKm * 2);
  const priceScore = Math.max(0, 20 - product.price / 40);
  const ratingScore = merchant.rating * 4;
  const installScore = product.installationAvailable ? 7 : 0;
  const score =
    deliveryScore +
    distanceScore +
    priceScore +
    ratingScore +
    installScore +
    freshnessScore(product.sourceUpdatedAt) +
    weatherUrgency(weather);

  return {
    ...product,
    merchant,
    score: Math.round(score),
    reasons: productReasons(product, merchant.rating)
  };
}

function scoreService(
  service: ServiceProvider,
  weather: WeatherSnapshot | undefined
): ServiceResult {
  const responseScore = Math.max(0, 28 - service.responseHours);
  const distanceScore = Math.max(0, 15 - service.distanceKm * 2);
  const emergencyScore = service.emergencyAvailable ? 12 : 0;
  const ratingScore = service.rating * 5;
  const score =
    responseScore +
    distanceScore +
    emergencyScore +
    ratingScore +
    freshnessScore(service.sourceUpdatedAt) +
    weatherUrgency(weather);

  return {
    ...service,
    score: Math.round(score),
    reasons: serviceReasons(service)
  };
}

function sortProducts(results: ProductResult[], sort: SortOption): ProductResult[] {
  return [...results].sort((a, b) => {
    if (sort === "fastest") {
      return a.deliveryHours - b.deliveryHours;
    }

    if (sort === "lowest-price") {
      return a.price - b.price;
    }

    if (sort === "nearest") {
      return a.merchant.distanceKm - b.merchant.distanceKm;
    }

    if (sort === "highest-rated") {
      return b.merchant.rating - a.merchant.rating;
    }

    if (sort === "recently-updated") {
      return new Date(b.sourceUpdatedAt).getTime() - new Date(a.sourceUpdatedAt).getTime();
    }

    return b.score - a.score;
  });
}

function sortServices(results: ServiceResult[], sort: SortOption): ServiceResult[] {
  return [...results].sort((a, b) => {
    if (sort === "fastest") {
      return a.responseHours - b.responseHours;
    }

    if (sort === "nearest") {
      return a.distanceKm - b.distanceKm;
    }

    if (sort === "highest-rated") {
      return b.rating - a.rating;
    }

    if (sort === "recently-updated") {
      return new Date(b.sourceUpdatedAt).getTime() - new Date(a.sourceUpdatedAt).getTime();
    }

    return b.score - a.score;
  });
}

export function searchHeatHub(filters: SearchFilters): SearchResponse {
  return searchHeatHubFromData(filters, {
    merchants,
    products,
    serviceProviders
  });
}

export async function searchHeatHubLive(filters: SearchFilters): Promise<SearchResponse> {
  const snapshot = await getDataSnapshot();
  return searchHeatHubFromData(filters, snapshot);
}

export function searchHeatHubFromData(
  filters: SearchFilters,
  dataset: SearchDataset
): SearchResponse {
  const q = normalize(filters.q);
  const city = normalize(filters.city);
  const country = normalize(filters.country);
  const sort = filters.sort ?? "recommended";
  const weather = getWeatherForCity(filters.city);

  const productResults = dataset.products
    .filter((product) => {
      const merchant = dataset.merchants.find((item) => item.id === product.merchantId);
      if (!merchant) {
        return false;
      }

      const cityMatches = !city || merchant.city.toLowerCase() === city;
      const countryMatches = !country || merchant.country.toLowerCase() === country;
      const categoryMatches = !filters.category || product.category === filters.category;
      const deliveryMatches =
        !filters.delivery ||
        (filters.delivery === "today" && product.deliveryHours <= 24) ||
        (filters.delivery === "pickup" && product.pickupAvailable);
      const installationMatches =
        !filters.installation || product.installationAvailable;

      return (
        cityMatches &&
        countryMatches &&
        categoryMatches &&
        deliveryMatches &&
        installationMatches &&
        textMatchesProduct(product, q, dataset.merchants)
      );
    })
    .map((product) => scoreProduct(product, weather, dataset.merchants))
    .filter((result): result is ProductResult => Boolean(result));

  const serviceResults = dataset.serviceProviders
    .filter((service) => {
      const cityMatches = !city || service.city.toLowerCase() === city;
      const countryMatches = !country || service.country.toLowerCase() === country;
      const categoryMatches =
        !filters.category ||
        (filters.category === "ac-installation" && service.serviceType === "installation") ||
        (filters.category === "ac-repair" && service.serviceType === "repair") ||
        (filters.category === "cooling-center" && service.serviceType === "cooling-center");

      return cityMatches && countryMatches && categoryMatches && textMatchesService(service, q);
    })
    .map((service) => scoreService(service, weather));

  const merchantResults = dataset.merchants.filter((merchant) => {
    const cityMatches = !city || merchant.city.toLowerCase() === city;
    const countryMatches = !country || merchant.country.toLowerCase() === country;
    const textMatches = !q || [merchant.name, merchant.city, merchant.country]
      .join(" ")
      .toLowerCase()
      .includes(q);

    return cityMatches && countryMatches && textMatches;
  });

  return {
    products: sortProducts(productResults, sort),
    services: sortServices(serviceResults, sort),
    merchants: merchantResults,
    weather,
    dataSourceMode: dataset.sourceMode ?? "seed",
    feedErrors: dataset.feedErrors ?? [],
    rankingExplanation:
      "Recommended results combine delivery speed, distance, price, rating, installation availability, data freshness, and local heat urgency."
  };
}

export function getProductBySlug(slug: string): ProductResult | undefined {
  return searchHeatHub({}).products.find((product) => product.slug === slug);
}

export async function getProductBySlugLive(slug: string): Promise<ProductResult | undefined> {
  const snapshot = await getDataSnapshot();
  return searchHeatHubFromData({}, snapshot).products.find((product) => product.slug === slug);
}

export function getMerchantBySlug(slug: string): MerchantWithProducts | undefined {
  const merchant = merchants.find((item) => item.slug === slug);
  if (!merchant) {
    return undefined;
  }

  return {
    ...merchant,
    products: searchHeatHub({ city: merchant.city }).products.filter(
      (product) => product.merchantId === merchant.id
    )
  };
}

export async function getMerchantBySlugLive(
  slug: string
): Promise<MerchantWithProducts | undefined> {
  const snapshot = await getDataSnapshot();
  const merchant = snapshot.merchants.find((item) => item.slug === slug);
  if (!merchant) {
    return undefined;
  }

  return {
    ...merchant,
    products: searchHeatHubFromData({ city: merchant.city }, snapshot).products.filter(
      (product) => product.merchantId === merchant.id
    )
  };
}

export function getServiceBySlug(slug: string): ServiceResult | undefined {
  return searchHeatHub({}).services.find((service) => service.slug === slug);
}

export type MerchantWithProducts = (typeof merchants)[number] & {
  products: ProductResult[];
};
