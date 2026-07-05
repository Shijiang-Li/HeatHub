import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/service-card";
import { WeatherBanner } from "@/components/weather-banner";
import { serviceProviders } from "@/lib/data";
import { getServiceBySlug, getWeatherForCity } from "@/lib/search";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return serviceProviders.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service provider not found"
    };
  }

  return {
    title: service.name,
    description: `Compare response time, distance, rating, and official provider link for ${service.name}.`,
    alternates: {
      canonical: `/services/${service.slug}`
    }
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink/70" aria-label="Breadcrumb">
        <Link className="focus-ring rounded-md hover:text-mint" href="/search">
          Search
        </Link>
        <span> / {service.name}</span>
      </nav>
      <WeatherBanner weather={getWeatherForCity(service.city)} />
      <ServiceCard service={service} />
      <section className="rounded-md border border-line bg-white p-5">
        <h1 className="text-xl font-semibold">Provider details</h1>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <Detail label="Service type" value={service.serviceType.replace("-", " ")} />
          <Detail label="Emergency availability" value={service.emergencyAvailable ? "Yes" : "No"} />
          <Detail label="City" value={service.city} />
          <Detail label="Country" value={service.country} />
          <Detail label="Estimated response" value={service.estimatedResponseTime} />
          <Detail label="Phone" value={service.phone ?? "Listed on provider site"} />
        </dl>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</dt>
      <dd className="mt-1 font-medium capitalize">{value}</dd>
    </div>
  );
}
