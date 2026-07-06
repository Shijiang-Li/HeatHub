import type { Metadata } from "next";
import Link from "next/link";
import { promotionCopies, promotionGuides } from "@/lib/promotion";

export const metadata: Metadata = {
  title: "Promote HeatHub for free",
  description:
    "Free promotion assets, outreach templates, and SEO landing pages for sharing HeatHub with communities, distributors, and search engines.",
  alternates: {
    canonical: "/promote"
  }
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://heathub-xi.vercel.app";

export default function PromotePage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6">
      <section className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-heat">Free growth kit</p>
        <h1 className="text-3xl font-semibold">Promote HeatHub without paid ads</h1>
        <p className="max-w-3xl text-ink/70">
          Use these copy blocks and SEO pages to share HeatHub with communities, local newsletters,
          HVAC distributors, travel groups, and heatwave resource lists.
        </p>
      </section>

      <section className="grid gap-4" aria-labelledby="priority-actions">
        <h2 id="priority-actions" className="text-2xl font-semibold">
          Priority actions
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Action
            title="Submit sitemap"
            body="Add the sitemap in Google Search Console and Bing Webmaster Tools."
            href={`${siteUrl}/sitemap.xml`}
            label="Open sitemap"
          />
          <Action
            title="Share guide pages"
            body="Post specific guide links instead of only sharing the homepage."
            href="/guides"
            label="Open guides"
          />
          <Action
            title="Email distributors"
            body="Ask listed distributors to confirm details and consider linking back."
            href="#copy-blocks"
            label="Use template"
          />
        </div>
      </section>

      <section className="grid gap-4" aria-labelledby="seo-pages">
        <h2 id="seo-pages" className="text-2xl font-semibold">
          SEO pages to share
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {promotionGuides.map((guide) => (
            <article key={guide.slug} className="rounded-md border border-line bg-white p-5">
              <h3 className="text-xl font-semibold">
                <Link className="focus-ring rounded-md hover:text-mint" href={`/guides/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink/70">{guide.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/50">
                {guide.audience}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="copy-blocks" className="grid gap-4" aria-labelledby="copy-title">
        <h2 id="copy-title" className="text-2xl font-semibold">
          Copy blocks
        </h2>
        {promotionCopies.map((item) => (
          <article key={item.title} className="rounded-md border border-line bg-white p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-ink/60">{item.audience}</p>
              </div>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-md bg-paper p-4 text-sm leading-6 text-ink">
              {item.body}
            </pre>
          </article>
        ))}
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Promote HeatHub for free",
            description:
              "Free promotion assets, outreach templates, and SEO pages for HeatHub.",
            url: `${siteUrl}/promote`
          })
        }}
      />
    </div>
  );
}

function Action({
  title,
  body,
  href,
  label
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <article className="rounded-md border border-line bg-white p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink/70">{body}</p>
      <Link className="focus-ring mt-4 inline-flex rounded-md font-semibold text-mint" href={href}>
        {label}
      </Link>
    </article>
  );
}
