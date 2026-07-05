import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { WeatherBanner } from "@/components/weather-banner";
import { categoryLabels } from "@/lib/content";
import { products } from "@/lib/data";
import { getProductBySlugLive, getWeatherForCity } from "@/lib/search";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugLive(slug);

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: product.name,
    description: `${product.name} from ${product.merchant.name}. Compare price, delivery estimate, source freshness, and official outbound link.`,
    alternates: {
      canonical: `/products/${product.slug}`
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlugLive(slug);

  if (!product) {
    notFound();
  }

  const weather = getWeatherForCity(product.merchant.city);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink/70" aria-label="Breadcrumb">
        <Link className="focus-ring rounded-md hover:text-mint" href="/search">
          Search
        </Link>
        <span> / {product.name}</span>
      </nav>
      <WeatherBanner weather={weather} />
      <ProductCard product={product} />
      <section className="rounded-md border border-line bg-white p-5">
        <h2 className="text-xl font-semibold">Comparison details</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <Detail label="Category" value={categoryLabels[product.category]} />
          <Detail label="Brand" value={product.brand} />
          <Detail label="Merchant" value={product.merchant.name} />
          <Detail label="City" value={product.merchant.city} />
          <Detail label="Pickup available" value={product.pickupAvailable ? "Yes" : "No"} />
          <Detail
            label="Installation available"
            value={product.installationAvailable ? "Yes" : "No"}
          />
        </dl>
        <p className="mt-5 text-sm text-ink/70">
          HeatHub redirects to the official merchant or affiliate destination. Product availability and
          final details are confirmed on that site.
        </p>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: product.brand,
            description: product.description,
            category: categoryLabels[product.category],
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: product.currency,
              url: product.merchantProductUrl,
              seller: {
                "@type": "Organization",
                name: product.merchant.name
              }
            }
          })
        }}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
