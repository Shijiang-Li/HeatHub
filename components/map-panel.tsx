import Link from "next/link";
import { cities, merchants, serviceProviders } from "@/lib/data";
import type { OpenDataPlace } from "@/lib/open-data-discovery";

type MapPanelProps = {
  city?: string;
  openDataPlaces?: OpenDataPlace[];
};

export function MapPanel({ city, openDataPlaces = [] }: MapPanelProps) {
  const normalizedCity = city?.trim().toLowerCase();
  const visibleCities = normalizedCity
    ? cities.filter((item) => item.name.toLowerCase() === normalizedCity || item.slug === normalizedCity)
    : cities;

  const points = visibleCities.flatMap((item) => {
    const cityMerchants = merchants
      .filter((merchant) => merchant.city === item.name)
      .map((merchant) => ({
        id: merchant.id,
        label: merchant.name,
        city: item.name,
        type: "Merchant",
        href: `/merchants/${merchant.slug}`,
        external: false,
        x: longitudeToPercent(item.longitude),
        y: latitudeToPercent(item.latitude)
      }));
    const cityServices = serviceProviders
      .filter((service) => service.city === item.name)
      .map((service) => ({
        id: service.id,
        label: service.name,
        city: item.name,
        type: "Service",
        href: `/services/${service.slug}`,
        external: false,
        x: longitudeToPercent(item.longitude) + 2,
        y: latitudeToPercent(item.latitude) + 2
      }));

    return [...cityMerchants, ...cityServices];
  });

  const livePoints = openDataPlaces.map((place) => ({
    id: place.id,
    label: place.name,
    city: place.city,
    type: place.type === "cooling-center" ? "Open cooling place" : "Open data place",
    href: place.websiteUrl ?? place.sourceUrl,
    external: true,
    x: longitudeToPercent(place.longitude),
    y: latitudeToPercent(place.latitude)
  }));

  const allPoints = [...points, ...livePoints];

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative min-h-[360px] overflow-hidden rounded-md border border-line bg-[#eaf2ee]">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-60">
          {Array.from({ length: 30 }, (_, index) => (
            <span key={index} className="border border-white/70" />
          ))}
        </div>
        {allPoints.map((point) => (
          point.external ? (
          <a
            key={point.id}
            href={point.href}
            target="_blank"
            rel="noreferrer"
            className="focus-ring absolute rounded-full bg-heat p-2 text-white shadow-soft hover:bg-mint"
            style={{
              left: `${Math.min(92, Math.max(5, point.x))}%`,
              top: `${Math.min(88, Math.max(8, point.y))}%`
            }}
            aria-label={`${point.type}: ${point.label} in ${point.city}`}
            title={`${point.type}: ${point.label}`}
          />
          ) : (
          <Link
            key={point.id}
            href={point.href}
            className="focus-ring absolute rounded-full bg-mint p-2 text-white shadow-soft hover:bg-heat"
            style={{
              left: `${Math.min(92, Math.max(5, point.x))}%`,
              top: `${Math.min(88, Math.max(8, point.y))}%`
            }}
            aria-label={`${point.type}: ${point.label} in ${point.city}`}
            title={`${point.type}: ${point.label}`}
          />
          )
        ))}
      </div>
      <div className="rounded-md border border-line bg-white p-4">
        <h2 className="text-lg font-semibold">Map discovery</h2>
        <p className="mt-2 text-sm text-ink/70">
          Explore nearby merchants and service providers, then open their detail pages or official sites.
        </p>
        {openDataPlaces.length > 0 && (
          <p className="mt-2 text-xs font-medium text-ink/60">
            Includes live OpenStreetMap discovery. Official product availability is confirmed off-site.
          </p>
        )}
        <ul className="mt-4 grid gap-3">
          {allPoints.map((point) => (
            <li key={`${point.id}-list`} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
              {point.external ? (
                <a
                  className="focus-ring rounded-md font-medium hover:text-mint"
                  href={point.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {point.label}
                </a>
              ) : (
                <Link className="focus-ring rounded-md font-medium hover:text-mint" href={point.href}>
                  {point.label}
                </Link>
              )}
              <p className="text-sm text-ink/70">
                {point.type} in {point.city}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function longitudeToPercent(longitude: number): number {
  return ((longitude + 10) / 30) * 100;
}

function latitudeToPercent(latitude: number): number {
  return 100 - ((latitude - 35) / 20) * 100;
}
