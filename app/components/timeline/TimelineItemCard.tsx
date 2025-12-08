import { useEffect, useRef, useState } from "react"
import { fetchOgDataWithCache } from "~/lib/og-cache"
import type { TimelineItem } from "~/lib/timeline-data"
import {
  getActionLabel,
  getActionType,
  getPlatformName,
} from "~/lib/timeline-utils"
import ActionIcon, { TwitterIcon } from "./ActionIcon"
import SiteIcon from "./SiteIcon"
import TweetCard from "./TweetCard"

interface TimelineItemCardProps {
  item: TimelineItem
}

interface OgData {
  ogTitle?: string
  ogDescription?: string
  ogImage?: string | { url: string }[] | { url: string }
  ogSiteName?: string
  success: boolean
}

// タイムラインアイテムカード
const TimelineItemCard = ({ item }: TimelineItemCardProps) => {
  const [ogData, setOgData] = useState<OgData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasFetchedRef = useRef(false)

  const date = new Date(item.date)
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
  const actionType = getActionType(item.type)

  // OGデータの遅延読み込み（キャッシュ付き）
  useEffect(() => {
    // title, description, imageUrlが既にある場合はOGデータ取得しない
    if (item.title && item.description && item.imageUrl) {
      return
    }

    // 既に取得済みの場合はスキップ
    if (hasFetchedRef.current) {
      return
    }

    // Intersection Observerで可視範囲に入ったら読み込み
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFetchedRef.current) {
          hasFetchedRef.current = true
          setIsLoading(true)

          // キャッシュ付きフェッチを使用
          fetchOgDataWithCache(item.url)
            .then((data) => {
              setOgData(data)
              setIsLoading(false)
            })
            .catch((error) => {
              console.error("Failed to fetch OG data:", error)
              setIsLoading(false)
            })
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(
      `timeline-item-${item.date}-${item.type}`,
    )
    if (element) {
      observerRef.current.observe(element)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [item.title, item.description, item.imageUrl, item.url, item.date, item.type])

  // OGデータから表示用データを取得
  const displayTitle =
    item.title || (ogData?.success ? ogData.ogTitle : item.title) || ""
  const displayImageUrl =
    item.imageUrl ||
    (ogData?.success
      ? ogData.ogImage
        ? Array.isArray(ogData.ogImage)
          ? ogData.ogImage[0]?.url
          : typeof ogData.ogImage === "string"
            ? ogData.ogImage
            : ogData.ogImage.url
        : undefined
      : undefined)
  const displaySiteName =
    item.siteName || (ogData?.success ? ogData.ogSiteName : undefined)

  // Twitterの場合、releaseタイプでsiteNameがTwitterの場合、またはshowAsTweetがtrueの場合は専用コンポーネントを使用
  if (
    item.type === "twitter" ||
    (item.type === "release" && displaySiteName === "Twitter") ||
    item.showAsTweet
  ) {
    return (
      <div
        id={`timeline-item-${item.date}-${item.type}`}
        className="flex items-start group relative pl-10 pb-10"
      >
        {/* 縦線 */}
        <div className="absolute left-3.5 top-0 h-full w-px bg-gray-700 group-last:h-6" />

        {/* アイコン */}
        <div className="absolute left-0 -top-1 flex items-center justify-center w-7 h-7 rounded-full bg-blue-900/30 border-blue-700 border-2 z-10">
          {item.type === "twitter" ? (
            <TwitterIcon />
          ) : (
            <ActionIcon type={item.type} />
          )}
        </div>

        <div className="flex-grow">
          {/* カード上部の情報 */}
          <div className="flex items-center gap-2 mb-2">
            {item.type === "twitter" ? (
              <span className="text-sm font-medium text-blue-400">Tweeted</span>
            ) : (
              <span className="text-sm font-medium text-green-400">
                Released
              </span>
            )}
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <TweetCard
              name={displaySiteName || "こばけん"}
              username="kbkn3"
              text={displayTitle}
              imageUrl={displayImageUrl}
              date={item.date}
            />
          </a>
        </div>
      </div>
    )
  }

  // アクションタイプに応じた背景色クラス
  const iconBgColorClass =
    actionType === "post"
      ? "bg-blue-900/30 border-blue-700"
      : actionType === "released"
        ? "bg-green-900/30 border-green-700"
        : "bg-purple-900/30 border-purple-700"

  return (
    <div
      id={`timeline-item-${item.date}-${item.type}`}
      className="flex items-start group relative pl-10 pb-10"
    >
      {/* 縦線 */}
      <div className="absolute left-3.5 top-0 h-full w-px bg-gray-700 group-last:h-6" />

      {/* アイコン */}
      <div
        className={`absolute left-0 -top-1 flex items-center justify-center w-7 h-7 rounded-full ${iconBgColorClass} border-2 z-10`}
      >
        <ActionIcon type={item.type} />
      </div>

      <div className="flex-grow overflow-hidden">
        {/* カード上部の情報 */}
        <div className="flex items-center gap-2 mb-2">
          {actionType === "released" ? (
            <>
              <span className="text-sm font-medium text-green-400">
                Released
              </span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          ) : actionType === "post" ? (
            <>
              <span className="text-sm font-medium text-blue-400">
                Posted on
              </span>
              <span className="text-sm font-medium text-gray-300">
                {getPlatformName(item.type)}
              </span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-purple-400">
                {getActionLabel(item.type)}
              </span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          )}
        </div>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors">
            <div className="p-4">
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {displayTitle}
              </h3>

              <div className="mt-2 flex items-center gap-2 overflow-hidden">
                {actionType === "released" ? (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400 truncate max-w-full">
                      {item.url}
                    </span>
                  </>
                ) : actionType === "post" ? (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400">
                      {formattedDate}
                    </span>
                  </>
                ) : (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400 truncate max-w-full">
                      {item.url}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default TimelineItemCard
