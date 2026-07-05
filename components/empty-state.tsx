import { siteCopy } from "@/lib/content";

export function EmptyState() {
  return (
    <section className="rounded-md border border-dashed border-line bg-white p-8 text-center">
      <h2 className="text-xl font-semibold">{siteCopy.empty.title}</h2>
      <p className="mt-3 text-sm text-ink/70">{siteCopy.empty.body}</p>
    </section>
  );
}
