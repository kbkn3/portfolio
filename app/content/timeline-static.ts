import { generateStableId } from "~/lib/cache"
import type { TimelineItem } from "~/lib/schemas"

export const releaseItems: TimelineItem[] = [
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
    description: "タップ成功率可視化ツール「Tappy」にインスパイアされたChrome拡張機能を開発",
    url: "https://x.com/kbkn3/status/1762030304695554279",
    date: "2024-02-26T08:22:00Z",
    imageUrl: "projects/tapAnalyzer.png",
    siteName: "twitter",
    showAsTweet: true,
  },
]

export const contributionItems: TimelineItem[] = [
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

export const techBlogItems: TimelineItem[] = [
  {
    id: generateStableId("techblog-clean-architecture"),
    type: "tech-blog",
    title:
      "新卒エンジニアがリファクタを突貫したClean Architectureプロジェクトの舞台裏",
    description:
      "新卒1年目でClean Architectureプロジェクトのリファクタリングに奮闘した経験と学びをまとめた記事",
    url: "https://www.lifull.blog/entry/2023/04/04/170000",
    date: "2023-04-04T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-tap-success-rate"),
    type: "tech-blog",
    title: "モバイルでのタップ成功率を可視化するツールの開発",
    description:
      "モバイルUIのタップ操作成功率を可視化するChrome拡張機能の設計・開発プロセスを解説",
    url: "https://www.lifull.blog/entry/2024/04/05/120000",
    date: "2024-04-05T03:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-ab-test-platform"),
    type: "tech-blog",
    title: "社内A/Bテスト標準化に向けたA/Bテスト管理基盤プロトタイプの開発",
    description:
      "社内A/Bテストの標準化を目的とした実験管理基盤のプロトタイプ開発についての記録",
    url: "https://www.lifull.blog/entry/2024/08/27/170000",
    date: "2024-08-27T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: generateStableId("techblog-ai-code-review"),
    type: "tech-blog",
    title: "内製AIコードレビューActionsの導入",
    description:
      "GitHub ActionsとClaude APIを活用した社内向けAIコードレビュー基盤の構築事例",
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
