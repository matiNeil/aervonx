import { NextResponse, type NextRequest } from "next/server";
import { applyAffiliateMarker } from "@/lib/affiliate";

/**
 * Central affiliate redirect.
 *
 * Cards link here as `/go?partner=<key>&u=<partner-url>`. We stamp the
 * configured affiliate marker onto the destination and 302-redirect the user
 * to the partner, where they complete the booking and we earn commission.
 *
 * Reading the request URL makes this dynamic (never cached), which is what we
 * want for a click tracker / redirect.
 */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const partner = searchParams.get("partner") ?? "generic";
  const target = searchParams.get("u");

  const finalUrl = applyAffiliateMarker(partner, target);

  // Invalid / missing target — send the user safely back home.
  if (!finalUrl) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.redirect(finalUrl, 302);
}
