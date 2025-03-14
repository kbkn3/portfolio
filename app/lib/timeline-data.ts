export type TimelineItemType = 
  | 'twitter' 
  | 'zenn' 
  | 'qiita' 
  | 'oss' 
  | 'blog' 
  | 'tech-blog' 
  | 'release' 
  | 'other';

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  description?: string;
  url: string;
  date: string; // ISO形式の日付文字列
  imageUrl?: string;
  siteName?: string;
  tags?: string[];
}

// サンプルデータ（実際の実装では外部APIやDBから取得する）
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: '1',
    type: 'twitter',
    title: 'Twitterの投稿サンプル',
    description: 'これはTwitterの投稿サンプルです',
    url: 'https://x.com/kbkn3/status/1734170723370008605',
    date: '2023-12-11T12:00:00Z',
    siteName: 'Twitter',
    tags: ['Twitter', 'サンプル']
  },
  {
    id: '2',
    type: 'zenn',
    title: 'Zennの記事サンプル',
    description: 'これはZennの記事サンプルです',
    url: 'https://zenn.dev/lifull/articles/86661ce204d665',
    date: '2023-11-15T10:30:00Z',
    siteName: 'Zenn',
    tags: ['Zenn', 'プログラミング']
  },
  {
    id: '3',
    type: 'release',
    title: '個人開発アプリのリリース',
    description: '新しいアプリをリリースしました',
    url: 'https://github.com/kbkn3/sample-app',
    date: '2023-10-20T09:15:00Z',
    siteName: 'GitHub',
    tags: ['リリース', 'アプリ開発']
  },
  {
    id: '4',
    type: 'oss',
    title: 'OSSへのコントリビュート',
    description: 'バグ修正のPRがマージされました',
    url: 'https://github.com/sample/repo/pull/123',
    date: '2023-09-05T14:45:00Z',
    siteName: 'GitHub',
    tags: ['OSS', 'コントリビュート']
  },
  {
    id: '5',
    type: 'qiita',
    title: 'Qiitaの記事サンプル',
    description: 'これはQiitaの記事サンプルです',
    url: 'https://qiita.com/articles/sample',
    date: '2023-08-22T16:20:00Z',
    siteName: 'Qiita',
    tags: ['Qiita', 'チュートリアル']
  }
]; 