import { categoryLabels } from "@/lib/content";
import type { Category, SortOption } from "@/lib/types";

type SearchFormProps = {
  defaultQuery?: string;
  defaultCity?: string;
  defaultCategory?: Category;
  defaultSort?: SortOption;
  compact?: boolean;
};

export function SearchForm({
  defaultQuery = "",
  defaultCity = "",
  defaultCategory,
  defaultSort = "recommended",
  compact = false
}: SearchFormProps) {
  return (
    <form
      action="/search"
      className="grid gap-3 rounded-md border border-line bg-white p-3 shadow-soft md:grid-cols-[1.2fr_1fr_1fr_auto]"
    >
      <label className="grid gap-1 text-sm font-medium">
        Keyword
        <input
          className="focus-ring min-h-11 rounded-md border border-line px-3 text-base"
          name="q"
          defaultValue={defaultQuery}
          placeholder="portable AC, fan, repair"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        City
        <input
          className="focus-ring min-h-11 rounded-md border border-line px-3 text-base"
          name="city"
          defaultValue={defaultCity}
          placeholder="Paris"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Category
        <select
          className="focus-ring min-h-11 rounded-md border border-line bg-white px-3 text-base"
          name="category"
          defaultValue={defaultCategory ?? ""}
        >
          <option value="">All categories</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <input type="hidden" name="sort" value={defaultSort} />
      <button
        type="submit"
        className="focus-ring min-h-11 self-end rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-mint"
      >
        {compact ? "Search" : "Search options"}
      </button>
    </form>
  );
}
