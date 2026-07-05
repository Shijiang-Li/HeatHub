import { NextResponse } from "next/server";
import { getDictionary } from "@/lib/i18n";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return NextResponse.json(getDictionary(searchParams.get("locale") ?? undefined));
}
