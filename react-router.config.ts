import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // SSG: ビルド時にページをプリレンダリング
  async prerender() {
    return [
      "/",           // タイムラインページ
      "/portfolio",  // ポートフォリオページ
      "/sono-habit/privacy", // プライバシーポリシー
    ];
  },
} satisfies Config;
