import Link from "next/link";
import { categoryLabels } from "@/lib/content";
import type { Category } from "@/lib/types";

type CategoryTabsProps = {
  city?: string;
  activeCategory?: Category;
};

export function CategoryTabs({ city, activeCategory }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Cooling categories">
      {Object.entries(categoryLabels).map(([category, label]) => {
        const active = category === activeCategory;
        const query = new URLSearchParams();
        if (city) {
          query.set("city", city);
        }
        query.set("category", category);

        return (
          <Link
            key={category}
            href={`/search?${query.toString()}`}
            className={`focus-ring whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium ${
              active
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink hover:border-mint"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
