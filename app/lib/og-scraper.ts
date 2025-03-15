import ogs from 'open-graph-scraper';

// open-graph-scraperの実際の戻り値型に合わせる
export type OgData = {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {
    url: string;
    width?: string | number;
    height?: string | number;
    type?: string;
  } | {
    url: string;
    width?: string | number;
    height?: string | number;
    type?: string;
  }[];
  ogUrl?: string;
  ogSiteName?: string;
  requestUrl: string;
  success: boolean;
  error?: string;
  // biome-ignore lint/suspicious/noExplicitAny: open-graph-scraperの戻り値は多様なプロパティを含む
  [key: string]: any;
};

// Cloudflare Workers環境かどうかを判定する関数
function isCloudflareWorkersEnvironment(): boolean {
  // biome-ignore lint/suspicious/noExplicitAny: グローバルオブジェクトのプロパティチェック
  return typeof (globalThis as any).Deno !== 'undefined' || 
         // biome-ignore lint/suspicious/noExplicitAny: グローバルオブジェクトのプロパティチェック
         typeof (globalThis as any).WebSocketPair !== 'undefined' ||
         typeof globalThis.caches !== 'undefined' && typeof globalThis.fetch === 'function';
}

/**
 * URLからOpen Graph情報を取得する
 * @param url 取得対象のURL
 * @returns Open Graph情報
 */
export async function fetchOgData(url: string): Promise<OgData> {
  // x.comドメインの場合は取得をスキップ
  if (url.includes('x.com') || url.includes('twitter.com')) {
    return {
      requestUrl: url,
      success: false,
      error: 'x.com domains are skipped'
    };
  }

  // Cloudflare Workers環境では簡易的な情報を返す
  if (isCloudflareWorkersEnvironment()) {
    return {
      requestUrl: url,
      success: false,
      error: 'OG scraping is disabled in Cloudflare Workers environment'
    };
  }

  try {
    const options = { url };
    const { result } = await ogs(options);
    
    return {
      ...result,
      requestUrl: url,
      success: true
    } as OgData;
  } catch (error) {
    console.error(`Failed to fetch OG data for ${url}:`, error);
    return {
      requestUrl: url,
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
} 