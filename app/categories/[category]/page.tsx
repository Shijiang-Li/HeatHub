import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { ServiceCard } from "@/components/service-card";
import { categoryLabels } from "@/lib/content";
import { parseCategory, searchHeatHub } from "@/lib/search";
import type { Category } from "@/lib/types";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const categorySlugs: Category[] = [
  "portable-ac",
  "fan",
  "ac-installation",
  "ac-repair",
  "generator",
  "ice",
  "cooling-center"
];

export function generateStaticParams() {
  return categorySlugs.map((category) => ({
    category
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = parseCategory(categorySlug);
  const label = category ? categoryLabels[category] : "Cooling";

  return {
    title: `${label} search`,
    description: `Compare ${label.toLowerCase()} options across European cities with weather context and official outbound links.`
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = parseCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const results = searchHeatHub({ category });
  const hasResults = results.products.length > 0 || results.services.length > 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">{categoryLabels[category]} options</h1>
      {!hasResults ? (
        <EmptyState />
      ) : (
        <>
          <section className="grid gap-4">
            {results.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          <section className="grid gap-4 md:grid-cols-2">
            {results.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
