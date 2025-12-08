import type { Route } from "@/app/routes/+types/_main._index"
import { TimelineSection } from "~/components/home"
import { getTimelineItems } from "~/lib/timeline-data"

// キャッシュ設定
const CACHE_TTL = 3600 // 1時間（秒）
const STALE_TTL = 86400 // 24時間（stale-while-revalidate用）

export function meta() {
  return [
    // ページ固有の情報
    { title: "Timeline | kbkn3's portfolio" },
    { name: "description", content: "kbkn3's timeline" },
    { rel: "canonical", href: "https://kbkn3.com" },

    // OG情報
    { property: "og:title", content: "Timeline | kbkn3's portfolio" },
    { property: "og:description", content: "kbkn3's timeline" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kbkn3.com" },
    { property: "og:locale", content: "ja_JP" },
    {
      property: "og:image",
      content:
        "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=TIMELINE",
    },
    { property: "og:image:alt", content: "kbkn3's timeline thumbnail" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@kbkn3" },
    { name: "twitter:creator", content: "@kbkn3" },
    { name: "twitter:title", content: "Timeline | kbkn3's portfolio" },
    { name: "twitter:description", content: "kbkn3's timeline" },
    {
      name: "twitter:image",
      content:
        "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=TIMELINE",
    },
    { name: "twitter:image:alt", content: "kbkn3's timeline thumbnail" },
  ]
}

/**
 * タイムラインページのデータを取得するloader（ISRキャッシュ付き）
 */
export async function loader({ context }: Route.LoaderArgs) {
  // Cloudflare Cache APIを使用（Workers環境のみ）
  const cacheKey = new Request("https://timeline-cache.internal/timeline-data")
  const cache =
    typeof caches !== "undefined" ? await caches.open("timeline-data") : null

  // キャッシュからデータを取得
  if (cache) {
    const cachedResponse = await cache.match(cacheKey)
    if (cachedResponse) {
      const cacheTimestamp = cachedResponse.headers.get("x-cache-timestamp")
      const now = Date.now()

      if (cacheTimestamp) {
        const age = now - Number.parseInt(cacheTimestamp, 10)

        // キャッシュが新鮮ならそのまま返す
        if (age < CACHE_TTL * 1000) {
          return cachedResponse.json()
        }

        // stale期間内ならキャッシュを返しつつバックグラウンドで更新
        if (age < STALE_TTL * 1000) {
          context.cloudflare?.ctx?.waitUntil?.(updateTimelineCache(cache, cacheKey))
          return cachedResponse.json()
        }
      }
    }
  }

  // キャッシュミス：新規取得
  try {
    const timelineItems = await getTimelineItems()
    const sortedItems = timelineItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    const data = {
      timelineItems: sortedItems,
      totalCount: sortedItems.length,
    }

    // キャッシュに保存
    if (cache) {
      const response = Response.json(data, {
        headers: {
          "x-cache-timestamp": Date.now().toString(),
        },
      })
      context.cloudflare?.ctx?.waitUntil?.(cache.put(cacheKey, response))
    }

    return data
  } catch (error) {
    console.error("Failed to load timeline data:", error)
    return {
      error: "タイムラインデータの取得に失敗しました",
      timelineItems: [],
      totalCount: 0,
    }
  }
}

// バックグラウンドでキャッシュを更新
async function updateTimelineCache(
  cache: Cache,
  cacheKey: Request,
): Promise<void> {
  try {
    const timelineItems = await getTimelineItems()
    const sortedItems = timelineItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    const data = {
      timelineItems: sortedItems,
      totalCount: sortedItems.length,
    }

    const response = Response.json(data, {
      headers: {
        "x-cache-timestamp": Date.now().toString(),
      },
    })
    await cache.put(cacheKey, response)
  } catch (error) {
    console.error("Background timeline cache update failed:", error)
  }
}

export default function TimelinePage({ loaderData }: Route.ComponentProps) {
  const { timelineItems, error } = loaderData

  return (
    <div className="w-full">
      <TimelineSection timelineItems={timelineItems} error={error} />
    </div>
  )
}
