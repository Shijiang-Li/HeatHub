import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chinese cooling brands in Europe",
  description:
    "Official European channels for Chinese air-conditioning brands and distributor discovery."
};

const channels = [
  {
    brand: "Midea",
    coverage: "United Kingdom",
    focus: "Where-to-buy channel for air conditioning and renewables",
    searchHref: "/search?q=midea",
    officialHref: "https://www.midea.com/uk/where-to-buy"
  },
  {
    brand: "Haier",
    coverage: "Italy",
    focus: "Portable and fixed air-conditioner pages on Haier Europe",
    searchHref: "/search?q=haier",
    officialHref: "https://www.haier-europe.com/it_IT/pages/condizionatori-portatili"
  },
  {
    brand: "TCL",
    coverage: "Europe",
    focus: "European air-conditioner range and product discovery",
    searchHref: "/search?q=tcl",
    officialHref: "https://www.tcl.com/eu/en/air-conditioners"
  },
  {
    brand: "Gree",
    coverage: "Europe and global markets",
    focus: "Official distributor directory for regional channel discovery",
    searchHref: "/search?q=gree",
    officialHref: "https://global.gree.com/channels/140.html"
  },
  {
    brand: "AUX",
    coverage: "Europe and global markets",
    focus: "Official air-conditioning channel with Europe expansion context",
    searchHref: "/search?q=aux",
    officialHref: "https://www.auxair.com/global/"
  }
];

const distributorPartners = [
  {
    name: "Wolseley UK",
    brand: "Haier",
    coverage: "United Kingdom",
    focus: "Haier HVAC distributor partner for complete comfort solutions",
    searchHref: "/search?q=wolseley",
    officialHref:
      "https://haierhvac.eu/news/press-release/haier-hvac-uk-and-wolseley-announce-flagship-partnership-supply-complete"
  },
  {
    name: "Hawco Limited",
    brand: "Haier",
    coverage: "United Kingdom",
    focus: "Haier HVAC distributor partner for air-conditioning and HVAC discovery",
    searchHref: "/search?q=hawco",
    officialHref: "https://haierhvac.eu/news/press-release/haier-hvac-solutions-team-hawco"
  },
  {
    name: "Masterwatt",
    brand: "Haier",
    coverage: "Netherlands",
    focus: "Haier HVAC Netherlands partner for HVAC channel discovery",
    searchHref: "/search?q=masterwatt",
    officialHref:
      "https://haierhvac.eu/news/press-release/haier-hvac-solutions-europe-and-masterwatt-enter-strategic-partnership-drive"
  },
  {
    name: "Kataikko",
    brand: "Haier",
    coverage: "Finland",
    focus: "Haier HVAC Finnish distributor in the Nordic partner network",
    searchHref: "/search?q=kataikko",
    officialHref:
      "https://haierhvac.eu/news/press-release/kataikko-new-finnish-distributor-joins-growing-network-haier-hvac-partners"
  },
  {
    name: "Wienkra",
    brand: "AUX",
    coverage: "Poland",
    focus: "AUX Air Conditioner Polska representative and distributor channel",
    searchHref: "/search?q=wienkra",
    officialHref: "https://auxcool.pl/kontakt/"
  },
  {
    name: "Clima Polska",
    brand: "AUX",
    coverage: "Poland",
    focus: "AUX distributor and installation-oriented partner in Poland",
    searchHref: "/search?q=clima%20polska",
    officialHref: "https://www.climapolska.com.pl/en/klimatyzatory-aux/"
  },
  {
    name: "Macroclima Com",
    brand: "AUX",
    coverage: "Romania",
    focus: "AUX Romania agent and distributor channel",
    searchHref: "/search?q=macroclima",
    officialHref: "https://aux.com.ro/company/"
  }
];

export default function ChineseCoolingBrandsEuropeGuide() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6">
      <nav className="text-sm text-ink/70" aria-label="Breadcrumb">
        <Link className="focus-ring rounded-md hover:text-mint" href="/guides">
          Guides
        </Link>
        <span> / Chinese cooling brands in Europe</span>
      </nav>

      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-heat">Official channels</p>
        <h1 className="text-3xl font-semibold">Chinese cooling brands in Europe</h1>
        <p className="max-w-3xl text-ink/70">
          These entries point to official brand channels or distributor directories. HeatHub does not
          claim live stock, final prices, installation slots, or partner availability for these sources.
        </p>
      </div>

      <section className="grid gap-4" aria-labelledby="brand-channels">
        <h2 id="brand-channels" className="text-2xl font-semibold">
          Verified official entry points
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {channels.map((channel) => (
            <article key={channel.brand} className="rounded-md border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{channel.brand}</h3>
                  <p className="mt-1 text-sm font-medium text-ink/60">{channel.coverage}</p>
                </div>
                <span className="rounded-md bg-paper px-2 py-1 text-xs font-semibold">
                  Official
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/70">{channel.focus}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  className="focus-ring rounded-md bg-mint px-4 py-2 text-sm font-semibold text-white hover:bg-heat"
                  href={channel.searchHref}
                >
                  Search on HeatHub
                </Link>
                <a
                  className="focus-ring rounded-md border border-line px-4 py-2 text-sm font-semibold hover:border-mint hover:text-mint"
                  href={channel.officialHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open official channel
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4" aria-labelledby="distributor-partners">
        <h2 id="distributor-partners" className="text-2xl font-semibold">
          Local distributor and agent partners
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {distributorPartners.map((partner) => (
            <article key={partner.name} className="rounded-md border border-line bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{partner.name}</h3>
                  <p className="mt-1 text-sm font-medium text-ink/60">
                    {partner.brand} / {partner.coverage}
                  </p>
                </div>
                <span className="rounded-md bg-paper px-2 py-1 text-xs font-semibold">
                  Distributor
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/70">{partner.focus}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  className="focus-ring rounded-md bg-mint px-4 py-2 text-sm font-semibold text-white hover:bg-heat"
                  href={partner.searchHref}
                >
                  Search on HeatHub
                </Link>
                <a
                  className="focus-ring rounded-md border border-line px-4 py-2 text-sm font-semibold hover:border-mint hover:text-mint"
                  href={partner.officialHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open source page
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-md border border-line bg-white p-5">
        <h2 className="text-xl font-semibold">How HeatHub uses these sources</h2>
        <p className="mt-2 text-sm text-ink/70">
          They are used for search, comparison context, and outbound redirects only. For product
          availability, local installation, warranty, and final purchase decisions, users should confirm
          details on the official brand or listed partner site.
        </p>
      </section>
    </div>
  );
}
