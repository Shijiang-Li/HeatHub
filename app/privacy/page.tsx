import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "HeatHub privacy principles for search and outbound click analytics."
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold">Privacy</h1>
      <div className="mt-5 space-y-4 text-ink/75">
        <p>
          HeatHub collects the minimum information needed to improve search quality and understand
          outbound click performance.
        </p>
        <p>
          The MVP does not require user accounts. City searches and outbound click events should be
          handled with privacy-friendly analytics and clear consent where required.
        </p>
      </div>
    </div>
  );
}
