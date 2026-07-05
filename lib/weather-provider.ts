import { cities } from "@/lib/data";
import { getWeatherForCity } from "@/lib/search";
import type { AlertLevel, WeatherSnapshot } from "@/lib/types";

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    time?: string;
  };
};

export async function getCurrentWeather(cityName: string | undefined): Promise<WeatherSnapshot | undefined> {
  const fallback = getWeatherForCity(cityName);
  const city = cities.find(
    (item) =>
      item.name.toLowerCase() === cityName?.trim().toLowerCase() ||
      item.slug === cityName?.trim().toLowerCase()
  );

  if (!city || process.env.OPEN_METEO_ENABLED === "false") {
    return fallback;
  }

  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(city.latitude));
    url.searchParams.set("longitude", String(city.longitude));
    url.searchParams.set("current", "temperature_2m,weather_code");
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url, {
      next: {
        revalidate: 900
      }
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as OpenMeteoResponse;
    const temperature = payload.current?.temperature_2m;

    if (typeof temperature !== "number") {
      return fallback;
    }

    return {
      id: `weather-live-${city.slug}`,
      cityId: city.id,
      temperatureC: Math.round(temperature * 10) / 10,
      condition: describeWeather(payload.current?.weather_code, temperature),
      alertLevel: alertLevelForTemperature(temperature),
      provider: "Open-Meteo",
      observedAt: payload.current?.time
        ? new Date(payload.current.time).toISOString()
        : new Date().toISOString()
    };
  } catch {
    return fallback;
  }
}

function alertLevelForTemperature(temperatureC: number): AlertLevel {
  if (temperatureC >= 40) {
    return "extreme";
  }

  if (temperatureC >= 35) {
    return "high";
  }

  if (temperatureC >= 30) {
    return "watch";
  }

  return "normal";
}

function describeWeather(code: number | undefined, temperatureC: number): string {
  if (temperatureC >= 40) {
    return "Extreme heat conditions";
  }

  if (temperatureC >= 35) {
    return "Heat advisory conditions";
  }

  if (typeof code !== "number") {
    return "Current weather";
  }

  if (code >= 95) {
    return "Thunderstorm risk";
  }

  if (code >= 80) {
    return "Showers nearby";
  }

  if (code >= 51) {
    return "Drizzle or rain";
  }

  if (code >= 45) {
    return "Foggy";
  }

  if (code >= 1) {
    return "Partly cloudy";
  }

  return "Clear";
}
