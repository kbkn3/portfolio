# ポートフォリオサービス アーキテクチャ再設計提案

> 「今最初からこのサービスを作るとしたら」という観点での設計案

## 1. 現状の課題分析

### 1.1 データ管理

- **コンテンツがコードにハードコード**: `timeline-data.ts` や `ExperienceSection.tsx` にデータが直接埋め込まれている
- コンテンツ更新のたびにコードの変更・デプロイが必要
- `ExperienceSection.tsx` が 555 行と肥大化（データ + ロジック + UI が混在）

### 1.2 コンポーネント設計

- 一部コンポーネントの責務が大きすぎる
- データ取得とUI表示の関心が分離されていない箇所がある
- OG データのクライアントサイドキャッシュが `Map` による素朴な実装

### 1.3 品質保証

- テストフレームワークが未導入
- API レスポンスの型安全性が不十分（外部 API のレスポンスをバリデーションなしで使用）
- エラーハンドリングが部分的

### 1.4 インフラ

- キャッシュ戦略が場所によってバラバラ
- OG スクレイピングが正規表現ベースの独自実装

---

## 2. 推奨アーキテクチャ

### 2.1 フレームワーク選定

```
現状: React Router v7 + Cloudflare Workers
推奨: Astro + React Islands + Cloudflare Pages
```

**理由:**

| 観点 | React Router v7 (現状) | Astro + React Islands (推奨) |
|------|----------------------|----------------------------|
| パフォーマンス | 全ページ JS ハイドレーション | 必要な部分だけ Islands でハイドレーション |
| コンテンツ管理 | TSX にハードコード | Content Collections (型安全 Markdown/MDX) |
| バンドルサイズ | フルReactバンドル | ゼロ JS がデフォルト、必要時のみ追加 |
| SEO/OGP | SSR で対応 | 静的生成 + SSR のハイブリッド |
| 学習コスト | React エコシステムの知識が必要 | HTML/CSS 中心、React も使える |

ポートフォリオサイトは本質的に**コンテンツ中心**であり、インタラクティブな部分は限定的（タブ切替、OGカードの遅延読込み程度）。Astro の Islands Architecture がこのユースケースに最も適合する。

> **ただし、React Router v7 を維持する選択も妥当。** SPA 的な体験や React エコシステムへの慣れを重視するなら、現状のスタックを改善する方向でもよい。以降の設計提案は**フレームワーク非依存**の部分も多い。

### 2.2 全体アーキテクチャ

```
┌─────────────────────────────────────────────────────┐
│                  Cloudflare Pages                     │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Static   │  │   SSR    │  │  Edge Functions   │  │
│  │  Assets   │  │  Pages   │  │  (API Routes)     │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│        │              │               │               │
│        │              │        ┌──────┴──────┐       │
│        │              │        │             │       │
│        │              │   ┌────▼───┐   ┌────▼───┐   │
│        │              │   │ KV     │   │ Cache  │   │
│        │              │   │ Store  │   │ API    │   │
│        │              │   └────────┘   └────────┘   │
│        │              │                              │
└────────┼──────────────┼──────────────────────────────┘
         │              │
    ┌────▼────┐   ┌─────▼─────┐
    │  CDN    │   │ External  │
    │         │   │ APIs      │
    └─────────┘   │ (Qiita,   │
                  │  Zenn)    │
                  └───────────┘
```

### 2.3 レイヤー構成

```
src/
├── content/                  # ★ コンテンツ層（データとコードの分離）
│   ├── timeline/             #   タイムラインエントリ (Markdown/YAML)
│   │   ├── 2024-release-app.md
│   │   ├── 2024-oss-contribution.md
│   │   └── ...
│   ├── experience/           #   職歴データ (YAML/JSON)
│   │   ├── company-a.yaml
│   │   └── company-b.yaml
│   ├── projects/             #   プロジェクトデータ
│   │   ├── project-a.yaml
│   │   └── project-b.yaml
│   └── config.ts             #   Content Collections スキーマ定義
│
├── features/                 # ★ Feature-based コンポーネント
│   ├── timeline/
│   │   ├── components/       #   UI コンポーネント
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── TweetCard.tsx
│   │   │   └── YearGroup.tsx
│   │   ├── hooks/            #   カスタムフック
│   │   │   └── useOgData.ts
│   │   ├── lib/              #   ドメインロジック
│   │   │   ├── types.ts
│   │   │   ├── fetch-external.ts
│   │   │   └── transform.ts
│   │   └── index.ts          #   Public API
│   │
│   ├── portfolio/
│   │   ├── components/
│   │   │   ├── ExperienceCard.tsx    # 1社分のカード（小さく保つ）
│   │   │   ├── ExperienceDetail.tsx  # 詳細ダイアログ
│   │   │   ├── ProjectCard.tsx
│   │   │   └── TechStackGrid.tsx
│   │   ├── lib/
│   │   │   └── types.ts
│   │   └── index.ts
│   │
│   └── og-preview/
│       ├── components/
│       │   └── LinkCard.tsx
│       ├── lib/
│       │   ├── scraper.ts
│       │   └── cache.ts
│       └── index.ts
│
├── shared/                   # ★ 共通モジュール
│   ├── components/
│   │   ├── ui/               #   Shadcn UI ベースコンポーネント
│   │   ├── layout/           #   Header, Footer, Hero
│   │   └── SectionHeading.tsx
│   ├── lib/
│   │   ├── utils.ts          #   cn() など汎用ユーティリティ
│   │   └── constants.ts
│   └── types/
│       └── index.ts
│
├── pages/                    # ★ ページ（ルーティング）
│   ├── index.astro           #   / (Timeline)
│   ├── portfolio.astro       #   /portfolio
│   └── api/
│       └── og-data.ts        #   /api/og-data
│
├── styles/
│   ├── global.css            #   Tailwind + CSS Variables
│   └── tokens.css            #   デザイントークン
│
└── tests/                    # ★ テスト
    ├── unit/
    │   ├── timeline/
    │   └── og-preview/
    ├── integration/
    │   └── api/
    └── e2e/
        ├── timeline.spec.ts
        └── portfolio.spec.ts
```

---

## 3. 設計の詳細

### 3.1 コンテンツとコードの分離

**現状の問題:**

```typescript
// timeline-data.ts に直接データが埋め込まれている
const releaseItems: TimelineItem[] = [
  {
    type: "release",
    title: "アプリリリース",
    date: "2024-06-15",
    url: "https://...",
    // ...
  },
  // 数十件のデータが続く...
]
```

**改善案: Content Collections パターン**

```yaml
# content/timeline/2024-06-app-release.yaml
type: release
title: アプリリリース
date: 2024-06-15
url: https://example.com/app
description: 初のモバイルアプリをリリース
tags: [mobile, react-native]
```

```typescript
// content/config.ts - Zod スキーマで型安全にバリデーション
import { z } from "zod"

export const timelineSchema = z.object({
  type: z.enum(["release", "blog", "oss", "qiita", "zenn", "other"]),
  title: z.string(),
  date: z.coerce.date(),
  url: z.string().url(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional(),
})

export type TimelineEntry = z.infer<typeof timelineSchema>
```

**メリット:**

- コンテンツ更新が YAML/Markdown の編集だけで完結
- Zod によるビルド時バリデーション
- 型安全性が保証される
- 非エンジニアでもコンテンツ追加が容易

### 3.2 外部 API 統合の改善

**現状の問題:**

```typescript
// バリデーションなしで外部 API レスポンスを信頼
const res = await fetch(`https://qiita.com/api/v2/users/${userId}/items`)
const data = await res.json()
// data の型が any 相当
```

**改善案:**

```typescript
// features/timeline/lib/fetch-external.ts

import { z } from "zod"

// 外部 API レスポンスを Zod で検証
const qiitaArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  created_at: z.string().datetime(),
  likes_count: z.number(),
  tags: z.array(z.object({ name: z.string() })),
})

const qiitaResponseSchema = z.array(qiitaArticleSchema)

export async function fetchQiitaArticles(
  userId: string,
): Promise<TimelineEntry[]> {
  const res = await fetch(
    `https://qiita.com/api/v2/users/${userId}/items?per_page=20`,
    { signal: AbortSignal.timeout(5000) },
  )

  if (!res.ok) {
    console.error(`Qiita API error: ${res.status}`)
    return []
  }

  const parsed = qiitaResponseSchema.safeParse(await res.json())

  if (!parsed.success) {
    console.error("Qiita response validation failed:", parsed.error)
    return []
  }

  return parsed.data.map(toTimelineEntry)
}
```

### 3.3 キャッシュ戦略の統一

```
┌─────────────────────────────────────────┐
│           キャッシュ階層                   │
│                                          │
│  L1: クライアント (stale-while-revalidate) │
│   └─ SWR / TanStack Query               │
│                                          │
│  L2: Cloudflare KV (永続化)               │
│   └─ TTL: 1時間 (外部API)                │
│   └─ TTL: 24時間 (OGデータ)               │
│                                          │
│  L3: Cloudflare Cache API (CDNエッジ)     │
│   └─ stale-while-revalidate ヘッダー      │
│                                          │
│  Origin: 外部 API / OG スクレイピング      │
└─────────────────────────────────────────┘
```

**Cloudflare KV を導入する理由:**

- 現状の Cache API は Cloudflare Workers 内でしか使えない
- KV は永続的な key-value ストアで、Workers 間で共有可能
- OG データや外部 API レスポンスの永続キャッシュに最適
- 無料枠で十分（読取 100k/日、書込 1k/日）

```typescript
// features/og-preview/lib/cache.ts

interface CacheLayer<T> {
  get(key: string): Promise<T | null>
  set(key: string, value: T, ttl?: number): Promise<void>
}

// Cloudflare KV をキャッシュ層として使用
export class KVCache<T> implements CacheLayer<T> {
  constructor(
    private kv: KVNamespace,
    private prefix: string,
    private defaultTtl: number,
  ) {}

  async get(key: string): Promise<T | null> {
    const value = await this.kv.get(`${this.prefix}:${key}`, "json")
    return value as T | null
  }

  async set(key: string, value: T, ttl?: number): Promise<void> {
    await this.kv.put(`${this.prefix}:${key}`, JSON.stringify(value), {
      expirationTtl: ttl ?? this.defaultTtl,
    })
  }
}
```

### 3.4 コンポーネント設計原則

**原則: 1コンポーネント = 1責務、最大 150 行**

現状の `ExperienceSection.tsx`（555行）を分解する例:

```
ExperienceSection.tsx (555行)
  ↓ 分解
ExperienceSection/
  ├── ExperienceSection.tsx      # セクションレイアウト (50行)
  ├── ExperienceTimeline.tsx     # タイムライン表示 (60行)
  ├── ExperienceCard.tsx         # 1社分のカード (80行)
  ├── ExperienceDetailDialog.tsx # 詳細モーダル (100行)
  ├── TechBadge.tsx              # 技術タグ表示 (30行)
  └── types.ts                   # データは content/ から読み込み
```

**コンポーネント間のデータフロー:**

```
[Content Collections]
        │
        ▼
[Page (データ取得)] ──props──▶ [Section (レイアウト)]
                                    │
                              ┌─────┼─────┐
                              ▼     ▼     ▼
                          [Card] [Card] [Card]
                              │
                              ▼
                        [DetailDialog]
```

### 3.5 テスト戦略

```
テストピラミッド:
                    ╱╲
                   ╱ E2E ╲          Playwright (2-3 シナリオ)
                  ╱────────╲        - ページ遷移
                 ╱Integration╲      - OGカード表示
                ╱──────────────╲
               ╱    Unit Tests   ╲   Vitest (高カバレッジ)
              ╱────────────────────╲  - データ変換ロジック
             ╱    Type Checking     ╲ - スキーマバリデーション
            ╱────────────────────────╲- ユーティリティ関数
```

```typescript
// tests/unit/timeline/transform.test.ts
import { describe, expect, it } from "vitest"
import { toTimelineEntry } from "~/features/timeline/lib/transform"

describe("toTimelineEntry", () => {
  it("Qiita記事をTimelineEntryに変換できる", () => {
    const qiitaArticle = {
      id: "abc123",
      title: "Reactの記事",
      url: "https://qiita.com/user/items/abc123",
      created_at: "2024-06-15T00:00:00+09:00",
      likes_count: 10,
      tags: [{ name: "React" }],
    }

    const result = toTimelineEntry(qiitaArticle)

    expect(result).toMatchObject({
      type: "qiita",
      title: "Reactの記事",
      date: new Date("2024-06-15"),
    })
  })
})
```

### 3.6 OG プレビューの改善

**現状:** 正規表現ベースの自前 HTML パーサー
**改善案:** `node-html-parser`（既に依存に含まれている）をフル活用 + フォールバック

```typescript
// features/og-preview/lib/scraper.ts

import { parse } from "node-html-parser"

interface OgData {
  title: string
  description: string
  image: string
  siteName: string
  favicon: string
}

export async function scrapeOgData(url: string): Promise<OgData> {
  const res = await fetch(url, {
    headers: { "User-Agent": "bot" },
    signal: AbortSignal.timeout(5000),
  })

  const html = await res.text()
  const root = parse(html)

  const getMeta = (property: string): string =>
    root
      .querySelector(`meta[property="${property}"], meta[name="${property}"]`)
      ?.getAttribute("content") ?? ""

  const origin = new URL(url).origin

  return {
    title: getMeta("og:title") || root.querySelector("title")?.text || "",
    description: getMeta("og:description") || getMeta("description"),
    image: getMeta("og:image"),
    siteName: getMeta("og:site_name") || new URL(url).hostname,
    favicon: `${origin}/favicon.ico`,
  }
}
```

---

## 4. 技術スタック比較

| カテゴリ | 現状 | 推奨 | 理由 |
|---------|------|------|------|
| フレームワーク | React Router v7 | **Astro + React** | コンテンツサイトに最適化 |
| ランタイム | Cloudflare Workers | **Cloudflare Pages** (継続) | 安定した選択 |
| スタイリング | Tailwind CSS v4 | **Tailwind CSS v4** (継続) | 問題なし |
| UI ライブラリ | Shadcn UI | **Shadcn UI** (継続) | 問題なし |
| データ管理 | ハードコード | **Content Collections + Zod** | 型安全なコンテンツ管理 |
| キャッシュ | Cache API + Map | **Cloudflare KV + Cache API** | 統一的なキャッシュ戦略 |
| API バリデーション | なし | **Zod** | ランタイム型安全性 |
| テスト | なし | **Vitest + Playwright** | 品質保証 |
| パッケージ管理 | Bun | **Bun** (継続) | 問題なし |
| Lint/Format | Biome | **Biome** (継続) | 問題なし |

---

## 5. 段階的な移行戦略

フルリライトではなく、段階的に改善していくアプローチを推奨:

### Phase 1: データ分離（低リスク・高効果）

1. コンテンツをコードから YAML/Markdown ファイルに分離
2. Zod スキーマを導入してデータバリデーション
3. 外部 API レスポンスの型安全化

### Phase 2: コンポーネントリファクタリング

1. 巨大コンポーネントの分解（ExperienceSection など）
2. Feature-based ディレクトリ構造への移行
3. カスタムフックの抽出

### Phase 3: インフラ改善

1. Cloudflare KV によるキャッシュ統一
2. OG スクレイパーの改善
3. エラーハンドリングの強化

### Phase 4: テスト導入

1. Vitest セットアップ
2. データ変換ロジックのユニットテスト
3. API エンドポイントの統合テスト

### Phase 5: フレームワーク移行（オプション）

1. Astro への移行検討
2. 既存 React コンポーネントを Islands として再利用
3. 静的生成 + ISR のハイブリッド化

---

## 6. まとめ

最も大きなインパクトをもたらす改善は以下の 3 つ:

1. **コンテンツとコードの分離** — 保守性が劇的に向上
2. **Zod によるデータバリデーション** — 外部 API 連携の堅牢性向上
3. **Feature-based アーキテクチャ** — コードベースの見通しと拡張性向上

フレームワーク自体の変更（Astro 移行）は Phase 5 のオプションとし、まずは現在の React Router v7 ベースのまま上記の改善を進めるのが最も現実的。
