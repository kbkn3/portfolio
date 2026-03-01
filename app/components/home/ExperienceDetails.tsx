import ExternalLinkIcon from "~/components/icons/ExternalLinkIcon"
import type { ExperienceDetail } from "~/lib/schemas"

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

export default ExperienceDetails
