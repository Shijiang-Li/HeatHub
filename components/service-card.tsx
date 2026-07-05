import Link from "next/link";
import { siteCopy } from "@/lib/content";
import type { ServiceResult } from "@/lib/types";
import { OutboundLinkButton } from "@/components/outbound-link-button";

export function ServiceCard({ service }: { service: ServiceResult }) {
  const destinationUrl = service.affiliateUrl ?? service.websiteUrl;

  return (
    <article className="rounded-md border border-line bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {service.reasons.map((reason) => (
          <span
            key={reason}
            className="rounded-md border border-line bg-paper px-2 py-1 text-xs font-medium"
          >
            {reason}
          </span>
        ))}
      </div>
      <h2 className="mt-3 text-lg font-semibold">
        <Link className="focus-ring rounded-md hover:text-mint" href={`/services/${service.slug}`}>
          {service.name}
        </Link>
      </h2>
      <p className="mt-1 text-sm capitalize text-ink/70">
        {service.serviceType.replace("-", " ")} in {service.city}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Metric label="Response" value={service.estimatedResponseTime} />
        <Metric label="Distance" value={`${service.distanceKm.toFixed(1)} km`} />
        <Metric label="Rating" value={`${service.rating.toFixed(1)} / 5`} />
        <Metric label="Updated" value={formatDate(service.sourceUpdatedAt)} />
      </dl>
      <div className="mt-4">
        <OutboundLinkButton
          targetType="service"
          targetId={service.id}
          destinationUrl={destinationUrl}
          label={siteCopy.actions.contactProvider}
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
