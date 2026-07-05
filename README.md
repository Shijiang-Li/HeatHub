# HeatHub Codex Pack

HeatHub is an information aggregation and search platform for emergency products and services during extreme weather.

The platform does not sell products.
The platform does not process orders.
The platform does not process payments.
The platform redirects users to merchant or service provider websites.

## Mission

Help users find relevant emergency products and services within 30 seconds.

Initial focus:

- Europe
- Extreme heat
- Cooling products
- Installation services
- Repair services
- Weather-aware search

## Product Type

HeatHub is:

- Search engine
- Information aggregator
- Comparison platform
- Affiliate redirect platform

HeatHub is not:

- Ecommerce store
- Marketplace
- Shopping cart
- Payment platform
- Inventory system
- Logistics platform

## How Codex Should Use This Pack

Before writing code, read:

1. `CODEX.md`
2. `docs/00_CONTEXT.md`
3. `docs/01_PRODUCT.md`
4. `docs/02_SCOPE.md`
5. `docs/08_AI_ENGINEERING_RULES.md`

Then use the remaining files as implementation context.

## Recommended Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Supabase
- MapLibre
- OpenWeather or another official weather provider
- Vercel

## MVP Outcome

Users can:

- Search by city, keyword, category, or current location
- See relevant products and services
- Compare price, distance, delivery time, installation availability, and freshness
- Open the official merchant or service provider website

Users cannot:

- Add items to cart
- Pay inside HeatHub
- Place an order inside HeatHub
- Track delivery inside HeatHub

## Current Implementation

The app now includes:

- Next.js App Router frontend
- Typed seed data
- Search and recommendation APIs
- Product, merchant, service, city, category, map, guide, privacy, and terms pages
- Weather API with Open-Meteo fallback behavior
- Outbound click tracking
- Prisma schema and seed script for PostgreSQL or Supabase
- Affiliate feed validation script
- Sitemap and robots routes

See `docs/13_SETUP_AND_OPERATIONS.md` for setup and operations.
See `docs/14_DEPLOYMENT_CHECKLIST.md` for production deployment.
