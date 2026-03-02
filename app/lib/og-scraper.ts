import { parse } from "node-html-parser"
import { fetchWithTimeout } from "./cache"

export interface OgScraperResult {
  ogTitle?: string
  ogDescription?: string
  ogImage?: { url: string }
  ogUrl?: string
  ogSiteName?: string
  requestUrl: string
  success: boolean
  error?: string
}

const OG_FETCH_TIMEOUT_MS = 8000

const BLOCKED_HOSTNAMES = [
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
]

function isBlockedDomain(url: string): boolean {
  try {
    return BLOCKED_HOSTNAMES.includes(new URL(url).hostname)
  } catch {
    return false
  }
}

/**
 * URLからOpen Graph情報を取得する
 */
export async function fetchOgData(url: string): Promise<OgScraperResult> {
  if (isBlockedDomain(url)) {
    return {
      requestUrl: url,
      success: false,
      error: "x.com domains are skipped",
    }
  }

  try {
    const response = await fetchWithTimeout(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; OGScraper/1.0; +https://example.com)",
        },
      },
      OG_FETCH_TIMEOUT_MS,
    )

    if (!response.ok) {
      return {
        requestUrl: url,
        success: false,
        error: `HTTP ${response.status} ${response.statusText}`,
      }
    }

    const html = await response.text()
    const ogData = extractOgData(html, url)

    return {
      ...ogData,
      requestUrl: url,
      success: true,
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`OG data fetch timeout for ${url}`)
      return {
        requestUrl: url,
        success: false,
        error: "Request timeout",
      }
    }

    console.error(`Failed to fetch OG data for ${url}:`, error)
    return {
      requestUrl: url,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * node-html-parser を使って HTML から OG データを抽出する
 */
function extractOgData(
  html: string,
  baseUrl: string,
): Partial<OgScraperResult> {
  const root = parse(html)

  const getMeta = (property: string): string | undefined => {
    const el =
      root.querySelector(`meta[property="${property}"]`) ??
      root.querySelector(`meta[name="${property}"]`)
    return el?.getAttribute("content") || undefined
  }

  const rawImageUrl = getMeta("og:image")
  const imageUrl = rawImageUrl ? resolveUrl(rawImageUrl, baseUrl) : undefined

  return {
    ogTitle:
      getMeta("og:title") ||
      root.querySelector("title")?.text?.trim() ||
      undefined,
    ogDescription: getMeta("og:description") || getMeta("description"),
    ogImage: imageUrl ? { url: imageUrl } : undefined,
    ogUrl: getMeta("og:url"),
    ogSiteName: getMeta("og:site_name"),
  }
}

function resolveUrl(url: string, base: string): string {
  try {
    return new URL(url, base).toString()
  } catch {
    return url
  }
}
