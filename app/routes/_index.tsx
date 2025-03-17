import type { Route } from "@/app/routes/+types/_index"
import { redirect } from "react-router"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio" },
    // OG情報
    { property: "og:title", content: "kbkn3's portfolio" },
    { property: "og:description", content: "kbkn3's portfolio" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kbkn3.com/" },
    { property: "og:image", content: "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=PORTFOLIO" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "kbkn3's portfolio" },
    { name: "twitter:description", content: "kbkn3's portfolio" },
    { name: "twitter:image", content: "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=PORTFOLIO" },
  ]
}

/**
 * インデックスページからタイムラインページへリダイレクト
 */
export function loader() {
  return redirect("/timeline")
}

export default function Index() {
  return null
}
