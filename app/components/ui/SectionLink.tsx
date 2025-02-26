export default function SectionLink({
  icon,
  title,
  description,
  bgColor,
  iconColor,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
  iconColor: string
  href: string
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-4 p-4 rounded-lg ${bgColor} hover:bg-opacity-50 transition-colors`}
    >
      <div className={`p-2 rounded-md ${iconColor}`}>{icon}</div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </a>
  )
}
