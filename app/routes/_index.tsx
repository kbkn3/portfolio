import type { Route } from "@/app/routes/+types/_index"
import { useEffect, useRef, useState } from "react"
import {
  Footer,
  Header,
  HeroSection,
  ProjectsSection,
  TechStackSection,
  TimelineSection,
  ExperienceSection,
} from "~/components/home"
import type { ProjectCardProps } from "~/components/project-card"
import { useLoaderData, useSearchParams, useViewTransitionState } from "react-router"
import { fetchOgData } from "~/lib/og-scraper"
import { TIMELINE_ITEMS } from "~/lib/timeline-data"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

/**
 * トップページのデータを取得するloader
 */
export async function loader() {
  try {
    // サンプルデータを使用（実際の実装では外部APIやDBから取得する）
    const timelineItems = [...TIMELINE_ITEMS];
    
    // OG情報を取得して結合
    const itemsWithOgData = await Promise.all(
      timelineItems.map(async (item) => {
        const ogData = await fetchOgData(item.url);
        
        // OG情報が取得できた場合は結合
        if (ogData.success) {
          return {
            ...item,
            title: item.title || ogData.ogTitle || '',
            description: item.description || ogData.ogDescription || '',
            imageUrl: item.imageUrl || (ogData.ogImage ? (Array.isArray(ogData.ogImage) ? ogData.ogImage[0]?.url : ogData.ogImage.url) : undefined),
            siteName: ogData.ogSiteName
          };
        }
        
        return item;
      })
    );
    
    // 日付の新しい順にソート
    const sortedItems = itemsWithOgData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return { 
      timelineItems: sortedItems,
      totalCount: sortedItems.length
    };
  } catch (error) {
    console.error('Failed to load timeline data:', error);
    return {
      error: 'タイムラインデータの取得に失敗しました',
      timelineItems: [],
      totalCount: 0
    };
  }
}

type TabType = "timeline" | "portfolio"

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (searchParams.get("tab") as TabType) || "timeline"
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { timelineItems, error } = useLoaderData<typeof loader>()
  
  // タイムラインタブへの遷移状態を取得
  const isTimelineTransitioning = useViewTransitionState("?tab=timeline")
  // ポートフォリオタブへの遷移状態を取得
  const isPortfolioTransitioning = useViewTransitionState("?tab=portfolio")

  useEffect(() => {
    // URLパラメータが存在しない場合、デフォルトタブを設定
    if (!searchParams.has("tab")) {
      setSearchParams({ tab: "timeline" }, { replace: true })
    } else {
      // 無効なタブパラメータの場合、デフォルトに修正
      const tab = searchParams.get("tab")
      if (tab !== "timeline" && tab !== "portfolio") {
        setSearchParams({ tab: "timeline" }, { replace: true })
      }
    }
  }, [searchParams, setSearchParams])

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
      image: "/projects/modern-jan.com_.png",
      serviceTitle: "サイトを見る",
      serviceUrl: "https://modern-jong.com",
      tags: ["WordPress", "PHP", "CSS"],
    },
    {
      title: "雀魂牌譜検討サポーター",
      description:
        "雀魂の牌譜検討で簡単にNAGAやmjai-reviewer(Mortal/Akochan)を利用するための非公式拡張機能",
      image: "https://github.com/kbkn3/MahjongSoul-review-supporter/blob/develop/imgs/Animation.gif?raw=true",
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
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "AWS"],
    },
    {
      title: "現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変 資料集",
      description:
        "このリポジトリは、小説家になろうの小説「現代社会で乙女ゲームの悪役令嬢をするのはちょっと大変」のファンサイト",
      image: "/projects/gensya-akuyaku-source.pages.dev_.png",
      link: "https://github.com/kbkn3/gensya-akuyaku-source",
      serviceTitle: "サイトを見る",
      serviceUrl: "https://gensya-akuyaku-source.pages.dev/",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "AWS"],
    },
  ]

  // タブを切り替える関数
  const handleTabChange = (tab: TabType) => {
    // View Transitionを使用してタブを切り替える
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setSearchParams({ tab })
      })
    } else {
      // フォールバック（View Transition APIがサポートされていない場合）
      setSearchParams({ tab })
    }
  }

  // アクティブなタブに応じたコンテンツを表示する関数
  const renderTabContent = () => {
    switch (activeTab) {
      case "timeline":
        return (
          <div 
            style={{ 
              viewTransitionName: isTimelineTransitioning ? "timeline-content" : "none" 
            }}
          >
            <TimelineSection timelineItems={timelineItems} error={error} />
          </div>
        )
      case "portfolio":
        return (
          <div 
            style={{ 
              viewTransitionName: isPortfolioTransitioning ? "portfolio-content" : "none" 
            }}
          >
            <ExperienceSection />
            <ProjectsSection projects={projects} />
            <TechStackSection />
          </div>
        )
      default:
        return <TimelineSection timelineItems={timelineItems} error={error} />
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
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 ${
              activeTab === "timeline"
                ? "bg-gray-800 text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("timeline")}
            style={{
              viewTransitionName: isTimelineTransitioning ? "timeline-tab" : "none"
            }}
          >
            Timeline
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors duration-300 ${
              activeTab === "portfolio"
                ? "bg-gray-800 text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => handleTabChange("portfolio")}
            style={{
              viewTransitionName: isPortfolioTransitioning ? "portfolio-tab" : "none"
            }}
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
