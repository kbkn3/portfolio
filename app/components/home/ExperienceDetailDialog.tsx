import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon"
import GithubIcon from "~/components/icons/GithubIcon"
import LinkIcon from "~/components/icons/LinkIcon"
import VideoIcon from "~/components/icons/VideoIcon"
import WebsiteIcon from "~/components/icons/WebsiteIcon"
import type { ExperienceItem } from "~/lib/schemas"
import ExperienceDetails from "./ExperienceDetails"

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

const ExperienceDetailDialog = ({
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

export default ExperienceDetailDialog
