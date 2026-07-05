export const supportedLocales = ["en", "fr", "de", "es", "it"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

const dictionariesEn = {
  nav: {
    search: "Search",
    map: "Map",
    guides: "Guides",
    about: "About"
  },
  actions: {
    openMerchant: "Open merchant website",
    officialSite: "View on official site",
    contactProvider: "Contact provider"
  },
  trust: "HeatHub compares options and redirects to official merchant or provider sites."
};

export const dictionaries = {
  en: {
    nav: {
      search: "Search",
      map: "Map",
      guides: "Guides",
      about: "About"
    },
    actions: {
      openMerchant: "Open merchant website",
      officialSite: "View on official site",
      contactProvider: "Contact provider"
    },
    trust: "HeatHub compares options and redirects to official merchant or provider sites."
  },
  fr: {
    nav: {
      search: "Recherche",
      map: "Carte",
      guides: "Guides",
      about: "A propos"
    },
    actions: {
      openMerchant: "Ouvrir le site marchand",
      officialSite: "Voir le site officiel",
      contactProvider: "Contacter le prestataire"
    },
    trust: "HeatHub compare les options et redirige vers les sites officiels."
  },
  de: {
    nav: {
      search: "Suche",
      map: "Karte",
      guides: "Ratgeber",
      about: "Info"
    },
    actions: {
      openMerchant: "Website des Haendlers oeffnen",
      officialSite: "Auf offizieller Seite ansehen",
      contactProvider: "Anbieter kontaktieren"
    },
    trust: "HeatHub vergleicht Optionen und leitet zu offiziellen Websites weiter."
  },
  es: {
    nav: {
      search: "Buscar",
      map: "Mapa",
      guides: "Guias",
      about: "Acerca de"
    },
    actions: {
      openMerchant: "Abrir sitio del comercio",
      officialSite: "Ver en el sitio oficial",
      contactProvider: "Contactar proveedor"
    },
    trust: "HeatHub compara opciones y redirige a sitios oficiales."
  },
  it: {
    nav: {
      search: "Cerca",
      map: "Mappa",
      guides: "Guide",
      about: "Informazioni"
    },
    actions: {
      openMerchant: "Apri il sito del commerciante",
      officialSite: "Vedi sul sito ufficiale",
      contactProvider: "Contatta il fornitore"
    },
    trust: "HeatHub confronta le opzioni e reindirizza ai siti ufficiali."
  }
} satisfies Record<SupportedLocale, typeof dictionariesEn>;

export function getDictionary(locale: string | undefined) {
  const supportedLocale = supportedLocales.find((item) => item === locale);
  return dictionaries[supportedLocale ?? "en"];
}
