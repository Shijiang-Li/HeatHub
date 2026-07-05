import Link from "next/link";
import { siteCopy } from "@/lib/content";
import type { Merchant } from "@/lib/types";
import { OutboundLinkButton } from "@/components/outbound-link-button";

export function MerchantCard({ merchant }: { merchant: Merchant }) {
  const destinationUrl = merchant.affiliateBaseUrl ?? merchant.websiteUrl;

  return (
    <article className="rounded-md border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            <Link className="focus-ring rounded-md hover:text-mint" href={`/merchants/${merchant.slug}`}>
              {merchant.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            {merchant.city}, {merchant.country}
          </p>
        </div>
        <span className="rounded-md bg-paper px-2 py-1 text-sm font-semibold">
          {merchant.rating.toFixed(1)}
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Distance" value={`${merchant.distanceKm.toFixed(1)} km`} />
        <Metric label="Updated" value={formatDate(merchant.updatedAt)} />
      </dl>
      <div className="mt-4">
        <OutboundLinkButton
          targetType="merchant"
          targetId={merchant.id}
          destinationUrl={destinationUrl}
          label={siteCopy.actions.openMerchant}
        />
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}
