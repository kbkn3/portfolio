import type { Route } from "@/app/routes/+types/_index"
import { TimelineSection } from "~/components/home"
import { getTimelineItems } from "~/lib/timeline-data"

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
 * タイムラインページのデータを取得するloader
 */
export async function loader() {
  try {
    // タイムラインデータを取得
    const timelineItems = await getTimelineItems()

    // 日付の新しい順にソート
    const sortedItems = timelineItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    return {
      timelineItems: sortedItems,
      totalCount: sortedItems.length,
    }
  } catch (error) {
    console.error("Failed to load timeline data:", error)
    return {
      error: "タイムラインデータの取得に失敗しました",
      timelineItems: [],
      totalCount: 0,
    }
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
