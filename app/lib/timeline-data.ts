import {
  contributionItems,
  releaseItems,
  techBlogItems,
} from "~/content/timeline-static"
import {
  type TimelineItem,
  qiitaResponseSchema,
  zennResponseSchema,
} from "~/lib/schemas"
import { fetchWithCache, fetchWithTimeout, generateStableId } from "./cache"

export type { TimelineItem }
export type { TimelineItemType } from "~/lib/schemas"

const QIITA_USER_ID = "Kenta_Kobayashi"
const API_TIMEOUT_MS = 5000
const CACHE_MAX_AGE = 3600
const CACHE_STALE_WHILE_REVALIDATE = 86400

const qiitaItems = async (): Promise<TimelineItem[]> => {
  const url = `https://qiita.com/api/v2/users/${QIITA_USER_ID}/items?page=1&per_page=100`

  return fetchWithCache(
    url,
    {
      maxAge: CACHE_MAX_AGE,
      staleWhileRevalidate: CACHE_STALE_WHILE_REVALIDATE,
    },
    async () => {
      try {
        const response = await fetchWithTimeout(url, {}, API_TIMEOUT_MS)
        if (!response.ok) {
          console.error(`Qiita API error: ${response.status}`)
          return []
        }

        const json = await response.json()
        const parsed = qiitaResponseSchema.safeParse(json)

        if (!parsed.success) {
          console.error("Qiita API response validation failed:", parsed.error)
          return []
        }

        return parsed.data.map((item) => ({
          id: generateStableId(`qiita-${item.id}`),
          type: "qiita" as const,
          title: item.title,
          url: item.url,
          date: item.created_at,
          siteName: "Qiita",
        }))
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Qiita API timeout")
        } else {
          console.error("Qiita API error:", error)
        }
        return []
      }
    },
  )
}

const ZENN_USER_ID = "kbkn3"

const zennItems = async (): Promise<TimelineItem[]> => {
  const url = `https://zenn.dev/api/articles?username=${ZENN_USER_ID}&order=latest`

  return fetchWithCache(
    url,
    {
      maxAge: CACHE_MAX_AGE,
      staleWhileRevalidate: CACHE_STALE_WHILE_REVALIDATE,
    },
    async () => {
      try {
        const response = await fetchWithTimeout(url, {}, API_TIMEOUT_MS)
        if (!response.ok) {
          console.error(`Zenn API error: ${response.status}`)
          return []
        }

        const json = await response.json()
        const parsed = zennResponseSchema.safeParse(json)

        if (!parsed.success) {
          console.error("Zenn API response validation failed:", parsed.error)
          return []
        }

        return parsed.data.articles.map((item) => ({
          id: generateStableId(`zenn-${item.slug}`),
          type: "zenn" as const,
          title: item.title,
          url: `https://zenn.dev${item.path}`,
          date: item.published_at || item.created_at || "",
          siteName: "Zenn",
        }))
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Zenn API timeout")
        } else {
          console.error("Zenn API error:", error)
        }
        return []
      }
    },
  )
}

export async function getTimelineItems(): Promise<TimelineItem[]> {
  const [qiitaData, zennData] = await Promise.all([qiitaItems(), zennItems()])

  return [
    ...releaseItems,
    ...techBlogItems,
    ...qiitaData,
    ...zennData,
    ...contributionItems,
  ]
}

export const TIMELINE_ITEMS: TimelineItem[] = []
