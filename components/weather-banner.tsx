import type { WeatherSnapshot } from "@/lib/types";

const alertStyles = {
  normal: "border-mint bg-white",
  watch: "border-sun bg-white",
  high: "border-heat bg-white",
  extreme: "border-heat bg-[#fff3ed]"
} as const;

export function WeatherBanner({ weather }: { weather?: WeatherSnapshot }) {
  if (!weather) {
    return (
      <section className="rounded-md border border-line bg-white p-4">
        <p className="text-sm font-semibold">Weather context unavailable</p>
        <p className="mt-1 text-sm text-ink/70">
          Results still show source freshness and provider details.
        </p>
      </section>
    );
  }

  return (
    <section className={`rounded-md border-l-4 p-4 ${alertStyles[weather.alertLevel]}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide">
            {weather.alertLevel} heat context
          </p>
          <h2 className="mt-1 text-xl font-semibold">
            {weather.temperatureC} C, {weather.condition}
          </h2>
        </div>
        <p className="text-sm text-ink/70">
          Observed by {weather.provider} at {formatDate(weather.observedAt)}
        </p>
      </div>
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
