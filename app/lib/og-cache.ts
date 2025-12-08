// クライアントサイドOGデータキャッシュ
// 重複リクエストを防止し、メモリ内にキャッシュを保持

interface OgData {
  ogTitle?: string
  ogDescription?: string
  ogImage?: string | { url: string }[] | { url: string }
  ogSiteName?: string
  success: boolean
}

interface CacheEntry {
  data: OgData
  timestamp: number
}

// インメモリキャッシュ
const ogCache = new Map<string, CacheEntry>()

// 進行中のリクエストを追跡（重複リクエスト防止）
const pendingRequests = new Map<string, Promise<OgData>>()

// キャッシュの有効期限（1時間）
const CACHE_TTL = 60 * 60 * 1000

/**
 * OGデータを取得（キャッシュ付き）
 */
export async function fetchOgDataWithCache(url: string): Promise<OgData> {
  // キャッシュを確認
  const cached = ogCache.get(url)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  // 進行中のリクエストがあれば待機
  const pending = pendingRequests.get(url)
  if (pending) {
    return pending
  }

  // 新規リクエスト
  const request = fetchOgData(url)
  pendingRequests.set(url, request)

  try {
    const data = await request
    // キャッシュに保存
    ogCache.set(url, { data, timestamp: Date.now() })
    return data
  } finally {
    pendingRequests.delete(url)
  }
}

/**
 * APIからOGデータを取得
 */
async function fetchOgData(url: string): Promise<OgData> {
  try {
    const res = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`)
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch OG data:", error)
    return { success: false }
  }
}

/**
 * キャッシュをクリア（オプション）
 */
export function clearOgCache(): void {
  ogCache.clear()
}
