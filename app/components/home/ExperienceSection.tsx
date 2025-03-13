import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"

type ExperienceItem = {
  id: string
  period: string
  title: string
  description: string
  color: string
}

const experiences: ExperienceItem[] = [
  {
    id: "web-designer",
    period: "2010 - 2014",
    title: "Web/グラフィックデザイナー",
    description: "学生時代にフリーランス的にWebデザインやグラフィックデザインの仕事を請けていました。",
    color: "bg-blue-400",
  },
  {
    id: "maker",
    period: "2015 - 2017",
    title: "某大手メーカー",
    description: "海外向けのプロダクトのマーケティングをしていました。",
    color: "bg-cyan-400",
  },
  {
    id: "saruwaka",
    period: "2017 -",
    title: "サルワカの運営",
    description: "個人でWebメディア「サルワカ」を立ち上げ、知人に記事執筆を手伝ってもらいながらコツコツと運営。2018年は3000万PVを突破",
    color: "bg-orange-400",
  },
  {
    id: "startup",
    period: "2018",
    title: "デザイナー&エンジニア@スタートアップ",
    description: "アプリのUI/UXデザインからRailsやVue.js、Nuxt.jsなどを使ったフロントエンドの開発まで幅広く担当しました。",
    color: "bg-red-400",
  },
  {
    id: "resume",
    period: "2018 -",
    title: "Resumeの開発",
    description: "Vue.js/Rails/Heroku/Fastlyという技術スタックで本サービスを開発しました。",
    color: "bg-purple-400",
  },
]

const ExperienceSection = () => {
  // 左側と右側のカードに分ける（PCビュー用）
  const leftExperiences = experiences.filter((_, index) => index % 2 === 0)
  const rightExperiences = experiences.filter((_, index) => index % 2 !== 0)

  return (
    <section id="experience" className="py-4 md:py-8 lg:py-12">
      <div className="container">
        <SectionHeading
          title="Experience"
          icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
          className="text-blue-400"
        />
        
        {/* モバイルビュー用のタイムライン（md未満の画面サイズで表示） */}
        <div className="relative mt-8 md:hidden">
          {/* タイムラインの縦線 */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                {/* 横線 */}
                <div className="absolute left-4 top-6 w-6 h-0.5 bg-blue-200 bg-opacity-20" />
                
                {/* コンテンツ */}
                <div className="ml-10">
                  <div className="rounded-lg shadow-md bg-gray-800 overflow-hidden">
                    <div className={`h-2 ${exp.color}`} />
                    <div className="p-4">
                      <div className="text-sm text-gray-400 mb-1">{exp.period}</div>
                      <h3 className="text-lg font-medium text-white mb-2">{exp.title}</h3>
                      <p className="text-sm text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* PCビュー用のタイムライン（md以上の画面サイズで表示） */}
        <div className="relative mt-8 hidden md:block">
          {/* タイムラインの縦線 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          
          {/* グリッドレイアウト */}
          <div className="grid grid-cols-2">
            {/* 左側のカード */}
            <div className="space-y-24">
              {leftExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* 横線 - 右に伸びる */}
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 right-0 w-12" />
                  
                  {/* コンテンツ */}
                  <div className="pr-12">
                    <div className="rounded-lg shadow-md bg-gray-800 overflow-hidden">
                      <div className={`h-2 ${exp.color}`} />
                      <div className="p-4">
                        <div className="text-sm text-gray-400 mb-1">{exp.period}</div>
                        <h3 className="text-lg font-medium text-white mb-2">{exp.title}</h3>
                        <p className="text-sm text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 右側のカード */}
            <div className="space-y-24 pt-24">
              {rightExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* 横線 - 左に伸びる */}
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 left-0 w-12" />
                  
                  {/* コンテンツ */}
                  <div className="pl-12">
                    <div className="rounded-lg shadow-md bg-gray-800 overflow-hidden">
                      <div className={`h-2 ${exp.color}`} />
                      <div className="p-4">
                        <div className="text-sm text-gray-400 mb-1">{exp.period}</div>
                        <h3 className="text-lg font-medium text-white mb-2">{exp.title}</h3>
                        <p className="text-sm text-gray-300">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection 