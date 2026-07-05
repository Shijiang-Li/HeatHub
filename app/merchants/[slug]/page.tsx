import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MerchantCard } from "@/components/merchant-card";
import { ProductCard } from "@/components/product-card";
import { WeatherBanner } from "@/components/weather-banner";
import { merchants } from "@/lib/data";
import { getMerchantBySlugLive, getWeatherForCity } from "@/lib/search";

type MerchantPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return merchants.map((merchant) => ({
    slug: merchant.slug
  }));
}

export async function generateMetadata({ params }: MerchantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const merchant = await getMerchantBySlugLive(slug);

  if (!merchant) {
    return {
      title: "Merchant not found"
    };
  }

  return {
    title: merchant.name,
    description: `Compare cooling products and official outbound links from ${merchant.name} in ${merchant.city}.`,
    alternates: {
      canonical: `/merchants/${merchant.slug}`
    }
  };
}

export default async function MerchantPage({ params }: MerchantPageProps) {
  const { slug } = await params;
  const merchant = await getMerchantBySlugLive(slug);

  if (!merchant) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink/70" aria-label="Breadcrumb">
        <Link className="focus-ring rounded-md hover:text-mint" href="/search">
          Search
        </Link>
        <span> / {merchant.name}</span>
      </nav>
      <WeatherBanner weather={getWeatherForCity(merchant.city)} />
      <MerchantCard merchant={merchant} />
      <section className="grid gap-4" aria-labelledby="merchant-products">
        <h1 id="merchant-products" className="text-2xl font-semibold">
          Listed options from {merchant.name}
        </h1>
        {merchant.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
