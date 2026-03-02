import { describe, expect, it } from "vitest"
import {
  experienceItemSchema,
  ogDataSchema,
  projectSchema,
  qiitaResponseSchema,
  techCategorySchema,
  timelineItemSchema,
  zennResponseSchema,
} from "./schemas"

describe("timelineItemSchema", () => {
  it("有効なタイムラインアイテムを受け入れる", () => {
    const item = {
      id: "abc123",
      type: "qiita",
      title: "テスト記事",
      url: "https://qiita.com/test",
      date: "2024-01-01T00:00:00Z",
    }
    const result = timelineItemSchema.safeParse(item)
    expect(result.success).toBe(true)
  })

  it("オプションフィールドを含むアイテムを受け入れる", () => {
    const item = {
      id: "abc123",
      type: "release",
      title: "リリース",
      url: "https://example.com",
      date: "2024-01-01T00:00:00Z",
      description: "説明",
      imageUrl: "https://example.com/img.png",
      siteName: "twitter",
      showAsTweet: true,
    }
    const result = timelineItemSchema.safeParse(item)
    expect(result.success).toBe(true)
  })

  it("不正なtypeを拒否する", () => {
    const item = {
      id: "abc123",
      type: "invalid",
      title: "テスト",
      url: "https://example.com",
      date: "2024-01-01",
    }
    const result = timelineItemSchema.safeParse(item)
    expect(result.success).toBe(false)
  })

  it("必須フィールドの欠落を拒否する", () => {
    const item = {
      id: "abc123",
      type: "qiita",
      // title が欠落
      url: "https://qiita.com/test",
      date: "2024-01-01",
    }
    const result = timelineItemSchema.safeParse(item)
    expect(result.success).toBe(false)
  })
})

describe("qiitaResponseSchema", () => {
  it("有効なQiitaレスポンスを受け入れる", () => {
    const response = [
      {
        id: "abc123",
        title: "テスト記事",
        url: "https://qiita.com/test/items/abc123",
        created_at: "2024-01-01T00:00:00+09:00",
      },
    ]
    const result = qiitaResponseSchema.safeParse(response)
    expect(result.success).toBe(true)
  })

  it("空配列を受け入れる", () => {
    const result = qiitaResponseSchema.safeParse([])
    expect(result.success).toBe(true)
  })

  it("必須フィールドが欠けたアイテムを拒否する", () => {
    const response = [{ id: "abc123" }]
    const result = qiitaResponseSchema.safeParse(response)
    expect(result.success).toBe(false)
  })
})

describe("zennResponseSchema", () => {
  it("有効なZennレスポンスを受け入れる", () => {
    const response = {
      articles: [
        {
          slug: "test-article",
          title: "テスト記事",
          path: "/kbkn3/articles/test-article",
          published_at: "2024-01-01T00:00:00.000+09:00",
        },
      ],
    }
    const result = zennResponseSchema.safeParse(response)
    expect(result.success).toBe(true)
  })

  it("published_atがないアイテムも受け入れる", () => {
    const response = {
      articles: [
        {
          slug: "test",
          title: "テスト",
          path: "/test",
        },
      ],
    }
    const result = zennResponseSchema.safeParse(response)
    expect(result.success).toBe(true)
  })

  it("articlesフィールドがないレスポンスを拒否する", () => {
    const result = zennResponseSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

describe("experienceItemSchema", () => {
  it("詳細付きの経歴を受け入れる", () => {
    const item = {
      id: "test",
      period: "2022 - now",
      title: "エンジニア",
      description: "開発をしています",
      color: "bg-blue-400",
      organization: "テスト株式会社",
      details: {
        paragraphs: ["段落1", "段落2"],
        sections: [{ title: "スキル", items: ["React", "TS"] }],
        techTags: ["React"],
        articles: [{ url: "https://example.com", title: "記事" }],
      },
      links: [{ url: "https://example.com", label: "リンク", type: "website" }],
    }
    const result = experienceItemSchema.safeParse(item)
    expect(result.success).toBe(true)
  })

  it("詳細なしの経歴を受け入れる", () => {
    const item = {
      id: "test",
      period: "2020",
      title: "学生",
      description: "勉強中",
      color: "bg-cyan-400",
      organization: "大学",
    }
    const result = experienceItemSchema.safeParse(item)
    expect(result.success).toBe(true)
  })
})

describe("projectSchema", () => {
  it("有効なプロジェクトを受け入れる", () => {
    const project = {
      title: "テストプロジェクト",
      description: "説明",
      tags: ["TypeScript", "React"],
      image: "/projects/test.png",
      link: "https://github.com/test",
    }
    const result = projectSchema.safeParse(project)
    expect(result.success).toBe(true)
  })

  it("タグが空のプロジェクトも受け入れる", () => {
    const project = {
      title: "テスト",
      description: "説明",
      tags: [],
    }
    const result = projectSchema.safeParse(project)
    expect(result.success).toBe(true)
  })
})

describe("techCategorySchema", () => {
  it("有効なカテゴリを受け入れる", () => {
    const category = {
      category: "Frontend",
      skills: ["React", "TypeScript"],
    }
    const result = techCategorySchema.safeParse(category)
    expect(result.success).toBe(true)
  })
})

describe("ogDataSchema", () => {
  it("文字列の画像URLを受け入れる", () => {
    const data = {
      ogTitle: "タイトル",
      ogImage: "https://example.com/img.png",
      success: true,
    }
    const result = ogDataSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("オブジェクトの画像を受け入れる", () => {
    const data = {
      ogTitle: "タイトル",
      ogImage: { url: "https://example.com/img.png" },
      success: true,
    }
    const result = ogDataSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it("配列の画像を受け入れる", () => {
    const data = {
      ogTitle: "タイトル",
      ogImage: [{ url: "https://example.com/img.png" }],
      success: true,
    }
    const result = ogDataSchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})
