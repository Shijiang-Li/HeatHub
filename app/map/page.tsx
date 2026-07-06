import type { Metadata } from "next";
import { MapPanel } from "@/components/map-panel";
import { SearchForm } from "@/components/search-form";
import { discoverOpenDataPlaces } from "@/lib/open-data-discovery";

export const metadata: Metadata = {
  title: "Map discovery",
  description:
    "Find nearby merchants and service providers for urgent cooling products and services."
};

export default async function MapPage() {
  const openDataPlaces = await discoverOpenDataPlaces({
    city: "Madrid",
    limit: 20
  });

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-heat">Map discovery</p>
        <h1 className="mt-2 text-3xl font-semibold">Nearby cooling options</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Browse merchants and service providers by city, then open details or official websites.
        </p>
      </div>
      <SearchForm compact />
      <MapPanel city="Madrid" openDataPlaces={openDataPlaces} />
    </div>
  );
}
