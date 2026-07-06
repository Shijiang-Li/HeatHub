export type PromotionCopy = {
  title: string;
  audience: string;
  body: string;
};

export type PromotionGuide = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  searchHref: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const promotionCopies: PromotionCopy[] = [
  {
    title: "Short social post",
    audience: "LinkedIn, X, Bluesky, community updates",
    body:
      "HeatHub is a free European heatwave search tool for cooling products, HVAC service providers, public cooling places, and Chinese-brand HVAC distributor channels. It compares official sources and redirects users to the merchant or provider site. Try it: https://heathub-xi.vercel.app"
  },
  {
    title: "Community post",
    audience: "Expat, travel, housing, and local city groups",
    body:
      "I built HeatHub to help people in Europe find cooling options during heat waves: portable AC category pages, fan retailers, AC installation or repair providers, public cooling places, and official distributor channels. It is an information and comparison tool only, so final availability and prices are confirmed on the official provider site. Useful starting points: Madrid cooling search, Chinese HVAC distributors in Europe, and public cooling places."
  },
  {
    title: "Distributor outreach email",
    audience: "HVAC distributors, agents, and local service providers",
    body:
      "Subject: Free HeatHub listing for your official cooling channel\n\nHello,\n\nHeatHub is a free European search and comparison site for urgent cooling products, HVAC service providers, and official distributor channels. We listed your public official channel so users can discover your company and click through to your website.\n\nCould you confirm whether the listing details are accurate? If you want changes, send the preferred company name, coverage area, official URL, and service focus. HeatHub does not handle checkout, payments, orders, or stock claims; users confirm all details on your site.\n\nThank you."
  },
  {
    title: "Journalist or newsletter pitch",
    audience: "Climate, energy, local Europe, and startup newsletters",
    body:
      "HeatHub is a free Europe-focused heatwave search tool that combines weather context with cooling product discovery, public cooling places, HVAC service providers, and official distributor channels. It is built for people who need a practical answer fast, without HeatHub selling products or processing transactions."
  },
  {
    title: "Product Hunt launch blurb",
    audience: "Product Hunt and maker communities",
    body:
      "HeatHub helps people in Europe find cooling products, HVAC services, public cooling places, and official distributor channels during heat waves. Search by city, category, or provider, compare source freshness and weather context, then open the official merchant or provider site."
  }
];

export const promotionGuides: PromotionGuide[] = [
  {
    slug: "free-europe-heatwave-cooling-search",
    title: "Free Europe Heatwave Cooling Search",
    description:
      "Use HeatHub to find cooling products, HVAC providers, public cooling places, and official merchant links across Europe.",
    audience: "Residents, tourists, and small businesses dealing with extreme heat",
    searchHref: "/search?category=portable-ac",
    keywords: [
      "free heatwave cooling search Europe",
      "cooling products near me Europe",
      "public cooling places Europe"
    ],
    sections: [
      {
        heading: "What HeatHub helps you compare",
        body:
          "HeatHub brings together cooling product categories, official merchant pages, service provider links, public cooling places, and weather context. It is designed for fast discovery during hot weather."
      },
      {
        heading: "How to use it",
        body:
          "Search by city, category, brand, or provider. Open the result detail page to compare freshness, response or delivery context, installation availability, and the official outbound destination."
      },
      {
        heading: "What to verify off-site",
        body:
          "Final product availability, installation slots, prices, warranties, and merchant terms are confirmed on the official site after HeatHub redirects you."
      }
    ]
  },
  {
    slug: "chinese-air-conditioner-distributors-europe",
    title: "Chinese Air Conditioner Distributors in Europe",
    description:
      "Find official European distributor and agent channels for Chinese HVAC brands including Haier, Midea, AUX, TCL, and Gree.",
    audience: "Installers, property managers, small businesses, and sourcing teams",
    searchHref: "/search?q=代理商",
    keywords: [
      "Chinese air conditioner distributors Europe",
      "Chinese HVAC agents Europe",
      "Midea Haier AUX distributor Europe"
    ],
    sections: [
      {
        heading: "Brands covered",
        body:
          "HeatHub includes official or publicly verifiable distributor channels for Chinese cooling brands such as Haier, Midea, AUX, TCL, and Gree."
      },
      {
        heading: "Countries covered",
        body:
          "Current distributor coverage includes the United Kingdom, Netherlands, Poland, Romania, Finland, Hungary, Serbia, Austria, Belgium, Croatia, Cyprus, and broader Europe-wide directories."
      },
      {
        heading: "Responsible use",
        body:
          "HeatHub does not certify partner status beyond the linked public source. Always confirm authorization, service area, warranty handling, and product availability with the listed company."
      }
    ]
  },
  {
    slug: "midea-distributor-poland",
    title: "Midea Distributor in Poland",
    description:
      "Find Midea Poland distributor and representative channels for HVAC and air-conditioning discovery.",
    audience: "Polish installers, facilities teams, and sourcing users",
    searchHref: "/search?q=zymetric",
    keywords: ["Midea distributor Poland", "Midea representative Poland", "Midea HVAC Poland"],
    sections: [
      {
        heading: "Where HeatHub points users",
        body:
          "HeatHub links to publicly available Midea distributor and representative sources in Poland so users can discover official channels without HeatHub handling sales."
      },
      {
        heading: "Best search terms",
        body:
          "Try Midea, Zymetric, Poland distributor, or Polish HVAC channel to compare relevant HeatHub entries."
      },
      {
        heading: "What to confirm",
        body:
          "Confirm product range, installation support, commercial terms, and live availability directly with the distributor."
      }
    ]
  },
  {
    slug: "haier-hvac-distributor-netherlands",
    title: "Haier HVAC Distributor Netherlands",
    description:
      "Find Haier HVAC Netherlands distributor and partner channels for cooling and commercial air-conditioning discovery.",
    audience: "Dutch HVAC installers, property managers, and business users",
    searchHref: "/search?q=haier&city=Amsterdam",
    keywords: [
      "Haier HVAC distributor Netherlands",
      "Haier air conditioning Netherlands",
      "Haier HVAC Amsterdam"
    ],
    sections: [
      {
        heading: "Distributor discovery",
        body:
          "HeatHub lists public Haier HVAC Netherlands partner channels and official source pages for comparison and outbound discovery."
      },
      {
        heading: "Weather-aware context",
        body:
          "Search results can be filtered by city and include local heat context where available, helping users prioritize urgent cooling needs."
      },
      {
        heading: "Off-site confirmation",
        body:
          "Installation capacity, product availability, technical support, and warranty coverage should be confirmed with the listed distributor."
      }
    ]
  },
  {
    slug: "aux-air-conditioner-agent-romania",
    title: "AUX Air Conditioner Agent Romania",
    description:
      "Find AUX Romania agent and distributor channels for air-conditioning and installation discovery.",
    audience: "Romanian HVAC buyers, installers, and small businesses",
    searchHref: "/search?q=macroclima",
    keywords: ["AUX air conditioner agent Romania", "AUX Romania distributor", "Macroclima AUX"],
    sections: [
      {
        heading: "Romania channel discovery",
        body:
          "HeatHub includes public AUX Romania agent and distributor entries so users can open the official source page quickly."
      },
      {
        heading: "Useful searches",
        body:
          "Try AUX, Macroclima, Romania agent, or Bucharest air conditioning to find related HeatHub results."
      },
      {
        heading: "Important limits",
        body:
          "HeatHub does not show live stock or prices for AUX Romania. It sends users to the official channel for confirmation."
      }
    ]
  },
  {
    slug: "portable-ac-madrid-heatwave",
    title: "Portable AC Search in Madrid During Heat Waves",
    description:
      "Search portable AC, cooling products, installation services, and weather-aware results for Madrid.",
    audience: "Residents, tourists, and small businesses in Madrid",
    searchHref: "/search?city=Madrid&category=portable-ac",
    keywords: ["portable AC Madrid heatwave", "cooling products Madrid", "air conditioner Madrid"],
    sections: [
      {
        heading: "Start with city and category",
        body:
          "Use the Madrid portable AC search to compare official merchant category pages, source freshness, and weather urgency."
      },
      {
        heading: "Installation and service options",
        body:
          "If portable cooling is not enough, search AC installation or repair to find relevant provider links and map discovery results."
      },
      {
        heading: "Final decision",
        body:
          "Open the merchant or provider website to confirm delivery, pickup, installation, and current terms before acting."
      }
    ]
  }
];

export function getPromotionGuide(slug: string): PromotionGuide | undefined {
  return promotionGuides.find((guide) => guide.slug === slug);
}
