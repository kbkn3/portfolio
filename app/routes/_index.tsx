import { OnePin, ThreePin, TwoPin } from "~/components/MahjongTile"
import LinkCard from "~/components/LinkCard"
import type { Route } from "@/app/routes/+types/_index"
import { Github, Qiita, Twitter, Zenn } from "~/components/icons"
import { useState, useEffect, useRef } from "react"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observerの設定
    const options = {
      root: null, // ビューポート全体を監視
      rootMargin: '-10px 0px 0px 0px', // ヒーローセクションが少し上にスクロールされたら変化
      threshold: 0 // 要素が1ピクセルでも見えなくなったら反応
    };

    const observer = new IntersectionObserver((entries) => {
      // ヒーローセクションが見えなくなったらヘッダーを表示
      setHeaderVisible(!entries[0].isIntersecting);
    }, options);

    // ヒーローセクションを監視対象に設定
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const mainCards = [
    { 
      icon: <OnePin className="w-10 h-10 rotate-[20deg]" />, 
      title: "Timeline", 
      description: "活動記録、ブログ、リリース情報など", 
      className: "text-blue-400" 
    },
    { 
      icon: <TwoPin className="w-10 h-10 rotate-[20deg]" />, 
      title: "Projects", 
      description: "開発したもの", 
      className: "text-indigo-400" 
    },
    { 
      icon: <ThreePin className="w-10 h-10 rotate-[20deg]" />, 
      title: "Lab", 
      description: "実験的な開発", 
      className: "text-orange-400" 
    }
  ];

  const socialCards = [
    { 
      icon: <Twitter className="w-6 h-6 text-white" />, 
      title: "Twitter" ,
      href: "https://twitter.com/kbkn3",
      className: "text-blue-400"
    },
    { 
      icon: <Zenn className="w-6 h-6 text-blue-400" />, 
      title: "Zenn" ,
      href: "https://zenn.dev/kbkn3",
      className: "text-blue-400"
    },
    { 
      icon: <Qiita className="w-6 h-6 text-blue-400" />, 
      title: "Qiita" ,
      href: "https://qiita.com/Kenta_Kobayashi",
      className: "text-blue-400"
    },
    { 
      icon: <Github className="w-6 h-6 text-white" />, 
      title: "GitHub" ,
      href: "https://github.com/kbkn3",
      className: "text-white"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col px-6 py-16 font-sans">
      {/* スクロールヘッダー */}
      <header className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        headerVisible ? 'opacity-100 h-16 translate-y-0' : 'opacity-0 h-0 -translate-y-full'
      }`}>
        <div className="bg-gray-900 bg-opacity-95 shadow-md h-full px-6 flex items-center">
          <img 
            src="hero_icon.jpg" 
            alt="Profile" 
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <p className="text-white font-medium">kbkn3</p>
        </div>
      </header>

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
          <a
            href="/about"
            className="text-gray-400 hover:text-gray-200 transition-colors text-lg mt-2 block"
          >
            Read more →
          </a>
        </div>
      </div>

      {/* Sections */}
      <div className="grid gap-6 w-full max-w-xl mb-16 font-sans">
        {mainCards.map((card) => (
          <LinkCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            bgColor="bg-gray-800"
            className={card.className}
            href={`/${card.title.toLowerCase()}`}
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="grid gap-6 w-full max-w-xl">
        <h2 className="text-xl font-bold text-gray-400 mb-2">Links</h2>
        <div className="space-y-4">
          {socialCards.map((card) => (
            <LinkCard 
              key={card.title}
              href={card.href}
              icon={card.icon}
              title={card.title}
              bgColor="bg-gray-800"
              className={card.className}
            />
          ))}
        </div>
      </div>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>© 2025 kbkn3</p>
        <a href="/terms" className="hover:text-gray-300">Terms and Privacy</a>
      </footer>
    </div>
  )
}
