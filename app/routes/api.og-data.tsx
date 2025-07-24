import type { Route } from "@/app/routes/+types/api.og-data"
import { fetchOgData } from "~/lib/og-scraper"

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get("url")

  if (!targetUrl) {
    return Response.json(
      { error: "URL parameter is required" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  }

  try {
    const ogData = await fetchOgData(targetUrl)

    return Response.json(ogData, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600", // 1時間キャッシュ
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
        },
      },
    )
  }
}
