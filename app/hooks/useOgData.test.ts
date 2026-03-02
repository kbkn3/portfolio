import { describe, expect, it } from "vitest"
import { resolveOgImageUrl } from "./useOgData"

describe("resolveOgImageUrl", () => {
  it("undefinedの場合はundefinedを返す", () => {
    expect(resolveOgImageUrl(undefined)).toBeUndefined()
  })

  it("文字列のURLをそのまま返す", () => {
    expect(resolveOgImageUrl("https://example.com/img.png")).toBe(
      "https://example.com/img.png",
    )
  })

  it("オブジェクトからURLを抽出する", () => {
    expect(resolveOgImageUrl({ url: "https://example.com/img.png" })).toBe(
      "https://example.com/img.png",
    )
  })

  it("配列の最初の要素からURLを抽出する", () => {
    expect(
      resolveOgImageUrl([
        { url: "https://example.com/first.png" },
        { url: "https://example.com/second.png" },
      ]),
    ).toBe("https://example.com/first.png")
  })

  it("空配列の場合はundefinedを返す", () => {
    expect(resolveOgImageUrl([])).toBeUndefined()
  })
})
