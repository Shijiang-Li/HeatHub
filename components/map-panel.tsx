import Link from "next/link";
import { cities, merchants, serviceProviders } from "@/lib/data";

type MapPanelProps = {
  city?: string;
};

export function MapPanel({ city }: MapPanelProps) {
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
        x: longitudeToPercent(item.longitude) + 2,
        y: latitudeToPercent(item.latitude) + 2
      }));

    return [...cityMerchants, ...cityServices];
  });

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative min-h-[360px] overflow-hidden rounded-md border border-line bg-[#eaf2ee]">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-60">
          {Array.from({ length: 30 }, (_, index) => (
            <span key={index} className="border border-white/70" />
          ))}
        </div>
        {points.map((point) => (
          <Link
            key={point.id}
            href={point.href}
            className="focus-ring absolute rounded-full bg-heat p-2 text-white shadow-soft hover:bg-mint"
            style={{
              left: `${Math.min(92, Math.max(5, point.x))}%`,
              top: `${Math.min(88, Math.max(8, point.y))}%`
            }}
            aria-label={`${point.type}: ${point.label} in ${point.city}`}
            title={`${point.type}: ${point.label}`}
          />
        ))}
      </div>
      <div className="rounded-md border border-line bg-white p-4">
        <h2 className="text-lg font-semibold">Map discovery</h2>
        <p className="mt-2 text-sm text-ink/70">
          Explore nearby merchants and service providers, then open their detail pages or official sites.
        </p>
        <ul className="mt-4 grid gap-3">
          {points.map((point) => (
            <li key={`${point.id}-list`} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
              <Link className="focus-ring rounded-md font-medium hover:text-mint" href={point.href}>
                {point.label}
              </Link>
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
