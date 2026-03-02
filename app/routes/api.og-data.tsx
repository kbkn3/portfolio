import type { Route } from "@/app/routes/+types/api.og-data"
import { fetchWithCache } from "~/lib/cache"
import { type OgScraperResult, fetchOgData } from "~/lib/og-scraper"

const OG_CACHE_MAX_AGE = 86400 // 24時間
const OG_CACHE_STALE_WHILE_REVALIDATE = 604800 // 7日間

function isValidHttpUrl(raw: string): boolean {
  try {
    const { protocol } = new URL(raw)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get("url")

  if (!targetUrl || !isValidHttpUrl(targetUrl)) {
    return Response.json(
      { error: "Valid HTTP(S) URL parameter is required" },
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    )
  }

  const waitUntil = context?.cloudflare?.ctx?.waitUntil?.bind(
    context.cloudflare.ctx,
  )

  try {
    const data = await fetchWithCache<OgScraperResult>(
      `og-data:${targetUrl}`,
      {
        maxAge: OG_CACHE_MAX_AGE,
        staleWhileRevalidate: OG_CACHE_STALE_WHILE_REVALIDATE,
        shouldCache: (d) => d.success,
      },
      () => fetchOgData(targetUrl),
      waitUntil,
    )

    return Response.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, max-age=${OG_CACHE_MAX_AGE}, stale-while-revalidate=${OG_CACHE_STALE_WHILE_REVALIDATE}`,
      },
    })
  } catch (error) {
    console.error("Failed to fetch OG data:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        requestUrl: targetUrl,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=60",
        },
      },
    )
  }
}
