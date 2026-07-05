import { NextResponse } from "next/server";
import { getCurrentWeather } from "@/lib/weather-provider";
import type { WeatherSnapshot } from "@/lib/types";

export async function GET(
  request: Request
): Promise<NextResponse<WeatherSnapshot | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? undefined;
  const weather = await getCurrentWeather(city);

  if (!weather) {
    return NextResponse.json({ error: "Weather context not found" }, { status: 404 });
  }

  return NextResponse.json(weather);
}
