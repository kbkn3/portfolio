import type { ExperienceItem } from "~/lib/schemas"

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

export default ExperienceCard
