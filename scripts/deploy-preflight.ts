const required = ["NEXT_PUBLIC_SITE_URL", "OPEN_METEO_ENABLED"] as const;
const optional = ["DATABASE_URL", "AFFILIATE_FEED_URLS", "FEED_REVALIDATE_SECONDS"] as const;

const failures: string[] = [];

for (const key of required) {
  if (!process.env[key]) {
    failures.push(`${key} is required`);
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      failures.push("NEXT_PUBLIC_SITE_URL must use http or https");
    }
  } catch {
    failures.push("NEXT_PUBLIC_SITE_URL must be a valid URL");
  }
}

const feedUrls = process.env.AFFILIATE_FEED_URLS;

if (feedUrls) {
  for (const value of feedUrls.split(",").map((item) => item.trim()).filter(Boolean)) {
    try {
      const parsed = new URL(value);

      if (parsed.protocol !== "https:") {
        failures.push(`AFFILIATE_FEED_URLS entry must use https: ${value}`);
      }
    } catch {
      failures.push(`AFFILIATE_FEED_URLS entry is invalid: ${value}`);
    }
  }
}

const revalidateSeconds = process.env.FEED_REVALIDATE_SECONDS;

if (revalidateSeconds && Number(revalidateSeconds) < 60) {
  failures.push("FEED_REVALIDATE_SECONDS must be at least 60");
}

for (const key of optional) {
  const status = process.env[key] ? "present" : "not set";
  console.info(`${key}: ${status}`);
}

if (failures.length > 0) {
  console.error("Deployment preflight failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.info("Deployment preflight passed.");
