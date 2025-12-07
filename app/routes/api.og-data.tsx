import type { Route } from "@/app/routes/+types/api.og-data"
import { fetchOgData } from "~/lib/og-scraper"

const OG_CACHE_MAX_AGE = 86400 // 24時間
const OG_CACHE_STALE_WHILE_REVALIDATE = 604800 // 7日間

/**
 * Workers Cache APIを使ったOGデータのサーバーサイドキャッシュ
 */
async function getCachedOgData(
  targetUrl: string,
): Promise<{ data: unknown; cached: boolean }> {
  // Workers環境でない場合は直接フェッチ
  if (typeof caches === "undefined" || !("default" in caches)) {
    const data = await fetchOgData(targetUrl)
    return { data, cached: false }
  }

  const cache = caches.default
  const cacheKey = new Request(
    `https://og-cache.internal/og-data/${encodeURIComponent(targetUrl)}`,
  )

  // キャッシュを確認
  const cachedResponse = await cache.match(cacheKey)

  if (cachedResponse) {
    const cachedData = await cachedResponse.json()
    const dateHeader = cachedResponse.headers.get("date")
    const age = dateHeader
      ? (Date.now() - new Date(dateHeader).getTime()) / 1000
      : OG_CACHE_MAX_AGE + 1

    // まだ新鮮な場合
    if (age < OG_CACHE_MAX_AGE) {
      return { data: cachedData, cached: true }
    }

    // stale-while-revalidate期間内
    if (age < OG_CACHE_MAX_AGE + OG_CACHE_STALE_WHILE_REVALIDATE) {
      // バックグラウンドで更新
      fetchOgData(targetUrl)
        .then(async (newData) => {
          const response = new Response(JSON.stringify(newData), {
            headers: {
              "Content-Type": "application/json",
              Date: new Date().toISOString(),
            },
          })
          await cache.put(cacheKey, response)
        })
        .catch(console.error)

      return { data: cachedData, cached: true }
    }
  }

  // キャッシュミスまたは期限切れ
  const data = await fetchOgData(targetUrl)

  // キャッシュに保存
  const response = new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Date: new Date().toISOString(),
    },
  })
  await cache.put(cacheKey, response)

  return { data, cached: false }
}

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
    const { data, cached } = await getCachedOgData(targetUrl)

    return Response.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // ブラウザとCDNの両方でキャッシュ
        "Cache-Control": `public, max-age=${OG_CACHE_MAX_AGE}, stale-while-revalidate=${OG_CACHE_STALE_WHILE_REVALIDATE}`,
        // キャッシュヒット情報（デバッグ用）
        "X-Cache": cached ? "HIT" : "MISS",
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
          // エラー時は短いキャッシュ
          "Cache-Control": "public, max-age=60",
        },
      },
    )
  }
}
