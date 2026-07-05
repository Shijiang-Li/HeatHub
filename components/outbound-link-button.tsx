"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { OutboundClickRequest } from "@/lib/types";

type OutboundLinkButtonProps = {
  targetType: OutboundClickRequest["target_type"];
  targetId: string;
  destinationUrl: string;
  label: string;
};

export function OutboundLinkButton({
  targetType,
  targetId,
  destinationUrl,
  label
}: OutboundLinkButtonProps) {
  const pathname = usePathname();
  const [isOpening, setIsOpening] = useState(false);

  async function handleClick() {
    setIsOpening(true);

    try {
      const response = await fetch("/api/outbound-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          target_type: targetType,
          target_id: targetId,
          destination_url: destinationUrl,
          referrer_path: pathname
        } satisfies OutboundClickRequest)
      });

      const payload = (await response.json()) as { redirect_url?: string };
      window.location.assign(payload.redirect_url ?? destinationUrl);
    } catch {
      window.location.assign(destinationUrl);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-mint disabled:cursor-wait disabled:opacity-70"
      disabled={isOpening}
    >
      {isOpening ? "Opening official site" : label}
    </button>
  );
}
