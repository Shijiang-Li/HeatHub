import { cities } from "@/lib/data";
import type { Category } from "@/lib/types";

export type OpenDataPlace = {
  id: string;
  name: string;
  type: "merchant" | "service" | "cooling-center";
  city: string;
  latitude: number;
  longitude: number;
  source: "OpenStreetMap";
  sourceUrl: string;
  websiteUrl?: string;
  categoryHint: string;
  sourceUpdatedAt: string;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags?: Record<string, string>;
};

type OverpassResponse = {
  elements?: OverpassElement[];
};

const defaultRadiusMeters = 9000;

export async function discoverOpenDataPlaces({
  city,
  category,
  limit = 20
}: {
  city?: string;
  category?: Category;
  limit?: number;
}): Promise<OpenDataPlace[]> {
  if (process.env.OPEN_DATA_DISCOVERY_ENABLED === "false") {
    return [];
  }

  const targetCity = findDiscoveryCity(city);
  if (!targetCity) {
    return [];
  }

  try {
    const response = await fetch(getOverpassEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: new URLSearchParams({
        data: buildOverpassQuery(targetCity.latitude, targetCity.longitude, category)
      }),
      next: {
        revalidate: getRevalidateSeconds()
      }
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as OverpassResponse;

    return (payload.elements ?? [])
      .map((element) => toOpenDataPlace(element, targetCity.name))
      .filter((place): place is OpenDataPlace => Boolean(place))
      .slice(0, limit);
  } catch {
    return [];
  }
}

function findDiscoveryCity(city: string | undefined) {
  const normalized = city?.trim().toLowerCase();

  if (!normalized) {
    return cities.find((item) => item.slug === "madrid") ?? cities[0];
  }

  return cities.find(
    (item) => item.slug === normalized || item.name.toLowerCase() === normalized
  );
}

function buildOverpassQuery(
  latitude: number,
  longitude: number,
  category: Category | undefined
): string {
  const clauses = getTagClauses(category)
    .map((clause) => `nwr${clause}(around:${defaultRadiusMeters},${latitude},${longitude});`)
    .join("\n");

  return `
    [out:json][timeout:12];
    (
      ${clauses}
    );
    out center tags 30;
  `;
}

function getTagClauses(category: Category | undefined): string[] {
  if (category === "cooling-center") {
    return [
      '["amenity"="community_centre"]',
      '["amenity"="library"]',
      '["amenity"="shelter"]',
      '["social_facility"]'
    ];
  }

  if (category === "ac-installation" || category === "ac-repair") {
    return [
      '["craft"="hvac"]',
      '["craft"="electrician"]',
      '["shop"="air_conditioning"]',
      '["shop"="hardware"]'
    ];
  }

  if (category === "generator") {
    return [
      '["shop"="hardware"]',
      '["shop"="doityourself"]',
      '["shop"="electronics"]'
    ];
  }

  if (category === "ice") {
    return [
      '["shop"="supermarket"]',
      '["shop"="convenience"]',
      '["amenity"="ice_cream"]'
    ];
  }

  return [
    '["shop"="electronics"]',
    '["shop"="hardware"]',
    '["shop"="doityourself"]',
    '["shop"="department_store"]'
  ];
}

function toOpenDataPlace(
  element: OverpassElement,
  city: string
): OpenDataPlace | undefined {
  const latitude = element.lat ?? element.center?.lat;
  const longitude = element.lon ?? element.center?.lon;
  const tags = element.tags ?? {};
  const name = tags.name;

  if (!latitude || !longitude || !name) {
    return undefined;
  }

  const osmType = element.type;
  const sourceUrl = `https://www.openstreetmap.org/${osmType}/${element.id}`;
  const categoryHint = tags.shop ?? tags.amenity ?? tags.craft ?? tags.social_facility ?? "place";

  return {
    id: `osm-${osmType}-${element.id}`,
    name,
    type: inferPlaceType(tags),
    city,
    latitude,
    longitude,
    source: "OpenStreetMap",
    sourceUrl,
    websiteUrl: tags.website,
    categoryHint,
    sourceUpdatedAt: new Date().toISOString()
  };
}

function inferPlaceType(tags: Record<string, string>): OpenDataPlace["type"] {
  if (
    tags.amenity === "community_centre" ||
    tags.amenity === "library" ||
    tags.amenity === "shelter" ||
    Boolean(tags.social_facility)
  ) {
    return "cooling-center";
  }

  if (tags.craft || tags.shop === "air_conditioning") {
    return "service";
  }

  return "merchant";
}

function getOverpassEndpoint(): string {
  return process.env.OVERPASS_ENDPOINT ?? "https://overpass-api.de/api/interpreter";
}

function getRevalidateSeconds(): number {
  const parsed = Number(process.env.OPEN_DATA_REVALIDATE_SECONDS);

  if (Number.isFinite(parsed) && parsed >= 300) {
    return parsed;
  }

  return 900;
}
