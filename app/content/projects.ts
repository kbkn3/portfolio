import type { Project } from "~/lib/schemas"

export const projects: Project[] = [
  {
    title: "モダンジャン研究会HP",
    description: "モダンジャン研究会のHP",
    image: "/projects/modern-jan.com_.png",
    serviceTitle: "サイトを見る",
    serviceUrl: "https://modern-jong.com",
    tags: ["WordPress", "PHP", "CSS"],
  },
  {
    title: "雀魂牌譜検討サポーター",
    description:
      "雀魂の牌譜検討で簡単にNAGAやmjai-reviewer(Mortal/Akochan)を利用するための非公式拡張機能",
    image:
      "https://github.com/kbkn3/MahjongSoul-review-supporter/blob/develop/imgs/Animation.gif?raw=true",
    link: "https://github.com/kbkn3/MahjongSoul-review-supporter",
    articleTitle:
      "雀魂でもNAGA/Mortalでワンクリック牌譜検討！拡張機能リリースしました。",
    articleUrl: "https://modern-jan.com/2022/07/19/mjrs/",
    serviceTitle: "雀魂牌譜検討サポーター - Chrome ウェブストア",
    serviceUrl:
      "https://chromewebstore.google.com/detail/%E9%9B%80%E9%AD%82%E7%89%8C%E8%AD%9C%E6%A4%9C%E8%A8%8E%E3%82%B5%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC/kdmfnkdgpialmejpgflfllkjakolamcc?hl=ja",
    tags: ["TypeScript", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "ML-POG（現在サービス終了）",
    description: "Mリーグのオリジナルチームを作って応援するためのサイト",
    image: "/projects/ml-pog.png",
    articleTitle: "告知Twitter",
    articleUrl: "https://x.com/kbkn3/status/1734170723370008605",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Auth.js", "AWS"],
  },
  {
    title: "TapAnalyzer",
    description: "TapTapのチャートを分析するためのサイト",
    image: "/projects/tapAnalyzer.png",
    link: "https://github.com/kbkn3/predict-touch-accuracy-ext",
    articleTitle: "告知Twitter",
    articleUrl: "https://x.com/kbkn3/status/1734170723370008605",
    serviceTitle: "Tap Analyzer - Chrome Web Store",
    serviceUrl:
      "https://chromewebstore.google.com/detail/tap-analyzer/omacmfialjnoognohplbhhbgpeillekn?hl=ja",
    tags: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    title: "現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変 資料集",
    description:
      "このリポジトリは、小説家になろうの小説「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンサイト",
    image: "/projects/gensya-akuyaku-source.pages.dev_.png",
    link: "https://github.com/kbkn3/gensya-akuyaku-source",
    serviceTitle: "サイトを見る",
    serviceUrl: "https://gensya-akuyaku-source.pages.dev/",
    tags: ["TypeScript", "HonoX", "Tailwind CSS", "Cloudflare Pages"],
  },
]
