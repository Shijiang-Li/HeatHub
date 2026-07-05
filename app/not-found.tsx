import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-heat">Not found</p>
      <h1 className="mt-3 text-3xl font-semibold">This HeatHub page is not available.</h1>
      <p className="mt-4 text-ink/70">
        Try searching by city, category, or provider to find current cooling options.
      </p>
      <Link
        href="/search"
        className="focus-ring mt-8 inline-flex rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-mint"
      >
        Search HeatHub
      </Link>
    </div>
  );
}
