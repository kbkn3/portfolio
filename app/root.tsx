import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"

import type { Route } from "./+types/root"
import "./app.css"

/**
 * ルートローダー関数
 */
export function loader() {
  return { ok: true }
}

const googleFontsUrl =
  "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=optional"

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    as: "style",
    href: googleFontsUrl,
  },
  {
    rel: "stylesheet",
    href: googleFontsUrl,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="ja" />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="kbkn3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "小林建太",
              alternateName: ["Kenta Kobayashi", "kbkn3", "こばけん"],
              url: "https://kbkn3.com",
              sameAs: ["https://twitter.com/kbkn3", "https://github.com/kbkn3"],
            }),
          }}
        />
        {/* セキュリティ関連 */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; img-src 'self' https://ogp-image-creator.ken0421wabu.workers.dev https://github.com https://*.githubusercontent.com https://*.googleusercontent.com https://www.google.com https://*.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;"
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
  return <Outlet />
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
