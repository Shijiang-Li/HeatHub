# 08 AI Engineering Rules

## Product Guardrails

Never implement ecommerce behavior.

Forbidden:

- Cart
- Checkout
- Payment
- Order
- Refund
- Inventory management
- Delivery tracking

Required:

- Search
- Compare
- Explain
- Redirect
- Track outbound click

## Code Style

- TypeScript strict mode
- Tailwind CSS
- Accessible components
- Mobile-first layout
- Reusable component boundaries
- Clear naming
- Small functions
- Small route handlers

## UI States

Every data-driven view must support:

- Loading state
- Empty state
- Error state
- Success state

## SEO

Use semantic HTML.

Important pages should include:

- Metadata title
- Metadata description
- Canonical URL where relevant
- Structured data when useful

## Internationalization

Do not hard-code large UI text directly inside components.

Prepare for:

- English
- French
- German
- Spanish
- Italian

## Data Source Rules

Prefer:

1. Official APIs
2. Merchant feeds
3. Affiliate feeds
4. Open data
5. Manual curated data

Do not assume scraping is allowed.

If scraping is considered later, check legal terms first.
