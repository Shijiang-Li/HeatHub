import {
  AlertLevel,
  CategorySlug,
  DataSourceType,
  PrismaClient,
  ServiceType
} from "@prisma/client";
import {
  cities,
  dataSources,
  merchants,
  products,
  serviceProviders,
  weatherSnapshots
} from "../lib/data";
import type { Category } from "../lib/types";

const prisma = new PrismaClient();

const categoryIdBySlug: Record<Category, string> = {
  "portable-ac": "category-portable-ac",
  fan: "category-fan",
  "ac-installation": "category-ac-installation",
  "ac-repair": "category-ac-repair",
  generator: "category-generator",
  ice: "category-ice",
  "cooling-center": "category-cooling-center"
};

const categoryEnumBySlug: Record<Category, CategorySlug> = {
  "portable-ac": CategorySlug.PORTABLE_AC,
  fan: CategorySlug.FAN,
  "ac-installation": CategorySlug.AC_INSTALLATION,
  "ac-repair": CategorySlug.AC_REPAIR,
  generator: CategorySlug.GENERATOR,
  ice: CategorySlug.ICE,
  "cooling-center": CategorySlug.COOLING_CENTER
};

const categoryNameBySlug: Record<Category, string> = {
  "portable-ac": "Portable AC",
  fan: "Fan",
  "ac-installation": "AC installation",
  "ac-repair": "AC repair",
  generator: "Generator",
  ice: "Ice",
  "cooling-center": "Cooling center"
};

async function main() {
  for (const dataSource of dataSources) {
    await prisma.dataSource.upsert({
      where: { id: dataSource.id },
      update: {
        name: dataSource.name,
        sourceType: toDataSourceType(dataSource.sourceType),
        website: dataSource.website,
        licenseNotes: dataSource.licenseNotes,
        updateFrequency: dataSource.updateFrequency,
        allowedUse: dataSource.allowedUse
      },
      create: {
        id: dataSource.id,
        name: dataSource.name,
        sourceType: toDataSourceType(dataSource.sourceType),
        website: dataSource.website,
        licenseNotes: dataSource.licenseNotes,
        updateFrequency: dataSource.updateFrequency,
        allowedUse: dataSource.allowedUse
      }
    });
  }

  for (const city of cities) {
    await prisma.city.upsert({
      where: { id: city.id },
      update: {
        name: city.name,
        slug: city.slug,
        country: city.country,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude
      },
      create: {
        id: city.id,
        name: city.name,
        slug: city.slug,
        country: city.country,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude
      }
    });
  }

  for (const slug of Object.keys(categoryIdBySlug) as Category[]) {
    await prisma.category.upsert({
      where: { id: categoryIdBySlug[slug] },
      update: {
        name: categoryNameBySlug[slug],
        slug: categoryEnumBySlug[slug]
      },
      create: {
        id: categoryIdBySlug[slug],
        name: categoryNameBySlug[slug],
        slug: categoryEnumBySlug[slug]
      }
    });
  }

  for (const merchant of merchants) {
    await prisma.merchant.upsert({
      where: { id: merchant.id },
      update: {
        name: merchant.name,
        slug: merchant.slug,
        country: merchant.country,
        city: merchant.city,
        websiteUrl: merchant.websiteUrl,
        logoUrl: merchant.logoUrl,
        affiliateBaseUrl: merchant.affiliateBaseUrl,
        rating: merchant.rating,
        distanceKm: merchant.distanceKm ?? 99,
        dataSourceId: merchant.dataSourceId,
        createdAt: new Date(merchant.createdAt),
        updatedAt: new Date(merchant.updatedAt)
      },
      create: {
        id: merchant.id,
        name: merchant.name,
        slug: merchant.slug,
        country: merchant.country,
        city: merchant.city,
        websiteUrl: merchant.websiteUrl,
        logoUrl: merchant.logoUrl,
        affiliateBaseUrl: merchant.affiliateBaseUrl,
        rating: merchant.rating,
        distanceKm: merchant.distanceKm ?? 99,
        dataSourceId: merchant.dataSourceId,
        createdAt: new Date(merchant.createdAt),
        updatedAt: new Date(merchant.updatedAt)
      }
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        merchantId: product.merchantId,
        categoryId: categoryIdBySlug[product.category],
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        price: product.price,
        currency: product.currency,
        deliveryEstimate: product.deliveryEstimate,
        deliveryHours: product.deliveryHours,
        pickupAvailable: product.pickupAvailable,
        installationAvailable: product.installationAvailable,
        merchantProductUrl: product.merchantProductUrl,
        affiliateUrl: product.affiliateUrl,
        imageUrl: product.imageUrl,
        sourceUpdatedAt: new Date(product.sourceUpdatedAt),
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt)
      },
      create: {
        id: product.id,
        merchantId: product.merchantId,
        categoryId: categoryIdBySlug[product.category],
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        price: product.price,
        currency: product.currency,
        deliveryEstimate: product.deliveryEstimate,
        deliveryHours: product.deliveryHours,
        pickupAvailable: product.pickupAvailable,
        installationAvailable: product.installationAvailable,
        merchantProductUrl: product.merchantProductUrl,
        affiliateUrl: product.affiliateUrl,
        imageUrl: product.imageUrl,
        sourceUpdatedAt: new Date(product.sourceUpdatedAt),
        createdAt: new Date(product.createdAt),
        updatedAt: new Date(product.updatedAt)
      }
    });
  }

  for (const service of serviceProviders) {
    await prisma.serviceProvider.upsert({
      where: { id: service.id },
      update: {
        name: service.name,
        slug: service.slug,
        serviceType: toServiceType(service.serviceType),
        country: service.country,
        city: service.city,
        websiteUrl: service.websiteUrl,
        phone: service.phone,
        rating: service.rating,
        distanceKm: service.distanceKm,
        emergencyAvailable: service.emergencyAvailable,
        estimatedResponseTime: service.estimatedResponseTime,
        responseHours: service.responseHours,
        affiliateUrl: service.affiliateUrl,
        sourceUpdatedAt: new Date(service.sourceUpdatedAt)
      },
      create: {
        id: service.id,
        name: service.name,
        slug: service.slug,
        serviceType: toServiceType(service.serviceType),
        country: service.country,
        city: service.city,
        websiteUrl: service.websiteUrl,
        phone: service.phone,
        rating: service.rating,
        distanceKm: service.distanceKm,
        emergencyAvailable: service.emergencyAvailable,
        estimatedResponseTime: service.estimatedResponseTime,
        responseHours: service.responseHours,
        affiliateUrl: service.affiliateUrl,
        sourceUpdatedAt: new Date(service.sourceUpdatedAt)
      }
    });
  }

  for (const weather of weatherSnapshots) {
    await prisma.weatherSnapshot.upsert({
      where: { id: weather.id },
      update: {
        cityId: weather.cityId,
        temperatureC: weather.temperatureC,
        condition: weather.condition,
        alertLevel: toAlertLevel(weather.alertLevel),
        provider: weather.provider,
        observedAt: new Date(weather.observedAt)
      },
      create: {
        id: weather.id,
        cityId: weather.cityId,
        temperatureC: weather.temperatureC,
        condition: weather.condition,
        alertLevel: toAlertLevel(weather.alertLevel),
        provider: weather.provider,
        observedAt: new Date(weather.observedAt)
      }
    });
  }
}

function toDataSourceType(sourceType: string): DataSourceType {
  if (sourceType === "merchant-feed") {
    return DataSourceType.MERCHANT_FEED;
  }

  if (sourceType === "affiliate-feed") {
    return DataSourceType.AFFILIATE_FEED;
  }

  if (sourceType === "open-data") {
    return DataSourceType.OPEN_DATA;
  }

  return DataSourceType.MANUAL;
}

function toServiceType(serviceType: string): ServiceType {
  if (serviceType === "repair") {
    return ServiceType.REPAIR;
  }

  if (serviceType === "cooling-center") {
    return ServiceType.COOLING_CENTER;
  }

  return ServiceType.INSTALLATION;
}

function toAlertLevel(alertLevel: string): AlertLevel {
  if (alertLevel === "extreme") {
    return AlertLevel.EXTREME;
  }

  if (alertLevel === "high") {
    return AlertLevel.HIGH;
  }

  if (alertLevel === "watch") {
    return AlertLevel.WATCH;
  }

  return AlertLevel.NORMAL;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
