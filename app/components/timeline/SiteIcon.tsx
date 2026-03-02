import { extractDomain } from "~/lib/timeline-utils"

interface SiteIconProps {
  url: string
  size?: number
}

// サイトアイコンを取得するコンポーネント
const SiteIcon = ({ url, size = 16 }: SiteIconProps) => {
  const domain = extractDomain(url)
  if (!domain) return null

  // Google Favicon APIを使用
  const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`

  return (
    <img
      src={iconUrl}
      alt={`${domain} icon`}
      width={size}
      height={size}
      className="inline-block rounded-sm"
      loading="lazy"
    />
  )
}

export default SiteIcon
