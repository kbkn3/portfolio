export type TimelineItemType =
  | "twitter"
  | "zenn"
  | "qiita"
  | "oss"
  | "blog"
  | "tech-blog"
  | "release"
  | "other";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  description?: string;
  url: string;
  date: string; // ISO形式の日付文字列
  imageUrl?: string;
  siteName?: string;
  showAsTweet?: boolean; // Twitter風UIで表示するかどうかのフラグ
}

const releaseItems: TimelineItem[] = [
  {
    id: crypto.randomUUID(),
    type: "release",
    title: "HonoX デモアプリのリリース",
    description: "「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」の資料集サイトをHonoXで作成した",
    url: "https://gensya-akuyaku-source.pages.dev/",
    date: "2024-09-18T09:15:00Z",
  },
  {
    id: crypto.randomUUID(),
    type: "release",
    title: "Mリーグのオリジナルチームを作って応援するためのサイトを作りました！\n\nまだ身内でテスト運用しているので怪しい部分はありますが、是非お使い頂きたいです。\n\nhttps://ml-pog.com\n\nご意見やエラー報告は問い合わせフォームやDMから！セミファイナル・ファイナルにも対応予定です！#Mリーグ",
    description: "Mリーグのオリジナルチームを作って応援するためのサイト",
    url: "https://x.com/kbkn3/status/1734170723370008605",
    date: "2024-09-18T09:15:00Z",
    siteName: "twitter",
    showAsTweet: true, // Twitter風UIで表示する
  },
];

const contributionItems: TimelineItem[] = [
  {
    id: crypto.randomUUID(),
    type: "oss",
    title: "feat(secureHeader): add Permissions-Policy header to secure headers middleware",
    description: "Hono middlewareへのPRがマージされました",
    url: "https://github.com/honojs/hono/pull/3314",
    date: "2024-09-08T14:45:00Z",
    siteName: "GitHub",
  },
  {
    id: crypto.randomUUID(),
    type: "oss",
    title: "docs(middleware): add permission-policy option on security-header's page",
    description: "Honoのドキュメントに項目を追加",
    url: "https://github.com/honojs/website/pull/476",
    date: "2024-09-11T14:45:00Z",
    siteName: "GitHub",
  },
];

const techBlogItems: TimelineItem[] = [
  {
    id: crypto.randomUUID(),
    type: "tech-blog",
    title:
      "新卒エンジニアがリファクタを突貫したClean Architectureプロジェクトの舞台裏",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2023/04/04/170000",
    date: "2023-04-04T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: crypto.randomUUID(),
    type: "tech-blog",
    title: "モバイルでのタップ成功率を可視化するツールの開発",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2024/04/05/120000",
    date: "2024-04-05T03:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
  {
    id: crypto.randomUUID(),
    type: "tech-blog",
    title: "社内A/Bテスト標準化に向けたA/Bテスト管理基盤プロトタイプの開発",
    description: "これはTech Blogの記事サンプルです",
    url: "https://www.lifull.blog/entry/2024/08/27/170000",
    date: "2024-08-27T08:00:00Z",
    siteName: "LIFULL Creators Blog",
  },
];

const qiitaItems = async (): Promise<TimelineItem[]> => {
  const USER_ID = "Kenta_Kobayashi";
  try {
    // Qiitaの記事を取得する
    const response = await fetch(
      `https://qiita.com/api/v2/users/${USER_ID}/items?page=1&per_page=100`
    );
    const data = await response.json();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return data.map((item: any) => ({
      id: crypto.randomUUID(),
      type: "qiita",
      title: item.title,
      url: item.url,
      date: item.created_at,
      siteName: "Qiita",
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const zennItems = async (): Promise<TimelineItem[]> => {
  const USER_ID = "kbkn3";
  try {
    const response = await fetch(
      `https://zenn.dev/api/articles?username=${USER_ID}&order=latest`
    );
    const data = await response.json();
    
    // Zenn API のレスポンスは { articles: [...] } の形式
    if (!data.articles || !Array.isArray(data.articles)) {
      console.error("Unexpected Zenn API response format:", data);
      return [];
    }
    
    // biome-ignore lint/suspicious/noExplicitAny: Zenn APIのレスポンス型が不明確なため
    return data.articles.map((item: any) => ({
      id: crypto.randomUUID(),
      type: "zenn",
      title: item.title,
      url: `https://zenn.dev${item.path}`,
      date: item.published_at || item.created_at,
      siteName: "Zenn",
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// サンプルデータを非同期に取得する関数
export async function getTimelineItems(): Promise<TimelineItem[]> {
  // QiitaとZennのデータを並列に取得
  const [qiitaData, zennData] = await Promise.all([
    qiitaItems(),
    zennItems()
  ]);
  
  return [
    ...releaseItems,
    ...techBlogItems,
    ...qiitaData,
    ...zennData,
    ...contributionItems,
  ];
}

// 初期値として空の配列を設定（実際のデータはgetTimelineItems()で取得）
export const TIMELINE_ITEMS: TimelineItem[] = [];
