import { useState } from "react"
import type { ReactNode } from "react"
import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import ArticleIcon from "~/components/icons/ArticleIcon"
import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon"
import GithubIcon from "~/components/icons/GithubIcon"
import LinkIcon from "~/components/icons/LinkIcon"
import VideoIcon from "~/components/icons/VideoIcon"
import WebsiteIcon from "~/components/icons/WebsiteIcon"

type ExperienceItem = {
  id: string
  period: string
  title: string
  description: string
  color: string
  organization: string
  details?: ReactNode
  links?: {
    url: string
    label: string
    type: "website" | "video" | "github" | "article" | "other"
  }[]
}

const experiences: ExperienceItem[] = [
  {
    id: "bachelor",
    period: "2016 - 2020",
    title: "学士課程 工学部ナノサイエンス学科",
    description:
      "物性物理分野を専攻。卒業論文は「電荷密度から吸着サイトを推定するアルゴリズムの開発」",
    color: "bg-cyan-400",
    organization: "千葉大学",
  },
  {
    id: "trywarp",
    period: "2017 - 2022",
    title: "インターン PC講師・講座開発",
    description:
      "全国の大学生にPC講座を提供する会社で講師及びオンライン講座の新規開発事業に参加しました。",
    color: "bg-green-400",
    organization: "株式会社TRYWARP",
    details: (
      <>
        <p>
          大学の新入生に基本的なPC操作から、Excel、PowerPoint、Wordまでを教える講座の講師を務めました。技術・スキルの多様さやカリキュラム改善への熱意を認められ、オンライン講座の新規開発事業にインターン生として参加しました。
        </p>
        <p className="mt-2">
          開発に際し「対面ではなく、動画のみで伝えなければならない」「受講者が満足感を得られる動画演出が必要」という課題に取り組み、様々なジャンルの講義動画を研究し、繰り返し収録と修正を行いました。
        </p>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-300 mb-1">
            主な担当業務
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
            <li>講師</li>
            <li>講座開発</li>
            <li>動画編集技術講習</li>
            <li>関連事業のSEO対策</li>
          </ul>
        </div>
      </>
    ),
    links: [
      {
        url: "https://kd.koredake.net/",
        label: "コレダケ！",
        type: "website",
      },
    ],
  },
  {
    id: "master",
    period: "2020 - 2022",
    title: "修士課程 融合理工学府情報科学コース",
    description: "研究テーマは「強化学習による『接待型』ゲームAI」",
    color: "bg-purple-400",
    organization: "千葉大学大学院",
  },
  {
    id: "N-high",
    period: "2020 - 2022",
    title: "プログラミングTA（インターン）",
    description:
      "TA（ティーチングアシスタント）として生徒に様々なデジタルなものづくりの手助けを行いました。",
    color: "bg-red-400",
    organization: "学校法人角川ドワンゴ学園 N高等学校",
    details: (
      <>
        <p>
          オンラインと対面の両方の授業形式でサポートを提供。生徒の個人プロジェクトの指導や、グループワークのファシリテーションを担当。特にゲーム開発とデータ分析の分野で多くの生徒の成長をサポートしました。
        </p>
        <p className="mt-2">
          職員と生徒の間に立ち、相談や情報共有の役割も担いました。
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-gray-700 rounded p-2">
            <h4 className="text-sm font-medium text-gray-300 mb-1">
              プログラミング
            </h4>
            <ul className="list-disc pl-4 text-xs text-gray-400">
              <li>Python</li>
              <li>JavaScript</li>
              <li>Unity (C#)</li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded p-2">
            <h4 className="text-sm font-medium text-gray-300 mb-1">デザイン</h4>
            <ul className="list-disc pl-4 text-xs text-gray-400">
              <li>Blender</li>
              <li>Premiere Pro</li>
              <li>Photoshop</li>
            </ul>
          </div>
        </div>
      </>
    ),
    links: [
      {
        url: "https://nnn.ed.jp/",
        label: "N高等学校",
        type: "website",
      },
    ],
  },
  {
    id: "lifull",
    period: "2022 - now",
    title: "Webエンジニア",
    description:
      "不動産ポータルサイトLIFULL HOME'Sのサービスの開発を行っています。現在は社内ABテスト基盤PJを立ち上げ、社内導入推進中。",
    color: "bg-orange-400",
    organization: "株式会社LIFULL",
    details: (
      <>
        <p>
          フロントエンド開発を中心に、バックエンドやインフラ構築まで幅広く担当。ABテスト基盤プロジェクトではリードエンジニアとして、要件定義から設計、実装、社内展開までを主導。React、TypeScript、AWS等の最新技術を活用したシステム開発に従事しています。
        </p>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-300 mb-1">使用技術</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              React
            </span>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              TypeScript
            </span>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              Next.js
            </span>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              AWS
            </span>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              Docker
            </span>
            <span className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs">
              Python
            </span>
          </div>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-300 mb-1">
            テックブログ記事
          </h4>
          <ul className="pl-5 space-y-1 text-sm text-gray-300 list-none">
            <li>
              <a
                href="https://www.lifull.blog/entry/2023/04/04/170000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                新卒エンジニアがリファクタを突貫したClean
                Architectureプロジェクトの舞台裏
              </a>
            </li>
            <li>
              <a
                href="https://www.lifull.blog/entry/2024/04/05/120000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                モバイルでのタップ成功率を可視化するツールの開発
              </a>
            </li>
            <li>
              <a
                href="https://www.lifull.blog/entry/2024/08/27/170000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                社内A/Bテスト標準化に向けたA/Bテスト管理基盤プロトタイプの開発
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-300 mb-1">
            発表資料
          </h4>
          <ul className="pl-5 space-y-1 text-sm text-gray-300 list-none">
            <li>
              <a
                href="https://www.docswell.com/s/kbkn3/ZVMW84-lifull-ai-review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                社内の知見を最大まで活かすためのAIコードレビューの足元整備
              </a>
            </li>
          </ul>
        </div>
      </>
    ),
    links: [
      {
        url: "https://www.homes.co.jp/",
        label: "LIFULL HOME'S",
        type: "website",
      },
      {
        url: "https://lifull.com/",
        label: "株式会社LIFULL",
        type: "website",
      },
    ],
  },
  {
    id: "personal",
    period: "2022 - now",
    title: "個人開発",
    description:
      "麻雀関連のアプリケーション開発や技術記事の執筆を行っています。",
    color: "bg-blue-400",
    organization: "個人活動",
    details: (
      <>
        <p>
          麻雀に関する個人開発プロジェクトを複数進行中。ネット麻雀アプリ向けのブラウザ拡張機能をリリースし、ユーザーから好評を得ています。また、麻雀AIの技術比較や分析に関する記事も執筆しています。
        </p>
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-300 mb-1">主な成果物</h4>
          <ul className="list-none pl-5 space-y-1 text-sm text-gray-300">
            <li>
              <a
                href="https://chromewebstore.google.com/detail/%E9%9B%80%E9%AD%82%E7%89%8C%E8%AD%9C%E6%A4%9C%E8%A8%8E%E3%82%B5%E3%83%9D%E3%83%BC%E3%82%BF%E3%83%BC/kdmfnkdgpialmejpgflfllkjakolamcc?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                ネット麻雀アプリ向けブラウザ拡張機能
              </a>
            </li>
            <li>
              <a
                href="https://qiita.com/Kenta_Kobayashi/items/3b5be9224065663279f6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                麻雀何切るクイズSlackボット（GAS）
              </a>
            </li>
            <li>
              <a
                href="https://qiita.com/Kenta_Kobayashi/items/3b5be9224065663279f6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                麻雀AI技術比較記事
              </a>
            </li>
          </ul>
        </div>
      </>
    ),
    links: [
      {
        url: "https://modern-jan.com/",
        label: "モダンジャン研究会",
        type: "website",
      },
      {
        url: "https://github.com/kbkn3",
        label: "GitHub",
        type: "github",
      },
    ],
  },
]

const ExperienceSection = () => {
  // 左側と右側のカードに分ける（PCビュー用）
  const leftExperiences = experiences.filter((_, index) => index % 2 === 0)
  const rightExperiences = experiences.filter((_, index) => index % 2 !== 0)

  // 選択されたカードとダイアログの表示状態を管理
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // ダイアログを開く関数
  const openDialog = (exp: ExperienceItem) => {
    setSelectedExp(exp)
    setIsDialogOpen(true)
  }

  // ダイアログを閉じる関数
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  // カードコンポーネント
  const ExperienceCard = ({ exp }: { exp: ExperienceItem }) => {
    return (
      <button
        className="w-full text-left rounded-lg shadow-md bg-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer"
        onClick={() => openDialog(exp)}
        aria-label={`${exp.title}の詳細を表示`}
        type="button"
      >
        <div className={`h-2 ${exp.color}`} />
        <div className="p-4">
          <div className="text-sm text-gray-400 mb-1">{exp.period}</div>
          <h3 className="text-lg font-medium text-white mb-2">{exp.title}</h3>
          <div className="text-sm font-medium text-gray-400 mb-2">
            {exp.organization}
          </div>
          <p className="text-sm text-gray-300">{exp.description}</p>

          {/* 詳細情報があることを示すインジケーター */}
          {(exp.details || (exp.links && exp.links.length > 0)) && (
            <div className="mt-2 text-xs text-blue-400 flex items-center">
              <span>クリックして詳細を表示 ↗</span>
            </div>
          )}
        </div>
      </button>
    )
  }

  // リンクアイコンを取得する関数
  const getLinkIcon = (type: string) => {
    switch (type) {
      case "website":
        return <WebsiteIcon className="mr-1" />
      case "video":
        return <VideoIcon className="mr-1" />
      case "github":
        return <GithubIcon className="mr-1" />
      case "article":
        return <ArticleIcon className="mr-1" />
      default:
        return <LinkIcon className="mr-1" />
    }
  }

  // 詳細ダイアログ
  const DetailDialog = () => {
    if (!selectedExp) return null

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDialogOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
      >
        {/* オーバーレイ */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={closeDialog}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeDialog()
            }
          }}
          role="presentation"
        />

        {/* ダイアログコンテンツ */}
        <div className="relative bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto z-10 transform transition-transform duration-300">
          <div className={`h-2 ${selectedExp.color}`} />

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedExp.title}
                </h2>
                <div className="text-sm text-gray-400 mt-1">
                  {selectedExp.period}
                </div>
                <div className="text-md font-medium text-gray-300 mt-1">
                  {selectedExp.organization}
                </div>
              </div>

              {/* 閉じるボタン */}
              <button
                onClick={closeDialog}
                className="text-gray-400 hover:text-white transition-colors"
                type="button"
                aria-label="閉じる"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-medium text-gray-300 mb-2">概要</h3>
              <p className="text-sm text-gray-300 mb-4">
                {selectedExp.description}
              </p>

              {selectedExp.details && (
                <>
                  <h3 className="text-md font-medium text-gray-300 mb-2">
                    詳細
                  </h3>
                  <div className="text-sm text-gray-300">
                    {selectedExp.details}
                  </div>
                </>
              )}

              {selectedExp.links && selectedExp.links.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h3 className="text-md font-medium text-gray-300 mb-2">
                    関連リンク
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.links.map((link, linkIndex) => (
                      <a
                        key={`${selectedExp.id}-link-${linkIndex}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-blue-300 hover:text-blue-200 transition-colors hover:underline"
                      >
                        {getLinkIcon(link.type)}
                        {link.label}
                        <ExternalLinkIcon size="sm" className="ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                  <ExperienceCard exp={exp} />
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
                    <ExperienceCard exp={exp} />
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
                    <ExperienceCard exp={exp} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 詳細ダイアログ */}
        <DetailDialog />
      </div>
    </section>
  )
}

export default ExperienceSection
