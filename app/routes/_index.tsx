import type { Route } from "@/app/routes/+types/_index"
import { redirect } from "react-router"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "kbkn3's portfolio" },
    { name: "description", content: "kbkn3's portfolio" },
  ]
}

/**
 * インデックスページからタイムラインページへリダイレクト
 */
export function loader() {
  return redirect("/timeline")
}

export default function Index() {
  return null
}
