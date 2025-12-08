/**
 * Cloudflare Workers Cache APIを使ったキャッシュユーティリティ
 */

const CACHE_NAME = "portfolio-cache-v1"

interface CacheOptions {
  /** キャッシュの有効期限（秒） */
  maxAge: number
  /** stale-while-revalidateの期間（秒） */
  staleWhileRevalidate?: number
}

// Cloudflare Workers固有のcaches.defaultを使用するための型
type CloudflareCacheStorage = CacheStorage & { default: Cache }

/**
 * Workers環境でのみキャッシュを使用する
 */
function isWorkersEnvironment(): boolean {
  return typeof caches !== "undefined" && "default" in caches
}

function getWorkersCache(): Cache {
  return (caches as CloudflareCacheStorage).default
}

/**
 * キャッシュからデータを取得、なければfetchして保存
 */
export async function fetchWithCache<T>(
  url: string,
  options: CacheOptions,
  fetcher: () => Promise<T>,
): Promise<T> {
  // Workers環境でない場合は直接フェッチ
  if (!isWorkersEnvironment()) {
    return fetcher()
  }

  const cache = getWorkersCache()
  const cacheKey = new Request(`https://cache.internal/${CACHE_NAME}/${url}`)

  // キャッシュを確認
  const cachedResponse = await cache.match(cacheKey)

  if (cachedResponse) {
    const cachedData = await cachedResponse.json()
    const age =
      (Date.now() - new Date(cachedResponse.headers.get("date") || 0).getTime()) / 1000

    // まだ新鮮な場合はそのまま返す
    if (age < options.maxAge) {
      return cachedData as T
    }

    // stale-while-revalidate期間内なら古いデータを返しつつバックグラウンドで更新
    if (options.staleWhileRevalidate && age < options.maxAge + options.staleWhileRevalidate) {
      // バックグラウンドで更新（waitUntilが使えない場合は無視）
      fetcher()
        .then(async (newData) => {
          await cacheResponse(cache, cacheKey, newData, options.maxAge)
        })
        .catch(console.error)

      return cachedData as T
    }
  }

  // キャッシュがないか期限切れの場合は新規フェッチ
  const data = await fetcher()
  await cacheResponse(cache, cacheKey, data, options.maxAge)

  return data
}

async function cacheResponse(
  cache: Cache,
  key: Request,
  data: unknown,
  maxAge: number,
): Promise<void> {
  const response = new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      Date: new Date().toISOString(),
      "Cache-Control": `public, max-age=${maxAge}`,
    },
  })
  await cache.put(key, response)
}

/**
 * タイムアウト付きfetch
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 5000,
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * URLから安定したハッシュIDを生成
 */
export function generateStableId(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 32bit整数に変換
  }
  return Math.abs(hash).toString(36)
}
