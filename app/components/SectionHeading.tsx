export default function SectionHeading({
  icon,
  title,
  description,
  className,
}: {
  icon?: React.ReactNode
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className="flex items-center mb-4">
      {icon && (
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${className}`}
        >
          {icon}
        </div>
      )}
      <div>
        <h2 className="font-bold text-xl text-gray-200">{title}</h2>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </div>
  )
}
