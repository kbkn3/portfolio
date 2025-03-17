import type { TimelineItem } from "~/lib/timeline-data"

// URLからドメイン名を抽出する関数
export const extractDomain = (url: string): string => {
  try {
    // x.comドメインの場合は空文字を返す
    if (url.includes("x.com") || url.includes("twitter.com")) {
      return ""
    }

    const urlObj = new URL(url)
    return urlObj.hostname
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
