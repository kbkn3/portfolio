import type { TimelineItem } from "~/lib/schemas"

const BLOCKED_HOSTNAMES = [
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
]

// URLからドメイン名を抽出する関数
export const extractDomain = (url: string): string => {
  try {
    const { hostname } = new URL(url)
    if (BLOCKED_HOSTNAMES.includes(hostname)) {
      return ""
    }
    return hostname
  } catch (_e) {
    return ""
  }
}

// アクションタイプを取得する関数
export const getActionType = (
  type: TimelineItem["type"],
): "post" | "released" | "others" => {
  switch (type) {
    case "zenn":
    case "qiita":
    case "blog":
    case "tech-blog":
      return "post"
    case "release":
      return "released"
    default:
      return "others"
  }
}

// プラットフォーム名を取得する関数
export const getPlatformName = (type: TimelineItem["type"]): string => {
  switch (type) {
    case "zenn":
      return "Zenn"
    case "qiita":
      return "Qiita"
    case "blog":
      return "Blog"
    case "tech-blog":
      return "Tech Blog"
    default:
      return ""
  }
}

// アクションラベルを取得する関数
export const getActionLabel = (type: TimelineItem["type"]): string => {
  switch (type) {
    case "oss":
      return "Contributed to"
    default:
      return "Created"
  }
}
