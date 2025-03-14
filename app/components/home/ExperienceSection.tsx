import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"

type ExperienceItem = {
  id: string
  period: string
  title: string
  description: string
  color: string
  organization: string
}

const experiences: ExperienceItem[] = [
  {
    id: "bachelor",
    period: "2016 - 2020",
    title: "学士課程 工学部物性系学科",
    description: "物性物理分野を専攻。卒業論文は「電荷密度から吸着サイトを推定するアルゴリズムの開発」",
    color: "bg-cyan-400",
    organization: "千葉大学",
  },
  {
    id: "trywarp",
    period: "2017 - 2022",
    title: "インターン PC講師・講座開発",
    description: "全国の大学生にPC講座を提供する会社で講師及びオンライン講座の新規開発事業に参加しました。",
    color: "bg-green-400",
    organization: "株式会社TRYWARP",
  },
  {
    id: "master",
    period: "2020 - 2022",
    title: "修士課程 情報科学",
    description: "V研究テーマは「強化学習による『接待型』ゲームAI」",
    color: "bg-purple-400",
    organization: "千葉大学大学院",
  },
  {
    id: "N-high",
    period: "2020 - 2022",
    title: "インターン プログラミングTA",
    description: "TA（ティーチングアシスタント）として生徒にPython, JavaScript, Unity, blender, Premiere Proなど様々なデジタルなものづくりの手助けを行いました。",
    color: "bg-red-400",
    organization: "N高等学校",
  },
  {
    id: "lifull",
    period: "2022 - now",
    title: "Webエンジニア",
    description: "不動産ポータルサイトLIFULL HOME'Sのサービスの開発を行っています。現在は社内ABテスト基盤PJを立ち上げ、社内導入中。",
    color: "bg-orange-400",
    organization: "株式会社LIFULL",
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
                      <div className="text-sm font-medium text-gray-400 mb-2">{exp.organization}</div>
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
                        <div className="text-sm font-medium text-gray-400 mb-2">{exp.organization}</div>
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
                        <div className="text-sm font-medium text-gray-400 mb-2">{exp.organization}</div>
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