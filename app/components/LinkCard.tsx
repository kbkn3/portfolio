export default function LinkCard({
  icon,
  title,
  description,
  bgColor,
  className,
  href,
}: {
  icon: React.ReactNode
  title: string
  description?: string
  bgColor: string
  className: string
  href: string
}) {
  return (
    <a
      href={href}
      className={`flex items-center p-3 rounded-xl ${bgColor} hover:bg-gray-700 transition-colors`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${className}`}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-normal text-xl text-white">{title}</h2>
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
    </a>
  )
}
