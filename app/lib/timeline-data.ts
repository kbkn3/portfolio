import {
  fetchWithCache,
  fetchWithTimeout,
  generateStableId,
} from "./cache"

export type TimelineItemType =
  | "twitter"
  | "zenn"
  | "qiita"
  | "oss"
  | "blog"
  | "tech-blog"
  | "release"
  | "other"

export interface TimelineItem {
  id: string
  type: TimelineItemType
  title: string
  description?: string
  url: string
  date: string // ISO形式の日付文字列
  imageUrl?: string
  siteName?: string
  showAsTweet?: boolean // Twitter風UIで表示するかどうかのフラグ
}

const releaseItems: TimelineItem[] = [
  {
    id: generateStableId("release-honox-demo"),
    type: "release",
    title: "HonoX デモアプリのリリース",
    description:
      "「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」の資料集サイトをHonoXで作成した",
    url: "https://gensya-akuyaku-source.pages.dev/",
    date: "2024-09-18T09:15:00Z",
  },
  {
    id: generateStableId("release-ml-pog"),
    type: "release",
    title:
      "Mリーグのオリジナルチームを作って応援するためのサイトを作りました！\n\nまだ身内でテスト運用しているので怪しい部分はありますが、是非お使い頂きたいです。\n\nhttps://ml-pog.com\n\nご意見やエラー報告は問い合わせフォームやDMから！セミファイナル・ファイナルにも対応予定です！#Mリーグ",
    description: "Mリーグのオリジナルチームを作って応援するためのサイト",
    url: "https://x.com/kbkn3/status/1734170723370008605",
    date: "2023-12-11T11:18:00Z",
    imageUrl: "projects/ml-pog.png",
    siteName: "twitter",
    showAsTweet: true,
  },
  {
    id: generateStableId("release-tap-analyzer"),
    type: "release",
    title:
      "Yahoo（@lycorptech_jp）から公開されたスマートフォンの画面上のタップの成功率を表示するツール「Tappy」( https://tappy.yahoo.co.jp )にインスパイアされたChrome拡張機能を作りました。\n\nCookieなどが必要な場合でも使いたかったのでTechBlogを参考に再現…！#UX #UI #a11y",
    description: "Mリーグのオリジナルチームを作って応援するためのサイト",
    url: "https://x.com/kbkn3/status/1762030304695554279",
    date: "2024-02-26T08:22:00Z",
    imageUrl: "projects/tapAnalyzer.png",
    siteName: "twitter",
    showAsTweet: true,
  },
]

const contributionItems: TimelineItem[] = [
  {
    id: generateStableId("oss-hono-permissions-policy"),
    type: "oss",
    title:
      "feat(secureHeader): add Permissions-Policy header to secure headers middleware",
    description: "Hono middlewareへのPRがマージされました",
    url: "https://github.com/honojs/hono/pull/3314",
    date: "2024-09-08T14:45:00Z",
    siteName: "GitHub",
  },
  {
    id: generateStableId("oss-hono-website-docs"),
    type: "oss",
    title:
      "docs(middleware): add permission-policy option on security-header's page",
    description: "Honoのドキュメントに項目を追加",
    url: "https://github.com/honojs/website/pull/476",
    date: "2024-09-11T14:45:00Z",
    siteName: "GitHub",
  },
]

const techBlogItems: TimelineItem[] = [
  {
    id: generateStableId("techblog-clean-architecture"),
    type: "tech-blog",
    title:
      "新卒エンジニアがリファクタを突貫したClean Architectureプロジェクトの舞台裏",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2023/04/04/170000",
    date: "2023-04-04T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-tap-success-rate"),
    type: "tech-blog",
    title: "モバイルでのタップ成功率を可視化するツールの開発",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2024/04/05/120000",
    date: "2024-04-05T03:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-ab-test-platform"),
    type: "tech-blog",
    title: "社内A/Bテスト標準化に向けたA/Bテスト管理基盤プロトタイプの開発",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2024/08/27/170000",
    date: "2024-08-27T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-ai-code-review"),
    type: "tech-blog",
    title: "内製AIコードレビューActionsの導入",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2025/03/31/190000",
    date: "2025-03-31T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("presentation-ai-code-review"),
    type: "other",
    title: "社内の知見を最大まで活かすためのAIコードレビューの足元整備",
    url: "https://www.docswell.com/s/kbkn3/ZVMW84-lifull-ai-review",
    date: "2025-11-26T00:00:00Z",
    siteName: "docswell",
  },
]

const QIITA_USER_ID = "Kenta_Kobayashi"
const API_TIMEOUT_MS = 5000 // 5秒タイムアウト
const CACHE_MAX_AGE = 3600 // 1時間キャッシュ
const CACHE_STALE_WHILE_REVALIDATE = 86400 // 24時間stale-while-revalidate

const qiitaItems = async (): Promise<TimelineItem[]> => {
  const url = `https://qiita.com/api/v2/users/${QIITA_USER_ID}/items?page=1&per_page=100`

  return fetchWithCache(
    url,
    { maxAge: CACHE_MAX_AGE, staleWhileRevalidate: CACHE_STALE_WHILE_REVALIDATE },
    async () => {
      try {
        const response = await fetchWithTimeout(url, {}, API_TIMEOUT_MS)
        if (!response.ok) {
          console.error(`Qiita API error: ${response.status}`)
          return []
        }
        // biome-ignore lint/suspicious/noExplicitAny: Qiita APIのレスポンス型
        const data: any[] = await response.json()
        return data.map((item: any) => ({
          id: generateStableId(`qiita-${item.id}`),
          type: "qiita" as const,
          title: item.title,
          url: item.url,
          date: item.created_at,
          siteName: "Qiita",
        }))
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Qiita API timeout")
        } else {
          console.error("Qiita API error:", error)
        }
        return []
      }
    },
  )
}

const ZENN_USER_ID = "kbkn3"

const zennItems = async (): Promise<TimelineItem[]> => {
  const url = `https://zenn.dev/api/articles?username=${ZENN_USER_ID}&order=latest`

  return fetchWithCache(
    url,
    { maxAge: CACHE_MAX_AGE, staleWhileRevalidate: CACHE_STALE_WHILE_REVALIDATE },
    async () => {
      try {
        const response = await fetchWithTimeout(url, {}, API_TIMEOUT_MS)
        if (!response.ok) {
          console.error(`Zenn API error: ${response.status}`)
          return []
        }
        // biome-ignore lint/suspicious/noExplicitAny: Zenn APIのレスポンス型
        const data: { articles?: any[] } = await response.json()

        if (!data.articles || !Array.isArray(data.articles)) {
          console.error("Unexpected Zenn API response format:", data)
          return []
        }

        return data.articles.map((item: any) => ({
          id: generateStableId(`zenn-${item.slug}`),
          type: "zenn" as const,
          title: item.title,
          url: `https://zenn.dev${item.path}`,
          date: item.published_at || item.created_at,
          siteName: "Zenn",
        }))
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Zenn API timeout")
        } else {
          console.error("Zenn API error:", error)
        }
        return []
      }
    },
  )
}

// サンプルデータを非同期に取得する関数
export async function getTimelineItems(): Promise<TimelineItem[]> {
  // QiitaとZennのデータを並列に取得
  const [qiitaData, zennData] = await Promise.all([qiitaItems(), zennItems()])

  return [
    ...releaseItems,
    ...techBlogItems,
    ...qiitaData,
    ...zennData,
    ...contributionItems,
  ]
}

// 初期値として空の配列を設定（実際のデータはgetTimelineItems()で取得）
export const TIMELINE_ITEMS: TimelineItem[] = []
