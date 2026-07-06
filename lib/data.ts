import type {
  City,
  DataSource,
  Merchant,
  Product,
  ServiceProvider,
  WeatherSnapshot
} from "@/lib/types";

export const dataSources: DataSource[] = [
  {
    id: "source-curated-official-links",
    name: "Curated official outbound links",
    sourceType: "manual",
    website: "https://www.openstreetmap.org/copyright",
    licenseNotes:
      "Manual fallback links to official merchant category pages and open data sources. Prices and availability are confirmed off-site.",
    updateFrequency: "Manual review",
    allowedUse: "Information display and official outbound redirects."
  }
];

export const cities: City[] = [
  {
    id: "city-paris",
    name: "Paris",
    slug: "paris",
    country: "France",
    countryCode: "FR",
    latitude: 48.8566,
    longitude: 2.3522
  },
  {
    id: "city-berlin",
    name: "Berlin",
    slug: "berlin",
    country: "Germany",
    countryCode: "DE",
    latitude: 52.52,
    longitude: 13.405
  },
  {
    id: "city-madrid",
    name: "Madrid",
    slug: "madrid",
    country: "Spain",
    countryCode: "ES",
    latitude: 40.4168,
    longitude: -3.7038
  },
  {
    id: "city-milan",
    name: "Milan",
    slug: "milan",
    country: "Italy",
    countryCode: "IT",
    latitude: 45.4642,
    longitude: 9.19
  },
  {
    id: "city-amsterdam",
    name: "Amsterdam",
    slug: "amsterdam",
    country: "Netherlands",
    countryCode: "NL",
    latitude: 52.3676,
    longitude: 4.9041
  }
];

export const merchants: Merchant[] = [
  {
    id: "merchant-leroy-merlin-france",
    name: "Leroy Merlin France",
    slug: "leroy-merlin-france",
    country: "France",
    city: "Paris",
    websiteUrl: "https://www.leroymerlin.fr/produits/chauffage-et-ventilation/",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.6,
    distanceKm: 2.1,
    dataSourceId: "source-curated-official-links",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T06:10:00.000Z"
  },
  {
    id: "merchant-mediamarkt-germany",
    name: "MediaMarkt Germany",
    slug: "mediamarkt-germany",
    country: "Germany",
    city: "Berlin",
    websiteUrl: "https://www.mediamarkt.de/de/category/heizen-klima-97.html",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.4,
    distanceKm: 3.8,
    dataSourceId: "source-curated-official-links",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T05:25:00.000Z"
  },
  {
    id: "merchant-el-corte-ingles",
    name: "El Corte Ingles",
    slug: "el-corte-ingles",
    country: "Spain",
    city: "Madrid",
    websiteUrl: "https://www.elcorteingles.es/electrodomesticos/climatizacion/",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.7,
    distanceKm: 1.4,
    dataSourceId: "source-curated-official-links",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T07:35:00.000Z"
  },
  {
    id: "merchant-unieuro",
    name: "Unieuro",
    slug: "unieuro",
    country: "Italy",
    city: "Milan",
    websiteUrl: "https://www.unieuro.it/online/speciale-clima",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.2,
    distanceKm: 5.2,
    dataSourceId: "source-curated-official-links",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-04T16:20:00.000Z"
  },
  {
    id: "merchant-coolblue-netherlands",
    name: "Coolblue Netherlands",
    slug: "coolblue-netherlands",
    country: "Netherlands",
    city: "Amsterdam",
    websiteUrl: "https://www.coolblue.nl/en/air-cooling",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.5,
    distanceKm: 2.9,
    dataSourceId: "source-curated-official-links",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T04:15:00.000Z"
  }
];

export const products: Product[] = [
  {
    id: "product-leroy-merlin-cooling-category",
    merchantId: "merchant-leroy-merlin-france",
    category: "portable-ac",
    name: "Portable cooling category at Leroy Merlin France",
    slug: "portable-cooling-leroy-merlin-france",
    brand: "Leroy Merlin",
    description:
      "Official cooling and ventilation category page. Final price, delivery, and availability are confirmed on Leroy Merlin.",
    price: 0,
    currency: "EUR",
    deliveryEstimate: "Confirmed on official site",
    deliveryHours: 24,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://www.leroymerlin.fr/produits/chauffage-et-ventilation/climatisation/",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T06:10:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T06:10:00.000Z"
  },
  {
    id: "product-mediamarkt-air-cooling-category",
    merchantId: "merchant-mediamarkt-germany",
    category: "fan",
    name: "Air cooling category at MediaMarkt Germany",
    slug: "air-cooling-mediamarkt-germany",
    brand: "MediaMarkt",
    description:
      "Official heating and air cooling category page. Final price, delivery, and availability are confirmed on MediaMarkt.",
    price: 0,
    currency: "EUR",
    deliveryEstimate: "Confirmed on official site",
    deliveryHours: 24,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://www.mediamarkt.de/de/category/heizen-klima-97.html",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T05:25:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T05:25:00.000Z"
  },
  {
    id: "product-el-corte-ingles-cooling-category",
    merchantId: "merchant-el-corte-ingles",
    category: "portable-ac",
    name: "Climate control category at El Corte Ingles",
    slug: "climate-control-el-corte-ingles",
    brand: "El Corte Ingles",
    description:
      "Official climate control category page. Final price, delivery, and availability are confirmed on El Corte Ingles.",
    price: 0,
    currency: "EUR",
    deliveryEstimate: "Confirmed on official site",
    deliveryHours: 6,
    pickupAvailable: true,
    installationAvailable: true,
    merchantProductUrl: "https://www.elcorteingles.es/electrodomesticos/climatizacion/",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T07:35:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T07:35:00.000Z"
  },
  {
    id: "product-unieuro-climate-category",
    merchantId: "merchant-unieuro",
    category: "ac-installation",
    name: "Climate products at Unieuro",
    slug: "climate-products-unieuro",
    brand: "Unieuro",
    description:
      "Official climate category page. Final price, delivery, and availability are confirmed on Unieuro.",
    price: 0,
    currency: "EUR",
    deliveryEstimate: "Confirmed on official site",
    deliveryHours: 4,
    pickupAvailable: true,
    installationAvailable: true,
    merchantProductUrl: "https://www.unieuro.it/online/speciale-clima",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-04T16:20:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-04T16:20:00.000Z"
  },
  {
    id: "product-coolblue-air-cooling-category",
    merchantId: "merchant-coolblue-netherlands",
    category: "fan",
    name: "Air cooling category at Coolblue Netherlands",
    slug: "air-cooling-coolblue-netherlands",
    brand: "Coolblue",
    description:
      "Official air cooling category page. Final price, delivery, and availability are confirmed on Coolblue.",
    price: 0,
    currency: "EUR",
    deliveryEstimate: "Confirmed on official site",
    deliveryHours: 20,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://www.coolblue.nl/en/air-cooling",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T04:15:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T04:15:00.000Z"
  }
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: "service-paris-install",
    name: "OpenStreetMap HVAC and cooling services in Paris",
    slug: "paris-rapid-ac-install",
    serviceType: "installation",
    country: "France",
    city: "Paris",
    websiteUrl: "https://www.openstreetmap.org/search?query=hvac%20Paris",
    rating: 4.8,
    distanceKm: 2.7,
    emergencyAvailable: true,
    estimatedResponseTime: "Same day callback",
    responseHours: 6,
    sourceUpdatedAt: "2026-07-05T05:50:00.000Z"
  },
  {
    id: "service-berlin-repair",
    name: "OpenStreetMap cooling repair services in Berlin",
    slug: "berlin-cool-repair",
    serviceType: "repair",
    country: "Germany",
    city: "Berlin",
    websiteUrl: "https://www.openstreetmap.org/search?query=air%20conditioning%20repair%20Berlin",
    rating: 4.5,
    distanceKm: 4.1,
    emergencyAvailable: true,
    estimatedResponseTime: "Within 12 hours",
    responseHours: 12,
    sourceUpdatedAt: "2026-07-05T03:40:00.000Z"
  },
  {
    id: "service-madrid-install",
    name: "OpenStreetMap AC installation services in Madrid",
    slug: "madrid-heat-relief-installers",
    serviceType: "installation",
    country: "Spain",
    city: "Madrid",
    websiteUrl: "https://www.openstreetmap.org/search?query=aire%20acondicionado%20instalacion%20Madrid",
    rating: 4.6,
    distanceKm: 3.2,
    emergencyAvailable: true,
    estimatedResponseTime: "Today if booked on provider site",
    responseHours: 8,
    sourceUpdatedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "service-amsterdam-cooling-center",
    name: "Amsterdam Public Cooling Center Finder",
    slug: "amsterdam-public-cooling-center-finder",
    serviceType: "cooling-center",
    country: "Netherlands",
    city: "Amsterdam",
    websiteUrl: "https://www.amsterdam.nl/en/news/where-cool-down-during-hot-weather/",
    rating: 4.3,
    distanceKm: 1.1,
    emergencyAvailable: true,
    estimatedResponseTime: "Open locations listed on official site",
    responseHours: 1,
    sourceUpdatedAt: "2026-07-05T04:45:00.000Z"
  }
];

export const weatherSnapshots: WeatherSnapshot[] = [
  {
    id: "weather-paris",
    cityId: "city-paris",
    temperatureC: 36,
    condition: "Heat advisory",
    alertLevel: "high",
    provider: "Demo weather provider",
    observedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "weather-berlin",
    cityId: "city-berlin",
    temperatureC: 33,
    condition: "Hot and dry",
    alertLevel: "watch",
    provider: "Demo weather provider",
    observedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "weather-madrid",
    cityId: "city-madrid",
    temperatureC: 40,
    condition: "Extreme heat warning",
    alertLevel: "extreme",
    provider: "Demo weather provider",
    observedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "weather-milan",
    cityId: "city-milan",
    temperatureC: 35,
    condition: "Heat advisory",
    alertLevel: "high",
    provider: "Demo weather provider",
    observedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "weather-amsterdam",
    cityId: "city-amsterdam",
    temperatureC: 29,
    condition: "Warm",
    alertLevel: "normal",
    provider: "Demo weather provider",
    observedAt: "2026-07-05T07:00:00.000Z"
  }
];
