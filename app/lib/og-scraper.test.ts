import { afterAll, beforeEach, describe, expect, it, vi } from "vitest"
import { fetchOgData } from "./og-scraper"

// fetchをモック
const mockFetch = vi.fn()
vi.stubGlobal("fetch", mockFetch)

beforeEach(() => {
  mockFetch.mockReset()
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe("fetchOgData", () => {
  it("x.comドメインはスキップする", async () => {
    const result = await fetchOgData("https://x.com/kbkn3/status/123")
    expect(result.success).toBe(false)
    expect(result.error).toBe("x.com domains are skipped")
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it("twitter.comドメインはスキップする", async () => {
    const result = await fetchOgData("https://twitter.com/kbkn3/status/123")
    expect(result.success).toBe(false)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it("OGメタタグからデータを正しく抽出する", async () => {
    const html = `
      <html>
        <head>
          <meta property="og:title" content="テストタイトル" />
          <meta property="og:description" content="テスト説明" />
          <meta property="og:image" content="https://example.com/image.png" />
          <meta property="og:site_name" content="テストサイト" />
          <title>フォールバックタイトル</title>
        </head>
        <body></body>
      </html>
    `
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    })

    const result = await fetchOgData("https://example.com")
    expect(result.success).toBe(true)
    expect(result.ogTitle).toBe("テストタイトル")
    expect(result.ogDescription).toBe("テスト説明")
    expect(result.ogImage).toEqual({
      url: "https://example.com/image.png",
    })
    expect(result.ogSiteName).toBe("テストサイト")
  })

  it("OGタイトルがない場合はtitleタグをフォールバックとして使う", async () => {
    const html = `
      <html>
        <head>
          <title>フォールバックタイトル</title>
        </head>
        <body></body>
      </html>
    `
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    })

    const result = await fetchOgData("https://example.com")
    expect(result.success).toBe(true)
    expect(result.ogTitle).toBe("フォールバックタイトル")
  })

  it("相対画像URLを絶対URLに変換する", async () => {
    const html = `
      <html>
        <head>
          <meta property="og:image" content="/images/test.png" />
        </head>
        <body></body>
      </html>
    `
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    })

    const result = await fetchOgData("https://example.com/page")
    expect(result.success).toBe(true)
    expect(result.ogImage).toEqual({
      url: "https://example.com/images/test.png",
    })
  })

  it("HTTPエラーを処理する", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    })

    const result = await fetchOgData("https://example.com/missing")
    expect(result.success).toBe(false)
    expect(result.error).toContain("404")
  })

  it("ネットワークエラーを処理する", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"))

    const result = await fetchOgData("https://example.com")
    expect(result.success).toBe(false)
    expect(result.error).toBe("Network error")
  })

  it("name属性のmetaタグからも説明を取得する", async () => {
    const html = `
      <html>
        <head>
          <meta name="description" content="メタ説明" />
          <title>タイトル</title>
        </head>
        <body></body>
      </html>
    `
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    })

    const result = await fetchOgData("https://example.com")
    expect(result.success).toBe(true)
    expect(result.ogDescription).toBe("メタ説明")
  })
})
