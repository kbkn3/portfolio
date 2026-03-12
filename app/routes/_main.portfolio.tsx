import type { Route } from "@/app/routes/+types/_main.portfolio"
import {
  ExperienceSection,
  ProjectsSection,
  TechStackSection,
} from "~/components/home"
import { projects } from "~/content/projects"

export function meta() {
  return [
    // ページ固有の情報
    { title: "Portfolio | kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio and projects" },
    { rel: "canonical", href: "https://kbkn3.com/portfolio" },

    // OG情報
    { property: "og:title", content: "Portfolio | kbkn3's portfolio" },
    { property: "og:description", content: "kbkn3's portfolio and projects" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kbkn3.com/portfolio" },
    { property: "og:locale", content: "ja_JP" },
    {
      property: "og:image",
      content:
        "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=PORTFOLIO",
    },
    { property: "og:image:alt", content: "kbkn3's portfolio thumbnail" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:domain", content: "kbkn3.com" },
    { name: "twitter:site", content: "@kbkn3" },
    { name: "twitter:creator", content: "@kbkn3" },
    { name: "twitter:title", content: "Portfolio | kbkn3's portfolio" },
    { name: "twitter:description", content: "kbkn3's portfolio and projects" },
    {
      name: "twitter:image",
      content:
        "https://ogp-image-creator.ken0421wabu.workers.dev/portfolio?title=PORTFOLIO",
    },
    { name: "twitter:image:alt", content: "kbkn3's portfolio thumbnail" },
  ]
}

/**
 * ポートフォリオページのデータを取得するloader
 */
export function loader() {
  return { projects }
}

export default function PortfolioPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData

  return (
    <div className="w-full">
      <ExperienceSection />
      <ProjectsSection projects={projects} />
      <TechStackSection />
    </div>
  )
}
