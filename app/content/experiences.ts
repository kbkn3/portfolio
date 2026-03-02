import type { ExperienceItem } from "~/lib/schemas"

export const experiences: ExperienceItem[] = [
  {
    id: "bachelor",
    period: "2016 - 2020",
    title: "学士課程 工学部ナノサイエンス学科",
    description:
      "物性物理分野を専攻。卒業論文は「電荷密度から吸着サイトを推定するアルゴリズムの開発」",
    color: "bg-cyan-400",
    organization: "千葉大学",
  },
  {
    id: "trywarp",
    period: "2017 - 2022",
    title: "インターン PC講師・講座開発",
    description:
      "全国の大学生にPC講座を提供する会社で講師及びオンライン講座の新規開発事業に参加しました。",
    color: "bg-green-400",
    organization: "株式会社TRYWARP",
    details: {
      paragraphs: [
        "大学の新入生に基本的なPC操作から、Excel、PowerPoint、Wordまでを教える講座の講師を務めました。技術・スキルの多様さやカリキュラム改善への熱意を認められ、オンライン講座の新規開発事業にインターン生として参加しました。",
        "開発に際し「対面ではなく、動画のみで伝えなければならない」「受講者が満足感を得られる動画演出が必要」という課題に取り組み、様々なジャンルの講義動画を研究し、繰り返し収録と修正を行いました。",
      ],
      sections: [
        {
          title: "主な担当業務",
          items: ["講師", "講座開発", "動画編集技術講習", "関連事業のSEO対策"],
        },
      ],
    },
    links: [
      {
        url: "https://kd.koredake.net/",
        label: "コレダケ！",
        type: "website",
      },
    ],
  },
  {
    id: "master",
    period: "2020 - 2022",
    title: "修士課程 融合理工学府情報科学コース",
    description: "研究テーマは「強化学習による『接待型』ゲームAI」",
    color: "bg-purple-400",
    organization: "千葉大学大学院",
  },
  {
    id: "N-high",
    period: "2020 - 2022",
    title: "プログラミングTA（インターン）",
    description:
      "TA（ティーチングアシスタント）として生徒に様々なデジタルなものづくりの手助けを行いました。",
    color: "bg-red-400",
    organization: "学校法人角川ドワンゴ学園 N高等学校",
    details: {
      paragraphs: [
        "オンラインと対面の両方の授業形式でサポートを提供。生徒の個人プロジェクトの指導や、グループワークのファシリテーションを担当。特にゲーム開発とデータ分析の分野で多くの生徒の成長をサポートしました。",
        "職員と生徒の間に立ち、相談や情報共有の役割も担いました。",
      ],
      sections: [
        {
          title: "プログラミング",
          items: ["Python", "JavaScript", "Unity (C#)"],
        },
        {
          title: "デザイン",
          items: ["Blender", "Premiere Pro", "Photoshop"],
        },
      ],
    },
    links: [
      {
        url: "https://nnn.ed.jp/",
        label: "N高等学校",
        type: "website",
      },
    ],
  },
  {
    id: "lifull",
    period: "2022 - now",
    title: "Webエンジニア",
    description:
      "不動産ポータルサイトLIFULL HOME'Sのサービスの開発を行っています。現在は社内ABテスト基盤PJを立ち上げ、社内導入推進中。",
    color: "bg-orange-400",
    organization: "株式会社LIFULL",
    details: {
      paragraphs: [
        "フロントエンド開発を中心に、バックエンドやインフラ構築まで幅広く担当。ABテスト基盤プロジェクトではリードエンジニアとして、要件定義から設計、実装、社内展開までを主導。React、TypeScript、AWS等の最新技術を活用したシステム開発に従事しています。",
      ],
      techTags: ["React", "TypeScript", "Next.js", "AWS", "Docker", "Python"],
      articles: [
        {
          url: "https://www.lifull.blog/entry/2023/04/04/170000",
          title:
            "新卒エンジニアがリファクタを突貫したClean Architectureプロジェクトの舞台裏",
        },
        {
          url: "https://www.lifull.blog/entry/2024/04/05/120000",
          title: "モバイルでのタップ成功率を可視化するツールの開発",
        },
        {
          url: "https://www.lifull.blog/entry/2024/08/27/170000",
          title:
            "社内A/Bテスト標準化に向けたA/Bテスト管理基盤プロトタイプの開発",
        },
      ],
      presentations: [
        {
          url: "https://www.docswell.com/s/kbkn3/ZVMW84-lifull-ai-review",
          title: "社内の知見を最大まで活かすためのAIコードレビューの足元整備",
        },
      ],
    },
    links: [
      {
        url: "https://www.homes.co.jp/",
        label: "LIFULL HOME'S",
        type: "website",
      },
      {
        url: "https://lifull.com/",
        label: "株式会社LIFULL",
        type: "website",
      },
    ],
  },
  {
    id: "personal",
    period: "2022 - now",
    title: "個人開発",
    description:
      "麻雀関連のアプリケーション開発や技術記事の執筆を行っています。",
    color: "bg-blue-400",
    organization: "個人活動",
    details: {
      paragraphs: [
        "麻雀に関する個人開発プロジェクトを複数進行中。ネット麻雀アプリ向けのブラウザ拡張機能をリリースし、ユーザーから好評を得ています。また、麻雀AIの技術比較や分析に関する記事も執筆しています。",
      ],
      articles: [
        {
          url: "https://chromewebstore.google.com/detail/%E9%9B%80%E9%AD%82%E7%89%8C%E8%AD%9C%E6%A4%9C%E8%A8%8E%E3%82%B5%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC/kdmfnkdgpialmejpgflfllkjakolamcc?hl=ja",
          title: "ネット麻雀アプリ向けブラウザ拡張機能",
        },
        {
          url: "https://qiita.com/Kenta_Kobayashi/items/3b5be9224065663279f6",
          title: "麻雀何切るクイズSlackボット（GAS）",
        },
        {
          url: "https://modern-jan.com/blog/luckyj_vs_naga_and_suphx/",
          title: "麻雀AI技術比較記事",
        },
      ],
    },
    links: [
      {
        url: "https://modern-jan.com/",
        label: "モダンジャン研究会",
        type: "website",
      },
      {
        url: "https://github.com/kbkn3",
        label: "GitHub",
        type: "github",
      },
    ],
  },
]
