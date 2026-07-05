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
    id: "source-curated-demo",
    name: "Curated MVP demo data",
    sourceType: "manual",
    website: "https://example.com/heathub-demo-source",
    licenseNotes: "Demonstration data for product development only.",
    updateFrequency: "Manual",
    allowedUse: "Display and outbound referral testing."
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
    id: "merchant-cool-paris",
    name: "Cool Paris Direct",
    slug: "cool-paris-direct",
    country: "France",
    city: "Paris",
    websiteUrl: "https://example.com/cool-paris",
    logoUrl: "/merchant-placeholder.svg",
    affiliateBaseUrl: "https://example.com/cool-paris?ref=heathub",
    rating: 4.6,
    distanceKm: 2.1,
    dataSourceId: "source-curated-demo",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T06:10:00.000Z"
  },
  {
    id: "merchant-berlin-air",
    name: "Berlin Air Supply",
    slug: "berlin-air-supply",
    country: "Germany",
    city: "Berlin",
    websiteUrl: "https://example.com/berlin-air",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.4,
    distanceKm: 3.8,
    dataSourceId: "source-curated-demo",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T05:25:00.000Z"
  },
  {
    id: "merchant-madrid-fresh",
    name: "Madrid Fresh Home",
    slug: "madrid-fresh-home",
    country: "Spain",
    city: "Madrid",
    websiteUrl: "https://example.com/madrid-fresh",
    logoUrl: "/merchant-placeholder.svg",
    affiliateBaseUrl: "https://example.com/madrid-fresh?partner=heathub",
    rating: 4.7,
    distanceKm: 1.4,
    dataSourceId: "source-curated-demo",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T07:35:00.000Z"
  },
  {
    id: "merchant-milan-cooling",
    name: "Milan Cooling Point",
    slug: "milan-cooling-point",
    country: "Italy",
    city: "Milan",
    websiteUrl: "https://example.com/milan-cooling",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.2,
    distanceKm: 5.2,
    dataSourceId: "source-curated-demo",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-04T16:20:00.000Z"
  },
  {
    id: "merchant-amsterdam-breeze",
    name: "Amsterdam Breeze",
    slug: "amsterdam-breeze",
    country: "Netherlands",
    city: "Amsterdam",
    websiteUrl: "https://example.com/amsterdam-breeze",
    logoUrl: "/merchant-placeholder.svg",
    rating: 4.5,
    distanceKm: 2.9,
    dataSourceId: "source-curated-demo",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T04:15:00.000Z"
  }
];

export const products: Product[] = [
  {
    id: "product-nova-compact-ac",
    merchantId: "merchant-cool-paris",
    category: "portable-ac",
    name: "Nova Compact Portable AC 9000 BTU",
    slug: "nova-compact-portable-ac-9000",
    brand: "NovaCool",
    description:
      "Portable cooling unit for bedrooms and small flats, with window kit and dehumidifier mode.",
    price: 329,
    currency: "EUR",
    deliveryEstimate: "Same-day delivery in central Paris",
    deliveryHours: 8,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://example.com/cool-paris/nova-compact",
    affiliateUrl: "https://example.com/cool-paris/nova-compact?ref=heathub",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T06:10:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T06:10:00.000Z"
  },
  {
    id: "product-breeze-tower-fan",
    merchantId: "merchant-berlin-air",
    category: "fan",
    name: "BreezeLine Quiet Tower Fan",
    slug: "breezeline-quiet-tower-fan",
    brand: "BreezeLine",
    description:
      "Oscillating tower fan with quiet night mode for apartments and small offices.",
    price: 79,
    currency: "EUR",
    deliveryEstimate: "Pickup today, delivery tomorrow",
    deliveryHours: 24,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://example.com/berlin-air/breezeline-fan",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T05:25:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T05:25:00.000Z"
  },
  {
    id: "product-iberia-ac-plus",
    merchantId: "merchant-madrid-fresh",
    category: "portable-ac",
    name: "Iberia Chill Plus Portable AC 12000 BTU",
    slug: "iberia-chill-plus-portable-ac-12000",
    brand: "Iberia Chill",
    description:
      "Higher-capacity portable AC for larger living rooms, with optional partner installation guidance.",
    price: 419,
    currency: "EUR",
    deliveryEstimate: "Same-day delivery in Madrid",
    deliveryHours: 6,
    pickupAvailable: true,
    installationAvailable: true,
    merchantProductUrl: "https://example.com/madrid-fresh/iberia-chill-plus",
    affiliateUrl: "https://example.com/madrid-fresh/iberia-chill-plus?partner=heathub",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T07:35:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T07:35:00.000Z"
  },
  {
    id: "product-milan-window-kit",
    merchantId: "merchant-milan-cooling",
    category: "ac-installation",
    name: "Portable AC Window Seal Kit",
    slug: "portable-ac-window-seal-kit",
    brand: "CasaFredda",
    description:
      "Universal window seal kit that improves portable AC efficiency during heat waves.",
    price: 34,
    currency: "EUR",
    deliveryEstimate: "Pickup today in Milan",
    deliveryHours: 4,
    pickupAvailable: true,
    installationAvailable: true,
    merchantProductUrl: "https://example.com/milan-cooling/window-kit",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-04T16:20:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-04T16:20:00.000Z"
  },
  {
    id: "product-amsterdam-ice-packs",
    merchantId: "merchant-amsterdam-breeze",
    category: "ice",
    name: "Reusable Cooling Pack Set",
    slug: "reusable-cooling-pack-set",
    brand: "FreshDock",
    description:
      "Reusable cooling packs for short-term relief and transport of temperature-sensitive items.",
    price: 18,
    currency: "EUR",
    deliveryEstimate: "Pickup today, local delivery tomorrow",
    deliveryHours: 20,
    pickupAvailable: true,
    installationAvailable: false,
    merchantProductUrl: "https://example.com/amsterdam-breeze/cooling-pack-set",
    imageUrl: "/product-placeholder.svg",
    sourceUpdatedAt: "2026-07-05T04:15:00.000Z",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-05T04:15:00.000Z"
  }
];

export const serviceProviders: ServiceProvider[] = [
  {
    id: "service-paris-install",
    name: "Paris Rapid AC Install",
    slug: "paris-rapid-ac-install",
    serviceType: "installation",
    country: "France",
    city: "Paris",
    websiteUrl: "https://example.com/paris-rapid-install",
    phone: "+33100000001",
    rating: 4.8,
    distanceKm: 2.7,
    emergencyAvailable: true,
    estimatedResponseTime: "Same day callback",
    responseHours: 6,
    affiliateUrl: "https://example.com/paris-rapid-install?ref=heathub",
    sourceUpdatedAt: "2026-07-05T05:50:00.000Z"
  },
  {
    id: "service-berlin-repair",
    name: "Berlin Cool Repair",
    slug: "berlin-cool-repair",
    serviceType: "repair",
    country: "Germany",
    city: "Berlin",
    websiteUrl: "https://example.com/berlin-cool-repair",
    rating: 4.5,
    distanceKm: 4.1,
    emergencyAvailable: true,
    estimatedResponseTime: "Within 12 hours",
    responseHours: 12,
    sourceUpdatedAt: "2026-07-05T03:40:00.000Z"
  },
  {
    id: "service-madrid-install",
    name: "Madrid Heat Relief Installers",
    slug: "madrid-heat-relief-installers",
    serviceType: "installation",
    country: "Spain",
    city: "Madrid",
    websiteUrl: "https://example.com/madrid-heat-relief",
    rating: 4.6,
    distanceKm: 3.2,
    emergencyAvailable: true,
    estimatedResponseTime: "Today if booked on provider site",
    responseHours: 8,
    affiliateUrl: "https://example.com/madrid-heat-relief?partner=heathub",
    sourceUpdatedAt: "2026-07-05T07:00:00.000Z"
  },
  {
    id: "service-amsterdam-cooling-center",
    name: "Amsterdam Public Cooling Center Finder",
    slug: "amsterdam-public-cooling-center-finder",
    serviceType: "cooling-center",
    country: "Netherlands",
    city: "Amsterdam",
    websiteUrl: "https://example.com/amsterdam-cooling-centers",
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
