import type { Route } from "@/app/routes/+types/_index"
import type { ProjectCardProps } from "~/components/project-card"
import { useEffect, useRef, useState } from "react"
import {
  Header,
  HeroSection,
  ProjectsSection,
  TimelineSection,
  TechStackSection,
  Footer
} from "~/components/home"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

type TabType = "timeline" | "portfolio";

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("timeline")
  const heroRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Intersection Observerの設定
    const options = {
      root: null, // ビューポート全体を監視
      rootMargin: "-10px 0px 0px 0px", // ヒーローセクションが少し上にスクロールされたら変化
      threshold: 0, // 要素が1ピクセルでも見えなくなったら反応
    }

    const observer = new IntersectionObserver((entries) => {
      // ヒーローセクションが見えなくなったらヘッダーを表示
      setHeaderVisible(!entries[0].isIntersecting)
    }, options)

    // ヒーローセクションを監視対象に設定
    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const projects: ProjectCardProps[] = [
    {
      title: "モダンジャン研究会HP",
      description: "モダンジャン研究会のHP",
      serviceTitle: "サイトを見る",
      serviceUrl: "https://modern-jong.com",
      tags: ["WordPress", "PHP", "CSS"],
    },
    {
      title: "雀魂牌譜検討サポーター",
      description: "雀魂の牌譜検討で簡単にNAGAやmjai-reviewer(Mortal/Akochan)を利用するための非公式拡張機能",
      link: "https://github.com/kbkn3/MahjongSoul-review-supporter",
      articleTitle: "雀魂でもNAGA/Mortalでワンクリック牌譜検討！拡張機能リリースしました。",
      articleUrl: "https://modern-jan.com/2022/07/19/mjrs/",
      serviceTitle: "雀魂牌譜検討サポーター - Chrome ウェブストア",
      serviceUrl: "https://chromewebstore.google.com/detail/%E9%9B%80%E9%AD%82%E7%89%8C%E8%AD%9C%E6%A4%9C%E8%A8%8E%E3%82%B5%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC/kdmfnkdgpialmejpgflfllkjakolamcc?hl=ja",
      tags: ["TypeScript", "Vue.js", "Tailwind CSS"],
    },
    {
      title: "ML-POG（現在サービス終了）",
      description: "Mリーグのオリジナルチームを作って応援するためのサイト",
      articleTitle: "告知Twitter",
      articleUrl: "https://x.com/kbkn3/status/1734170723370008605",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "Auth.js", "AWS"],
    },
    {
      title: "TapAnalyzer",
      description: "TapTapのチャートを分析するためのサイト",
      link: "https://github.com/kbkn3/predict-touch-accuracy-ext",
      articleTitle: "告知Twitter",
      articleUrl: "https://x.com/kbkn3/status/1734170723370008605",
      serviceTitle: "Tap Analyzer - Chrome Web Store",
      serviceUrl: "https://chromewebstore.google.com/detail/tap-analyzer/omacmfialjnoognohplbhhbgpeillekn?hl=ja",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "AWS"],
    },
    {
      title: "現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変 資料集",
      description: "このリポジトリは、小説家になろうの小説「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンサイト",
      link: "https://github.com/kbkn3/gensya-akuyaku-source",
      serviceTitle: "サイトを見る",
      serviceUrl: "https://gensya-akuyaku-source.pages.dev/",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "AWS"],
    },
  ]

  // タブを切り替える関数
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  // アクティブなタブに応じたコンテンツを表示する関数
  const renderTabContent = () => {
    switch (activeTab) {
      case "timeline":
        return <TimelineSection />
      case "portfolio":
        return (
          <>
            <section id="experience" className="py-4 md:py-8 lg:py-12">
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Experience</h2>
              {/* ここにExperienceの内容を追加 */}
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">経験内容をここに追加</h3>
                  <p className="text-gray-400">詳細な説明をここに追加</p>
                </div>
              </div>
            </section>
            <ProjectsSection projects={projects} />
            <TechStackSection />
          </>
        )
      default:
        return <TimelineSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col px-6 py-16 font-sans">
      <Header visible={headerVisible} />
      <main className="container px-4 md:px-6">
        <HeroSection heroRef={heroRef} />
        
        {/* タブナビゲーション */}
        <div className="flex space-x-2 border-b border-gray-700 mt-8 mb-4">
          <button
            type="button"
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === "timeline"
                ? "bg-gray-800 text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("timeline")}
          >
            Timeline
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === "portfolio"
                ? "bg-gray-800 text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("portfolio")}
          >
            Portfolio
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="py-4">
          {renderTabContent()}
        </div>
      </main>
      <Footer />
    </div>
  )
}
