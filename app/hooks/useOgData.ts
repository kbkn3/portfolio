import { useCallback, useEffect, useRef, useState } from "react"
import type { OgData } from "~/lib/schemas"

// クライアント側OGデータキャッシュ（セッション中有効）
const ogDataCache = new Map<string, OgData>()

interface UseOgDataOptions {
  /** OGデータ取得をスキップするかどうか */
  skip?: boolean
}

interface UseOgDataReturn {
  ogData: OgData | null
  elementRef: React.RefObject<HTMLDivElement | null>
}

/**
 * OGデータを遅延読み込みするカスタムフック
 * Intersection Observerで要素が可視範囲に入ったときにフェッチする
 */
export function useOgData(
  url: string,
  options: UseOgDataOptions = {},
): UseOgDataReturn {
  const { skip = false } = options

  const [ogData, setOgData] = useState<OgData | null>(() => {
    return ogDataCache.get(url) ?? null
  })
  const elementRef = useRef<HTMLDivElement>(null)
  const fetchedRef = useRef(false)

  const fetchOgData = useCallback(async () => {
    if (fetchedRef.current || ogData) return
    fetchedRef.current = true

    try {
      const res = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`)
      const data: OgData = await res.json()
      ogDataCache.set(url, data)
      setOgData(data)
    } catch (error) {
      console.error("Failed to fetch OG data:", error)
    }
  }, [url, ogData])

  useEffect(() => {
    if (skip) return

    // キャッシュ済みの場合
    const cached = ogDataCache.get(url)
    if (cached) {
      if (!ogData) setOgData(cached)
      return
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchOgData()
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [url, ogData, skip, fetchOgData])

  return { ogData, elementRef }
}

/**
 * OGデータから画像URLを抽出するヘルパー
 */
export function resolveOgImageUrl(
  ogImage: OgData["ogImage"],
): string | undefined {
  if (!ogImage) return undefined
  if (typeof ogImage === "string") return ogImage
  if (Array.isArray(ogImage)) return ogImage[0]?.url
  return ogImage.url
}
