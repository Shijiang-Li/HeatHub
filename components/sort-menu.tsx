import Link from "next/link";
import type { SortOption } from "@/lib/types";

const options: Array<{ value: SortOption; label: string }> = [
  { value: "recommended", label: "Recommended" },
  { value: "fastest", label: "Fastest" },
  { value: "lowest-price", label: "Lowest price" },
  { value: "nearest", label: "Nearest" },
  { value: "highest-rated", label: "Highest rated" },
  { value: "recently-updated", label: "Recently updated" }
];

type SortMenuProps = {
  current: SortOption;
  query: Record<string, string | undefined>;
};

export function SortMenu({ current, query }: SortMenuProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-ink/70">Sort</span>
      {options.map((option) => {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (value) {
            params.set(key, value);
          }
        });
        params.set("sort", option.value);

        return (
          <Link
            key={option.value}
            href={`/search?${params.toString()}`}
            className={`focus-ring rounded-md border px-3 py-2 text-sm ${
              current === option.value
                ? "border-ink bg-ink text-white"
                : "border-line bg-white hover:border-mint"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
