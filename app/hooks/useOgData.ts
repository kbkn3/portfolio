import { useCallback, useEffect, useRef, useState } from "react"
import { ogDataSchema } from "~/lib/schemas"
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

  // urlが変わったらフェッチ済みフラグとステートをリセット
  useEffect(() => {
    fetchedRef.current = false
    const cached = ogDataCache.get(url)
    setOgData(cached ?? null)
  }, [url])

  const fetchOgData = useCallback(async () => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    try {
      const res = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`)
      if (!res.ok) {
        console.error(`OG data fetch failed: HTTP ${res.status}`)
        return
      }
      const rawData = await res.json()
      const parsed = ogDataSchema.safeParse(rawData)
      if (!parsed.success) {
        console.error("Invalid OG data response:", parsed.error)
        return
      }
      ogDataCache.set(url, parsed.data)
      setOgData(parsed.data)
    } catch (error) {
      console.error("Failed to fetch OG data:", error)
    }
  }, [url])

  useEffect(() => {
    if (skip) return

    // キャッシュ済みの場合
    const cached = ogDataCache.get(url)
    if (cached) {
      setOgData(cached)
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
  }, [url, skip, fetchOgData])

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
