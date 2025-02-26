import { ExternalLink } from "lucide-react"
import { OnePin, ThreePin, TwoPin } from "~/components/MahjongTile"
import SectionLink from "~/components/ui/SectionLink"
import SocialLink from "~/components/ui/SocialLink"
import type { Route } from "@/app/routes/+types/_index"
import { Github, Twitter } from "~/components/icons"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1F2937] text-gray-200 flex flex-col px-6 py-16">
      {/* Hero Section */}
      <img 
        src="hero_icon.jpg" 
        alt="Profile" 
        className="w-20 h-20 rounded-full mb-8 transition-transform hover:scale-110 object-cover"
      />

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

      {/* Sections */}
      <div className="grid gap-6 w-full max-w-xl">
        <SectionLink
          icon={<OnePin className="w-10 h-10 rotate-[20deg]" />}
          title="Timeline"
          description="活動記録、ブログ、リリース情報など"
          bgColor="bg-sky-400/10"
          iconColor="text-sky-400"
          href="/timeline"
        />

        <SectionLink
          icon={<TwoPin className="w-10 h-10 rotate-[20deg]" />}
          title="Projects"
          description="開発したもの"
          bgColor="bg-purple-400/10"
          iconColor="text-purple-400"
          href="/projects"
        />

        <SectionLink
          icon={<ThreePin className="w-10 h-10 rotate-[20deg]" />}
          title="Lab"
          description="実験的開発"
          bgColor="bg-orange-400/10"
          iconColor="text-orange-400"
          href="/lab"
        />
      </div>

      {/* Social Links */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-400 mb-4">Links</h2>
        <div className="flex gap-4">
          <SocialLink href="https://github.com" icon={<Github className="w-6 h-6"/>} />
          <SocialLink href="https://twitter.com" icon={<Twitter className="w-6 h-6"/>} />
          <SocialLink href="https://dev.to" icon={<ExternalLink className="w-6 h-6"/>} />
        </div>
      </div>
    </div>
  )
}
