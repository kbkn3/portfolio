import type { FC } from "react"

type WebsiteIconProps = {
  className?: string
  size?: "sm" | "md" | "lg"
}

const WebsiteIcon: FC<WebsiteIconProps> = ({ className = "", size = "md" }) => {
  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <title>ウェブサイト</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  )
}

export default WebsiteIcon
