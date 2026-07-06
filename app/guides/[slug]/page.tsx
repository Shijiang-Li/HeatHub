import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPromotionGuide, promotionGuides } from "@/lib/promotion";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return promotionGuides.map((guide) => ({
    slug: guide.slug
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPromotionGuide(slug);

  if (!guide) {
    return {
      title: "Guide not found"
    };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: `/guides/${guide.slug}`
    }
  };
}

export default async function PromotionGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getPromotionGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink/70" aria-label="Breadcrumb">
        <Link className="focus-ring rounded-md hover:text-mint" href="/guides">
          Guides
        </Link>
        <span> / {guide.title}</span>
      </nav>

      <section className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-heat">{guide.audience}</p>
        <h1 className="text-3xl font-semibold">{guide.title}</h1>
        <p className="text-ink/70">{guide.description}</p>
        <div className="flex flex-wrap gap-2">
          {guide.keywords.map((keyword) => (
            <span key={keyword} className="rounded-md border border-line bg-white px-2 py-1 text-xs font-medium">
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4" aria-labelledby="guide-content">
        <h2 id="guide-content" className="sr-only">
          Guide content
        </h2>
        {guide.sections.map((section) => (
          <article key={section.heading} className="rounded-md border border-line bg-white p-5">
            <h3 className="text-xl font-semibold">{section.heading}</h3>
            <p className="mt-2 text-ink/70">{section.body}</p>
          </article>
        ))}
      </section>

      <div className="rounded-md border border-line bg-paper p-5">
        <h2 className="text-xl font-semibold">Search current HeatHub results</h2>
        <p className="mt-2 text-sm text-ink/70">
          HeatHub shows comparison context and official outbound links. Final availability, prices,
          installation slots, and provider terms are confirmed on the destination site.
        </p>
        <Link
          className="focus-ring mt-4 inline-flex rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-mint"
          href={guide.searchHref}
        >
          Open related search
        </Link>
      </div>
    </div>
  );
}
