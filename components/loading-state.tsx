export function LoadingState({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6" role="status" aria-live="polite">
      <p className="text-sm font-medium text-ink/70">{label}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-40 animate-pulse rounded-md border border-line bg-white" />
        ))}
      </div>
    </div>
  );
}
