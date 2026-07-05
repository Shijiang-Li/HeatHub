import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About HeatHub",
  description: "HeatHub is an information aggregation and comparison platform for urgent cooling needs."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">About HeatHub</h1>
      <div className="mt-5 space-y-4 text-ink/75">
        <p>
          HeatHub helps people find cooling products and service providers during extreme heat.
          It focuses on search, comparison, weather context, map discovery, and official outbound links.
        </p>
        <p>
          HeatHub does not process transactions. After opening a merchant or provider site, all final
          details are handled by that external destination.
        </p>
      </div>
    </div>
  );
}
