import { describe, expect, it } from "vitest"
import {
  extractDomain,
  getActionLabel,
  getActionType,
  getPlatformName,
} from "./timeline-utils"

describe("extractDomain", () => {
  it("通常のURLからドメインを抽出する", () => {
    expect(extractDomain("https://qiita.com/test")).toBe("qiita.com")
  })

  it("x.comドメインは空文字を返す", () => {
    expect(extractDomain("https://x.com/kbkn3")).toBe("")
  })

  it("twitter.comドメインは空文字を返す", () => {
    expect(extractDomain("https://twitter.com/kbkn3")).toBe("")
  })

  it("不正なURLは空文字を返す", () => {
    expect(extractDomain("invalid-url")).toBe("")
  })

  it("サブドメイン付きのURLからドメインを抽出する", () => {
    expect(extractDomain("https://www.lifull.blog/entry/2024")).toBe(
      "www.lifull.blog",
    )
  })
})

describe("getActionType", () => {
  it("zennはpostを返す", () => {
    expect(getActionType("zenn")).toBe("post")
  })

  it("qiitaはpostを返す", () => {
    expect(getActionType("qiita")).toBe("post")
  })

  it("blogはpostを返す", () => {
    expect(getActionType("blog")).toBe("post")
  })

  it("tech-blogはpostを返す", () => {
    expect(getActionType("tech-blog")).toBe("post")
  })

  it("releaseはreleasedを返す", () => {
    expect(getActionType("release")).toBe("released")
  })

  it("ossはothersを返す", () => {
    expect(getActionType("oss")).toBe("others")
  })

  it("twitterはothersを返す", () => {
    expect(getActionType("twitter")).toBe("others")
  })

  it("otherはothersを返す", () => {
    expect(getActionType("other")).toBe("others")
  })
})

describe("getPlatformName", () => {
  it("zennはZennを返す", () => {
    expect(getPlatformName("zenn")).toBe("Zenn")
  })

  it("qiitaはQiitaを返す", () => {
    expect(getPlatformName("qiita")).toBe("Qiita")
  })

  it("blogはBlogを返す", () => {
    expect(getPlatformName("blog")).toBe("Blog")
  })

  it("tech-blogはTech Blogを返す", () => {
    expect(getPlatformName("tech-blog")).toBe("Tech Blog")
  })

  it("その他は空文字を返す", () => {
    expect(getPlatformName("oss")).toBe("")
    expect(getPlatformName("twitter")).toBe("")
  })
})

describe("getActionLabel", () => {
  it("ossはContributed toを返す", () => {
    expect(getActionLabel("oss")).toBe("Contributed to")
  })

  it("その他はCreatedを返す", () => {
    expect(getActionLabel("zenn")).toBe("Created")
    expect(getActionLabel("release")).toBe("Created")
  })
})
