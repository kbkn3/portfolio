import { useEffect, useRef, useState } from "react"
import { NavLink, Outlet } from "react-router"
import Footer from "~/components/home/Footer"
import Header from "~/components/home/Header"
import HeroSection from "~/components/home/HeroSection"

export default function MainLayout() {
  const [headerVisible, setHeaderVisible] = useState(false)
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col px-6 py-16 font-sans">
      <Header visible={headerVisible} />
      <main className="container px-4 md:px-6">
        <HeroSection heroRef={heroRef} />

        {/* タブナビゲーション */}
        <div className="flex space-x-2 border-b border-gray-700 mt-8 mb-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 font-medium rounded-t-lg ${
                isActive
                  ? "bg-gray-800 text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`
            }
            viewTransition
            prefetch="intent"
          >
            Timeline
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `px-4 py-2 font-medium rounded-t-lg ${
                isActive
                  ? "bg-gray-800 text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-gray-200"
              }`
            }
            viewTransition
            prefetch="intent"
          >
            Portfolio
          </NavLink>
        </div>

        {/* タブコンテンツ */}
        <div className="py-4 relative min-h-[300px]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
