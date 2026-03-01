import { useState } from "react"
import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon"
import GithubIcon from "~/components/icons/GithubIcon"
import LinkIcon from "~/components/icons/LinkIcon"
import VideoIcon from "~/components/icons/VideoIcon"
import WebsiteIcon from "~/components/icons/WebsiteIcon"
import { experiences } from "~/content/experiences"
import type { ExperienceDetail, ExperienceItem } from "~/lib/schemas"

// 詳細情報をレンダリングするコンポーネント
const ExperienceDetails = ({ details }: { details: ExperienceDetail }) => (
  <>
    {details.paragraphs.map((paragraph) => (
      <p key={paragraph.slice(0, 40)} className="mt-2 first:mt-0">
        {paragraph}
      </p>
    ))}
    {details.sections && details.sections.length > 0 && (
      <div
        className={
          details.sections.length >= 2 ? "grid grid-cols-2 gap-2 mt-3" : "mt-3"
        }
      >
        {details.sections.map((section) => (
          <div
            key={section.title}
            className={
              details.sections && details.sections.length >= 2
                ? "bg-gray-700 rounded p-2"
                : ""
            }
          >
            <h4 className="text-sm font-medium text-gray-300 mb-1">
              {section.title}
            </h4>
            <ul
              className={
                details.sections && details.sections.length >= 2
                  ? "list-disc pl-4 text-xs text-gray-400"
                  : "list-disc pl-5 space-y-1 text-sm text-gray-300"
              }
            >
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
    {details.techTags && details.techTags.length > 0 && (
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-300 mb-1">使用技術</h4>
        <div className="flex flex-wrap gap-1 mt-1">
          {details.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-900 bg-opacity-50 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )}
    {details.articles && details.articles.length > 0 && (
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-300 mb-1">
          {details.presentations ? "テックブログ記事" : "主な成果物"}
        </h4>
        <ul className="pl-5 space-y-1 text-sm text-gray-300 list-none">
          {details.articles.map((article) => (
            <li key={article.url}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
    {details.presentations && details.presentations.length > 0 && (
      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-300 mb-1">発表資料</h4>
        <ul className="pl-5 space-y-1 text-sm text-gray-300 list-none">
          {details.presentations.map((presentation) => (
            <li key={presentation.url}>
              <a
                href={presentation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline flex items-center"
              >
                <ExternalLinkIcon size="sm" className="mr-1 inline" />
                {presentation.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
)

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
      return <ExternalLinkIcon className="mr-1" />
    default:
      return <LinkIcon className="mr-1" />
  }
}

// カードコンポーネント
const ExperienceCard = ({
  exp,
  onClick,
}: {
  exp: ExperienceItem
  onClick: () => void
}) => (
  <button
    className="w-full text-left rounded-lg shadow-md bg-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20 cursor-pointer"
    onClick={onClick}
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
      {(exp.details || (exp.links && exp.links.length > 0)) && (
        <div className="mt-2 text-xs text-blue-400 flex items-center">
          <span>クリックして詳細を表示 ↗</span>
        </div>
      )}
    </div>
  </button>
)

// 詳細ダイアログ
const DetailDialog = ({
  exp,
  isOpen,
  onClose,
}: {
  exp: ExperienceItem | null
  isOpen: boolean
  onClose: () => void
}) => {
  if (!exp) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose()
        }}
        role="presentation"
      />
      <div className="relative bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto z-10 transform transition-transform duration-300">
        <div className={`h-2 ${exp.color}`} />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">{exp.title}</h2>
              <div className="text-sm text-gray-400 mt-1">{exp.period}</div>
              <div className="text-md font-medium text-gray-300 mt-1">
                {exp.organization}
              </div>
            </div>
            <button
              onClick={onClose}
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
            <p className="text-sm text-gray-300 mb-4">{exp.description}</p>
            {exp.details && (
              <>
                <h3 className="text-md font-medium text-gray-300 mb-2">詳細</h3>
                <div className="text-sm text-gray-300">
                  <ExperienceDetails details={exp.details} />
                </div>
              </>
            )}
            {exp.links && exp.links.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-md font-medium text-gray-300 mb-2">
                  関連リンク
                </h3>
                <div className="flex flex-wrap gap-2">
                  {exp.links.map((link, linkIndex) => (
                    <a
                      key={`${exp.id}-link-${linkIndex}`}
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

const ExperienceSection = () => {
  const leftExperiences = experiences.filter((_, index) => index % 2 === 0)
  const rightExperiences = experiences.filter((_, index) => index % 2 !== 0)

  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (exp: ExperienceItem) => {
    setSelectedExp(exp)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <section id="experience" className="py-4 md:py-8 lg:py-12">
      <div className="container">
        <SectionHeading
          title="Experience"
          icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
          className="text-blue-400"
        />

        {/* モバイルビュー */}
        <div className="relative mt-8 md:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute left-4 top-6 w-6 h-0.5 bg-blue-200 bg-opacity-20" />
                <div className="ml-10">
                  <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PCビュー */}
        <div className="relative mt-8 hidden md:block">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          <div className="grid grid-cols-2">
            <div className="space-y-24">
              {leftExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 right-0 w-12" />
                  <div className="pr-12">
                    <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-24 pt-24">
              {rightExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 left-0 w-12" />
                  <div className="pl-12">
                    <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DetailDialog
          exp={selectedExp}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        />
      </div>
    </section>
  )
}

export default ExperienceSection
