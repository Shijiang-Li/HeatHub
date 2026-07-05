export type AlertLevel = "normal" | "watch" | "high" | "extreme";

export type Category =
  | "portable-ac"
  | "fan"
  | "ac-installation"
  | "ac-repair"
  | "generator"
  | "ice"
  | "cooling-center";

export type SortOption =
  | "recommended"
  | "fastest"
  | "lowest-price"
  | "nearest"
  | "highest-rated"
  | "recently-updated";

export type DataSource = {
  id: string;
  name: string;
  sourceType: "merchant-feed" | "affiliate-feed" | "open-data" | "manual";
  website: string;
  licenseNotes: string;
  updateFrequency: string;
  allowedUse: string;
};

export type City = {
  id: string;
  name: string;
  slug: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export type Merchant = {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  websiteUrl: string;
  logoUrl: string;
  affiliateBaseUrl?: string;
  rating: number;
  distanceKm: number;
  dataSourceId: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  merchantId: string;
  category: Category;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  currency: "EUR";
  deliveryEstimate: string;
  deliveryHours: number;
  pickupAvailable: boolean;
  installationAvailable: boolean;
  merchantProductUrl: string;
  affiliateUrl?: string;
  imageUrl: string;
  sourceUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceProvider = {
  id: string;
  name: string;
  slug: string;
  serviceType: "installation" | "repair" | "cooling-center";
  country: string;
  city: string;
  websiteUrl: string;
  phone?: string;
  rating: number;
  distanceKm: number;
  emergencyAvailable: boolean;
  estimatedResponseTime: string;
  responseHours: number;
  affiliateUrl?: string;
  sourceUpdatedAt: string;
};

export type WeatherSnapshot = {
  id: string;
  cityId: string;
  temperatureC: number;
  condition: string;
  alertLevel: AlertLevel;
  provider: string;
  observedAt: string;
};

export type ProductResult = Product & {
  merchant: Merchant;
  score: number;
  reasons: string[];
};

export type ServiceResult = ServiceProvider & {
  score: number;
  reasons: string[];
};

export type SearchFilters = {
  q?: string;
  city?: string;
  country?: string;
  category?: Category;
  sort?: SortOption;
  delivery?: "today" | "pickup";
  installation?: boolean;
};

export type SearchResponse = {
  products: ProductResult[];
  merchants: Merchant[];
  services: ServiceResult[];
  weather?: WeatherSnapshot;
  rankingExplanation: string;
  dataSourceMode?: "live" | "seed";
  feedErrors?: string[];
};

export type OutboundClickRequest = {
  target_type: "product" | "merchant" | "service";
  target_id: string;
  destination_url: string;
  referrer_path?: string;
};

export type OutboundClickResponse = {
  redirect_url: string;
};
