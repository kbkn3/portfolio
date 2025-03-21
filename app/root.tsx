import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"
import { useEffect, useRef, useState } from "react"
import Footer from "./components/home/Footer"
import Header from "./components/home/Header"
import HeroSection from "./components/home/HeroSection"

/**
 * ルートローダー関数
 */
export function loader() {
  return { ok: true }
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="ja" />
        {/* セキュリティ関連 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' https://ogp-image-creator.ken0421wabu.workers.dev https://github.com https://*.githubusercontent.com https://*.googleusercontent.com https://www.google.com https://*.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
