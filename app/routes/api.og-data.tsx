import type { Route } from "@/app/routes/+types/api.og-data"
import { fetchOgData } from "~/lib/og-scraper"

// キャッシュ設定
const CACHE_TTL = 86400 // 24時間（秒）
const STALE_TTL = 604800 // 7日間（stale-while-revalidate用）

export async function loader({ request, context }: Route.LoaderArgs) {
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

  // Cloudflare Cache APIを使用（Workers環境のみ）
  const cacheKey = new Request(
    `https://og-cache.internal/${encodeURIComponent(targetUrl)}`,
  )

  // グローバルcachesはCloudflare Workers環境でのみ利用可能
  const cache =
    typeof caches !== "undefined" ? await caches.open("og-data") : null

  if (cache) {
    // キャッシュからレスポンスを取得
    const cachedResponse = await cache.match(cacheKey)
    if (cachedResponse) {
      // stale-while-revalidateを実装
      // キャッシュがあれば即座に返し、バックグラウンドで更新
      const cacheAge = cachedResponse.headers.get("x-cache-timestamp")
      const now = Date.now()

      if (cacheAge) {
        const age = now - Number.parseInt(cacheAge, 10)
        // キャッシュが新鮮ならそのまま返す
        if (age < CACHE_TTL * 1000) {
          return new Response(cachedResponse.body, {
            headers: {
              ...Object.fromEntries(cachedResponse.headers),
              "X-Cache": "HIT",
            },
          })
        }
        // stale期間内ならキャッシュを返しつつバックグラウンドで更新
        if (age < STALE_TTL * 1000) {
          // Cloudflare Workers の waitUntil でバックグラウンド更新
          context.cloudflare?.ctx?.waitUntil?.(
            updateCache(cache, cacheKey, targetUrl),
          )
          return new Response(cachedResponse.body, {
            headers: {
              ...Object.fromEntries(cachedResponse.headers),
              "X-Cache": "STALE",
            },
          })
        }
      }
    }
  }

  // キャッシュミス：新規取得
  try {
    const ogData = await fetchOgData(targetUrl)

    const response = Response.json(ogData, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
        "X-Cache": "MISS",
        "x-cache-timestamp": Date.now().toString(),
      },
    })

    // キャッシュに保存
    if (cache && ogData.success) {
      context.cloudflare?.ctx?.waitUntil?.(cache.put(cacheKey, response.clone()))
    }

    return response
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

// バックグラウンドでキャッシュを更新
async function updateCache(
  cache: Cache,
  cacheKey: Request,
  targetUrl: string,
): Promise<void> {
  try {
    const ogData = await fetchOgData(targetUrl)
    if (ogData.success) {
      const response = Response.json(ogData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": `public, max-age=${CACHE_TTL}, stale-while-revalidate=${STALE_TTL}`,
          "x-cache-timestamp": Date.now().toString(),
        },
      })
      await cache.put(cacheKey, response)
    }
  } catch (error) {
    console.error("Background cache update failed:", error)
  }
}
