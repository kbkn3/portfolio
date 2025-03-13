import type { Route } from "@/app/routes/+types/_index"
import { useEffect, useRef, useState } from "react"
import { OnePin, ThreePin, TwoPin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import { Github, Qiita, QiitaWhite, Twitter, Zenn } from "~/components/icons"
import ProjectCard, { type ProjectCardProps } from "~/components/project-card"
import TechStack from "~/components/tech-stack"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

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

  const socialCards = [
    {
      icon: <Twitter className="w-6 h-6 text-white" />,
      title: "Twitter",
      href: "https://twitter.com/kbkn3",
      className: "text-blue-400",
    },
    {
      icon: <Zenn className="w-6 h-6 text-blue-400" />,
      title: "Zenn",
      href: "https://zenn.dev/kbkn3",
      className: "text-blue-400",
    },
    {
      icon: <Qiita className="w-6 h-6 text-blue-400" />,
      title: "Qiita",
      href: "https://qiita.com/Kenta_Kobayashi",
      className: "text-blue-400",
    },
    {
      icon: <Github className="w-6 h-6 text-white" />,
      title: "GitHub",
      href: "https://github.com/kbkn3",
      className: "text-white",
    },
    {
      icon: <Github className="w-6 h-6 text-white" />,
      title: "モダンジャン研究会HP",
      href: "https://modern-jong.com",
      className: "text-gray-400",
    },
  ]

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col px-6 py-16 font-sans">
      {/* スクロールヘッダー */}
      <header
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
          headerVisible
            ? "opacity-100 h-16 translate-y-0"
            : "opacity-0 h-0 -translate-y-full"
        }`}
      >
        <div className="bg-gray-900 bg-opacity-95 shadow-md h-full px-6 flex items-center">
          <img
            src="hero_icon.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <p className="text-white font-medium">kbkn3</p>
        </div>
      </header>
      <main className="container px-4 md:px-6">
        {/* Hero Section */}
        <div>
          <div ref={heroRef}>
            <img
              src="hero_icon.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full mb-8 transition-transform hover:scale-110 object-cover"
            />
          </div>

          <div className="max-w-xl mb-12">
            <h1>
              麻雀が誰にとっても快適で楽しく遊べる世界を作ることを目指すエンジニア
            </h1>
          </div>
          <div className="flex space-x-4 mb-8">
            <a href="https://twitter.com/kbkn3" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <title>Twitter</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="https://qiita.com/kbkn3" target="_blank" rel="noreferrer" aria-label="Qiita" className="group">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  <QiitaWhite className="w-6 h-6" />
                </div>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <Qiita className="w-6 h-6" />
                </div>
              </div>
            </a>
            <a href="https://zenn.dev/kbkn3" target="_blank" rel="noreferrer" aria-label="Zenn">
              <svg className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <title>Zenn</title>
                <path d="M.264 23.771h4.984c.264 0 .498-.147.645-.352L19.614.874c.176-.293-.029-.645-.381-.645h-4.72c-.235 0-.44.117-.557.323L.03 23.361c-.117.206.029.41.234.41zM17.445 23.419l6.479-10.408c.205-.323-.029-.733-.41-.733h-4.691c-.176 0-.352.088-.44.235l-6.655 10.643c-.176.264.029.616.352.616h4.779c.234-.001.468-.118.586-.353z" />
              </svg>
            </a>
            <a href="https://github.com/kbkn3" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sections */}
        <section id="timeline" className="py-4 md:py-8 lg:py-12">
          <div className="container">
            <SectionHeading
              title="Timeline"
              icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
              className="text-blue-400"
            />
          </div>
        </section>
        <section id="projects" className="py-4 md:py-8 lg:py-12">
          <div>
            <SectionHeading
              title="Projects"
              icon={<TwoPin className="w-8 h-8 rotate-[20deg]" />}
              className="text-indigo-400"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  tags={project.tags}
                  articleTitle={project.articleTitle}
                  articleUrl={project.articleUrl}
                  serviceTitle={project.serviceTitle}
                  serviceUrl={project.serviceUrl}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="techstack" className="py-4 md:py-8 lg:py-12">
          <div>
            <SectionHeading
              title="TechStack"
              icon={<ThreePin className="w-8 h-8 rotate-[20deg]" />}
              className="text-orange-400"
            />
          </div>
          <TechStack />
        </section>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>© 2025 kbkn3</p>
        <a href="/terms" className="hover:text-gray-300">
          Terms and Privacy
        </a>
      </footer>
    </div>
  )
}
