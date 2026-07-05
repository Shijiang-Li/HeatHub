# 05 Data Model

## Main Entities

- Merchant
- Product
- ServiceProvider
- Category
- City
- WeatherSnapshot
- SearchEvent
- OutboundClick
- DataSource

## Merchant

Fields:

- id
- name
- slug
- country
- city
- website_url
- logo_url
- affiliate_base_url
- rating
- data_source_id
- created_at
- updated_at

## Product

Fields:

- id
- merchant_id
- category_id
- name
- slug
- brand
- description
- price
- currency
- delivery_estimate
- pickup_available
- installation_available
- merchant_product_url
- affiliate_url
- image_url
- source_updated_at
- created_at
- updated_at

## ServiceProvider

Fields:

- id
- name
- slug
- service_type
- country
- city
- website_url
- phone
- rating
- emergency_available
- estimated_response_time
- affiliate_url
- source_updated_at

## Category

Initial categories:

- Portable AC
- Fan
- AC installation
- AC repair
- Generator
- Ice
- Cooling center

## WeatherSnapshot

Fields:

- id
- city_id
- temperature_c
- condition
- alert_level
- provider
- observed_at

## SearchEvent

Fields:

- id
- query
- city
- country
- category
- filters_json
- created_at

## OutboundClick

Fields:

- id
- target_type
- target_id
- destination_url
- affiliate
- referrer_path
- created_at

## DataSource

Fields:

- id
- name
- source_type
- website
- license_notes
- update_frequency
- allowed_use
