import type { Route } from "@/app/routes/+types/_portfolio.timeline"
import { TimelineSection } from "~/components/home"
import { fetchOgData } from "~/lib/og-scraper"
import { getTimelineItems } from "~/lib/timeline-data"

export function meta() {
  return [
    { title: "Timeline | kbkn3's portfolio" },
    { name: "description", content: "kbkn3's timeline" },
    // OG情報
    { property: "og:title", content: "Timeline | kbkn3's portfolio" },
    { property: "og:description", content: "kbkn3's timeline" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kbkn3.com/timeline" },
    { property: "og:image", content: "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=TIMELINE" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Timeline | kbkn3's portfolio" },
    { name: "twitter:description", content: "kbkn3's timeline" },
    { name: "twitter:image", content: "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=TIMELINE" },
  ]
}

/**
 * タイムラインページのデータを取得するloader
 */
export async function loader() {
  try {
    // サンプルデータを取得
    const timelineItems = await getTimelineItems();
    
    // OG情報を取得して結合
    const itemsWithOgData = await Promise.all(
      timelineItems.map(async (item) => {
        const ogData = await fetchOgData(item.url);
        
        // OG情報が取得できた場合は結合
        if (ogData.success) {
          return {
            ...item,
            title: item.title || ogData.ogTitle || '',
            description: item.description || ogData.ogDescription || '',
            imageUrl: item.imageUrl || (ogData.ogImage ? (Array.isArray(ogData.ogImage) ? ogData.ogImage[0]?.url : ogData.ogImage.url) : undefined),
            siteName: ogData.ogSiteName
          };
        }
        
        return item;
      })
    );
    
    // 日付の新しい順にソート
    const sortedItems = itemsWithOgData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return { 
      timelineItems: sortedItems,
      totalCount: sortedItems.length
    };
  } catch (error) {
    console.error('Failed to load timeline data:', error);
    return {
      error: 'タイムラインデータの取得に失敗しました',
      timelineItems: [],
      totalCount: 0
    };
  }
}

export default function TimelinePage({
  loaderData
}: Route.ComponentProps) {
  const { timelineItems, error } = loaderData
  
  return (
    <div className="w-full">
      <TimelineSection timelineItems={timelineItems} error={error} />
    </div>
  )
} 