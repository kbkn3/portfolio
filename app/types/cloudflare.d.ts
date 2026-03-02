export {}

declare module "react-router" {
  interface AppLoadContext {
    cloudflare: {
      ctx: {
        waitUntil: (promise: Promise<unknown>) => void
        passThroughOnException: () => void
      }
      env: Record<string, unknown>
      cf: Record<string, unknown> | undefined
      caches: CacheStorage
    }
  }
}
