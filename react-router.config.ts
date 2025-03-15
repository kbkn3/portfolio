import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // ビルド時にプリレンダリングするURLのリストを返す
  // async prerender() {
  //   return ["/", "/timeline", "/portfolio"];
  // },
} satisfies Config;
