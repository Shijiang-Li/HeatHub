# 06 API Spec

Use typed responses.

Prefer read-only endpoints for MVP.

## Search

`GET /api/search`

Query params:

- `q`
- `city`
- `country`
- `category`
- `sort`
- `delivery`
- `installation`

Returns:

- products
- merchants
- services
- weather
- ranking_explanation

## Product

`GET /api/products/[slug]`

Returns one product with merchant and outbound link.

## Merchant

`GET /api/merchants/[slug]`

Returns merchant profile and available products.

## Service Provider

`GET /api/services/[slug]`

Returns provider profile and outbound link.

## Weather

`GET /api/weather`

Query params:

- `city`
- `country`

Returns current weather and alert level.

## Outbound Click Tracking

`POST /api/outbound-click`

This endpoint tracks a click before redirect.

It must not create an order.
It must not process payment.

Body:

- `target_type`
- `target_id`
- `destination_url`
- `referrer_path`

Returns:

- `redirect_url`

## Forbidden Endpoints

Do not create:

- `/api/cart`
- `/api/checkout`
- `/api/payment`
- `/api/orders`
- `/api/refunds`
