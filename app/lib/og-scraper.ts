// OGデータの型定義
export type OgData = {
  ogTitle?: string
  ogDescription?: string
  ogImage?:
    | {
        url: string
        width?: string | number
        height?: string | number
        type?: string
      }
    | {
        url: string
        width?: string | number
        height?: string | number
        type?: string
      }[]
  ogUrl?: string
  ogSiteName?: string
  requestUrl: string
  success: boolean
  error?: string
  // biome-ignore lint/suspicious/noExplicitAny: 多様なプロパティを含む可能性がある
  [key: string]: any
}

/**
 * URLからOpen Graph情報を取得する
 * @param url 取得対象のURL
 * @returns Open Graph情報
 */
export async function fetchOgData(url: string): Promise<OgData> {
  // x.comドメインの場合は取得をスキップ
  if (url.includes("x.com") || url.includes("twitter.com")) {
    return {
      requestUrl: url,
      success: false,
      error: "x.com domains are skipped",
    }
  }

  try {
    // URLからHTMLを取得
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OGScraper/1.0; +https://example.com)",
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`,
      )
    }

    const html = await response.text()

    // HTMLからOGデータを抽出
    const ogData = extractOgData(html, url)

    return {
      ...ogData,
      requestUrl: url,
      success: true,
    }
  } catch (error) {
    console.error(`Failed to fetch OG data for ${url}:`, error)
    return {
      requestUrl: url,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * HTMLからOGデータを抽出する
 * @param html HTML文字列
 * @param baseUrl ベースURL
 * @returns 抽出したOGデータ
 */
function extractOgData(html: string, baseUrl: string): Partial<OgData> {
  const ogData: Partial<OgData> = {}

  // メタタグを正規表現で抽出
  const metaTagRegex =
    /<meta[^>]+property=["']og:([^"']+)["'][^>]+content=["']([^"']+)["'][^>]*>|<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:([^"']+)["'][^>]*>/gi

  let match: RegExpExecArray | null = null
  while (true) {
    match = metaTagRegex.exec(html)
    if (match === null) break

    const property = match[1] || match[4]
    const content = match[2] || match[3]

    if (property && content) {
      if (property === "image") {
        // 画像URLを絶対URLに変換
        const imageUrl = resolveUrl(content, baseUrl)
        ogData.ogImage = { url: imageUrl }
      } else {
        // プロパティ名をogプレフィックス付きに変換
        ogData[`og${property.charAt(0).toUpperCase()}${property.slice(1)}`] =
          content
      }
    }
  }

  // タイトルタグをフォールバックとして使用
  if (!ogData.ogTitle) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch?.[1]) {
      ogData.ogTitle = titleMatch[1].trim()
    }
  }

  return ogData
}

/**
 * 相対URLを絶対URLに解決する
 * @param url 解決する相対URL
 * @param base ベースURL
 * @returns 絶対URL
 */
function resolveUrl(url: string, base: string): string {
  try {
    return new URL(url, base).toString()
  } catch (_) {
    return url
  }
}
