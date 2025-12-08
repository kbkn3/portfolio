import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // 注: Cloudflare Workers環境ではprerenderは互換性の問題があるため無効化
  // 代わりにCloudflare Cache APIを使用したISR的キャッシュ戦略を採用
} satisfies Config;
