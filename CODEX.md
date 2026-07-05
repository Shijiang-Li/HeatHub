# CODEX Instructions

You are developing HeatHub.

Read all Markdown files before generating code.

## Highest Product Constraint

HeatHub is not ecommerce.

Never build:

- Shopping cart
- Checkout
- Payment flow
- Order management
- Inventory management
- Warehouse logic
- Logistics tracking
- Refund flow

Always build around:

- Search
- Aggregation
- Comparison
- Map discovery
- Weather context
- Merchant redirect
- Affiliate tracking

## Engineering Rules

- Use TypeScript strict mode.
- Prefer Server Components where appropriate.
- Keep client components small and interaction-focused.
- Use reusable components.
- Keep components under 200 lines where practical.
- Keep API route handlers simple.
- Use typed request and response shapes.
- Include loading, error, and empty states.
- Build mobile-first.
- Optimize for SEO.
- Avoid unnecessary abstraction.
- Do not invent features outside the specification.

## When Requirements Are Unclear

Ask a question before implementing if the decision changes product behavior, data model, compliance, or business model.

Make reasonable implementation decisions only for styling, naming, folder structure, and small technical details.
