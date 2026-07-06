# 13 Setup And Operations

## Local Development

Use Node.js 22 or newer.

```bash
npm install
npm run db:generate
npm run dev
```

The default local URL is:

```text
http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local` and set:

```text
DATABASE_URL
NEXT_PUBLIC_SITE_URL
OPEN_METEO_ENABLED
AFFILIATE_FEED_URLS
FEED_REVALIDATE_SECONDS
OPEN_DATA_DISCOVERY_ENABLED
OPEN_DATA_REVALIDATE_SECONDS
OVERPASS_ENDPOINTS
```

For Supabase, use the PostgreSQL connection string from the Supabase project settings.

## Database

Generate Prisma Client:

```bash
npm run db:generate
```

Apply the schema to a PostgreSQL database:

```bash
npm run db:push
```

Seed approved demonstration data:

```bash
npm run db:seed
```

The schema intentionally contains only aggregation, search, weather, service, merchant, product, and outbound analytics entities.

## Feed Import

Validate a permitted affiliate or merchant feed:

```bash
npm run feed:import -- data/affiliate-feed.sample.json
```

Feed imports must come from approved sources with recorded usage rights. Scraping is not assumed to be allowed.

## Live Feed Refresh

Set `AFFILIATE_FEED_URLS` to a comma-separated list of HTTPS JSON feed URLs. Runtime search uses those approved feeds first and falls back to local seed data when no feed is configured or a feed fails validation.

```text
AFFILIATE_FEED_URLS="https://merchant.example/feed.json,https://network.example/heathub.json"
FEED_REVALIDATE_SECONDS="300"
```

Only official APIs, merchant feeds, affiliate feeds, open data, or approved manual data should be connected. Do not add unauthorized scraping.

## Weather

`/api/weather` uses Open-Meteo when enabled and falls back to curated local weather snapshots when unavailable.

## Open Data Discovery

`/api/discovery` uses OpenStreetMap data through an Overpass endpoint to discover nearby shops, service providers, and public places. This is live open data discovery, not unauthorized merchant scraping.

```text
OPEN_DATA_DISCOVERY_ENABLED="true"
OPEN_DATA_REVALIDATE_SECONDS="900"
OVERPASS_ENDPOINTS="https://overpass-api.de/api/interpreter,https://overpass.kumi.systems/api/interpreter"
```

OpenStreetMap data can help find places, but it does not provide reliable real-time product prices, stock, or delivery promises.

## Product Boundary

HeatHub remains an information aggregation and comparison platform. It must not add cart, checkout, payment, internal order handling, refunds, warehouse, inventory, or logistics features.
