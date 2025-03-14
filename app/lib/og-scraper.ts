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

/**
 * URLからOpen Graph情報を取得する
 * @param url 取得対象のURL
 * @returns Open Graph情報
 */
export async function fetchOgData(url: string): Promise<OgData> {
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