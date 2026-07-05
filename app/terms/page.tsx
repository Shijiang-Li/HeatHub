import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "HeatHub terms for information-only search and comparison."
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">Terms</h1>
      <div className="mt-5 space-y-4 text-ink/75">
        <p>
          HeatHub provides information from approved sources for search and comparison. Availability,
          price, response time, and service details can change on the official merchant or provider site.
        </p>
        <p>
          HeatHub may earn a commission from some outbound links. That does not change the comparison
          fields shown in HeatHub results.
        </p>
      </div>
    </div>
  );
}
