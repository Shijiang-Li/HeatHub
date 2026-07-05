import { siteCopy } from "@/lib/content";

export function ErrorState() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6" role="alert">
      <p className="text-sm font-semibold uppercase tracking-wide text-heat">
        {siteCopy.error.title}
      </p>
      <h1 className="mt-3 text-3xl font-semibold">HeatHub could not load this view.</h1>
      <p className="mt-4 text-ink/70">{siteCopy.error.body}</p>
    </section>
  );
}
