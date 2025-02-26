export default function SocialLink({
  href,
  icon,
}: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="p-2 rounded-lg bg-gray-800/50 text-gray-100 hover:text-gray-200 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}
