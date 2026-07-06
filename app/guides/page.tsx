import type { Metadata } from "next";
import Link from "next/link";
import { promotionGuides } from "@/lib/promotion";

export const metadata: Metadata = {
  title: "Cooling guides",
  description:
    "Practical HeatHub guides for comparing urgent cooling products and service providers."
};

export default function GuidesPage() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">Cooling guides</h1>
      <div className="grid gap-4">
        <Guide
          title="Portable AC or fan"
          body="Compare room size, noise, setup effort, delivery speed, and whether pickup is available nearby."
          href="/search?category=portable-ac"
        />
        <Guide
          title="When to look for installation"
          body="Installation can matter when a room needs sustained cooling, window sealing, or fixed equipment support."
          href="/search?category=ac-installation"
        />
        <Guide
          title="Finding public cooling centers"
          body="During severe heat, official cooling centers may be the fastest option for immediate relief."
          href="/search?category=cooling-center"
        />
        <Guide
          title="Chinese cooling brands in Europe"
          body="Find official European channels for Chinese air-conditioning brands such as Midea, Haier, TCL, Gree, and AUX."
          href="/guides/chinese-cooling-brands-europe"
        />
      </div>
      <section className="grid gap-4" aria-labelledby="growth-guides">
        <h2 id="growth-guides" className="text-2xl font-semibold">
          Search demand guides
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {promotionGuides.map((guide) => (
            <Guide
              key={guide.slug}
              title={guide.title}
              body={guide.description}
              href={`/guides/${guide.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Guide({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <article className="rounded-md border border-line bg-white p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-ink/70">{body}</p>
      <Link className="focus-ring mt-4 inline-flex rounded-md font-semibold text-mint" href={href}>
        Search related options
      </Link>
    </article>
  );
}
