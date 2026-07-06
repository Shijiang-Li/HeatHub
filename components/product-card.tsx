import Link from "next/link";
import { categoryLabels, siteCopy } from "@/lib/content";
import type { ProductResult } from "@/lib/types";
import { OutboundLinkButton } from "@/components/outbound-link-button";

export function ProductCard({ product }: { product: ProductResult }) {
  const destinationUrl = product.affiliateUrl ?? product.merchantProductUrl;

  return (
    <article className="grid gap-4 rounded-md border border-line bg-white p-4 shadow-soft md:grid-cols-[120px_1fr]">
      <div
        className="flex aspect-square items-center justify-center rounded-md bg-[#eef7f3] text-center text-sm font-semibold text-mint"
        aria-hidden="true"
      >
        {categoryLabels[product.category]}
      </div>
      <div className="grid gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            {product.reasons.map((reason) => (
              <span
                key={reason}
                className="rounded-md border border-line bg-paper px-2 py-1 text-xs font-medium"
              >
                {reason}
              </span>
            ))}
          </div>
          <h2 className="mt-3 text-xl font-semibold">
            <Link className="focus-ring rounded-md hover:text-mint" href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-ink/70">{product.description}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <Metric
            label="Price"
            value={product.price > 0 ? `${product.currency} ${product.price}` : "Check official site"}
          />
          <Metric label="Delivery" value={product.deliveryEstimate} />
          <Metric label="Distance" value={`${product.merchant.distanceKm.toFixed(1)} km`} />
          <Metric label="Rating" value={`${product.merchant.rating.toFixed(1)} / 5`} />
        </dl>
        <div className="flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-ink/70">
            <Link
              className="focus-ring rounded-md font-medium text-ink hover:text-mint"
              href={`/merchants/${product.merchant.slug}`}
            >
              {product.merchant.name}
            </Link>
            <span> in {product.merchant.city}</span>
            <p>Updated {formatDate(product.sourceUpdatedAt)}</p>
          </div>
          <OutboundLinkButton
            targetType="product"
            targetId={product.id}
            destinationUrl={destinationUrl}
            label={siteCopy.actions.officialSite}
          />
        </div>
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
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
