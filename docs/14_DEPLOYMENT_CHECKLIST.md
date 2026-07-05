# 14 Deployment Checklist

## Target

Recommended production target:

- Vercel for Next.js
- Supabase PostgreSQL for structured data
- Approved merchant or affiliate feeds for live product data
- Open-Meteo for weather context

## Required Vercel Project Variables

Add these in Vercel Project Settings:

```text
NEXT_PUBLIC_SITE_URL
OPEN_METEO_ENABLED
FEED_REVALIDATE_SECONDS
```

Add these as encrypted secrets:

```text
DATABASE_URL
AFFILIATE_FEED_URLS
```

`AFFILIATE_FEED_URLS` may be empty at first. If empty, HeatHub uses curated fallback data.

## Required GitHub Secrets

For automated production deployment, add:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
DATABASE_URL
AFFILIATE_FEED_URLS
```

Add these GitHub variables:

```text
NEXT_PUBLIC_SITE_URL
OPEN_METEO_ENABLED
FEED_REVALIDATE_SECONDS
```

## First Deployment

On this Windows workspace, load local tools first:

```powershell
. .\scripts\use-local-tools.ps1
```

1. Create a Vercel project from the GitHub repository.
2. Add environment variables in Vercel.
3. Add GitHub secrets and variables.
4. Push to `main`, or run the `Vercel Production Deploy` workflow manually.
5. Open `/api/search?city=Madrid&category=portable-ac`.
6. Open `/api/weather?city=Paris`.
7. Open `/sitemap.xml`.

## Database

For a first Supabase setup:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

For production migrations after the initial schema is stabilized:

```bash
npm run db:migrate:deploy
```

## Live Data

Use only approved HTTPS feeds:

```text
AFFILIATE_FEED_URLS="https://merchant.example/feed.json,https://network.example/heathub.json"
```

HeatHub does not assume scraping is allowed. Keep source rights recorded in the feed source metadata or database.
