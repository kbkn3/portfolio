import { z } from "zod"

// ===== Timeline =====

export const timelineItemTypeSchema = z.enum([
  "twitter",
  "zenn",
  "qiita",
  "oss",
  "blog",
  "tech-blog",
  "release",
  "other",
])

export type TimelineItemType = z.infer<typeof timelineItemTypeSchema>

export const timelineItemSchema = z.object({
  id: z.string(),
  type: timelineItemTypeSchema,
  title: z.string(),
  description: z.optional(z.string()),
  url: z.string(),
  date: z.string(),
  imageUrl: z.optional(z.string()),
  siteName: z.optional(z.string()),
  showAsTweet: z.optional(z.boolean()),
})

export type TimelineItem = z.infer<typeof timelineItemSchema>

// ===== External API Responses =====

export const qiitaArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  created_at: z.string(),
})

export const qiitaResponseSchema = z.array(qiitaArticleSchema)

export const zennArticleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  path: z.string(),
  published_at: z.optional(z.string()),
  created_at: z.optional(z.string()),
})

export const zennResponseSchema = z.object({
  articles: z.array(zennArticleSchema),
})

// ===== Experience =====

export const experienceLinkSchema = z.object({
  url: z.string(),
  label: z.string(),
  type: z.enum(["website", "video", "github", "article", "other"]),
})

export type ExperienceLink = z.infer<typeof experienceLinkSchema>

export const experienceDetailSectionSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
})

export const experienceDetailSchema = z.object({
  paragraphs: z.array(z.string()),
  sections: z.optional(z.array(experienceDetailSectionSchema)),
  techTags: z.optional(z.array(z.string())),
  articles: z.optional(
    z.array(z.object({ url: z.string(), title: z.string() })),
  ),
  presentations: z.optional(
    z.array(z.object({ url: z.string(), title: z.string() })),
  ),
})

export type ExperienceDetail = z.infer<typeof experienceDetailSchema>

export const experienceItemSchema = z.object({
  id: z.string(),
  period: z.string(),
  title: z.string(),
  description: z.string(),
  color: z.string(),
  organization: z.string(),
  details: z.optional(experienceDetailSchema),
  links: z.optional(z.array(experienceLinkSchema)),
})

export type ExperienceItem = z.infer<typeof experienceItemSchema>

// ===== Project =====

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.optional(z.string()),
  link: z.optional(z.string()),
  tags: z.array(z.string()),
  articleTitle: z.optional(z.string()),
  articleUrl: z.optional(z.string()),
  serviceTitle: z.optional(z.string()),
  serviceUrl: z.optional(z.string()),
})

export type Project = z.infer<typeof projectSchema>

// ===== Tech Stack =====

export const techCategorySchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
})

export type TechCategory = z.infer<typeof techCategorySchema>

// ===== OG Data =====

export const ogDataSchema = z.object({
  ogTitle: z.optional(z.string()),
  ogDescription: z.optional(z.string()),
  ogImage: z.optional(
    z.union([
      z.string(),
      z.object({ url: z.string() }),
      z.array(z.object({ url: z.string() })),
    ]),
  ),
  ogSiteName: z.optional(z.string()),
  success: z.boolean(),
})

export type OgData = z.infer<typeof ogDataSchema>
