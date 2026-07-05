import { recommendFromResults } from "@/lib/recommendation";
import type { SearchResponse } from "@/lib/types";

export function RecommendationPanel({ results }: { results: SearchResponse }) {
  const recommendation = recommendFromResults(results);

  return (
    <section className="rounded-md border border-line bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-heat">
        Fastest reliable option
      </p>
      <h2 className="mt-2 text-xl font-semibold">{recommendation.title}</h2>
      <p className="mt-2 text-sm text-ink/70">{recommendation.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {recommendation.reasons.map((reason) => (
          <span
            key={reason}
            className="rounded-md border border-line bg-paper px-2 py-1 text-xs font-medium"
          >
            {reason}
          </span>
        ))}
      </div>
    </section>
  );
}
