import { describe, expect, it } from "vitest"
import {
  experienceItemSchema,
  projectSchema,
  techCategorySchema,
  timelineItemSchema,
} from "~/lib/schemas"
import { experiences } from "./experiences"
import { projects } from "./projects"
import { technologies } from "./tech-stack"
import {
  contributionItems,
  releaseItems,
  techBlogItems,
} from "./timeline-static"

describe("コンテンツデータのバリデーション", () => {
  describe("タイムライン静的データ", () => {
    it("全てのreleaseItemsがスキーマに適合する", () => {
      for (const item of releaseItems) {
        const result = timelineItemSchema.safeParse(item)
        expect(result.success, `Failed for: ${item.title}`).toBe(true)
      }
    })

    it("全てのcontributionItemsがスキーマに適合する", () => {
      for (const item of contributionItems) {
        const result = timelineItemSchema.safeParse(item)
        expect(result.success, `Failed for: ${item.title}`).toBe(true)
      }
    })

    it("全てのtechBlogItemsがスキーマに適合する", () => {
      for (const item of techBlogItems) {
        const result = timelineItemSchema.safeParse(item)
        expect(result.success, `Failed for: ${item.title}`).toBe(true)
      }
    })

    it("全てのタイムラインアイテムにユニークなIDがある", () => {
      const allItems = [...releaseItems, ...contributionItems, ...techBlogItems]
      const ids = allItems.map((item) => item.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe("経歴データ", () => {
    it("全てのexperiencesがスキーマに適合する", () => {
      for (const exp of experiences) {
        const result = experienceItemSchema.safeParse(exp)
        expect(result.success, `Failed for: ${exp.title}`).toBe(true)
      }
    })

    it("全ての経歴にユニークなIDがある", () => {
      const ids = experiences.map((exp) => exp.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe("プロジェクトデータ", () => {
    it("全てのprojectsがスキーマに適合する", () => {
      for (const project of projects) {
        const result = projectSchema.safeParse(project)
        expect(result.success, `Failed for: ${project.title}`).toBe(true)
      }
    })
  })

  describe("技術スタックデータ", () => {
    it("全てのtechnologiesがスキーマに適合する", () => {
      for (const tech of technologies) {
        const result = techCategorySchema.safeParse(tech)
        expect(result.success, `Failed for: ${tech.category}`).toBe(true)
      }
    })

    it("各カテゴリに少なくとも1つのスキルがある", () => {
      for (const tech of technologies) {
        expect(tech.skills.length).toBeGreaterThan(0)
      }
    })
  })
})
