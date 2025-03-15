import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import type { TimelineItem } from "~/lib/timeline-data"

// URLからドメイン名を抽出する関数
const extractDomain = (url: string): string => {
  try {
    // x.comドメインの場合は空文字を返す
    if (url.includes('x.com') || url.includes('twitter.com')) {
      return '';
    }
    
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (_e) {
    return '';
  }
};

// サイトアイコンを取得するコンポーネント
const SiteIcon = ({ url, size = 16 }: { url: string; size?: number }) => {
  // x.comやtwitter.comの場合は何も表示しない
  if (url.includes('x.com') || url.includes('twitter.com')) {
    return null;
  }
  
  const domain = extractDomain(url);
  if (!domain) return null;
  
  // Google Favicon APIを使用
  const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  
  return (
    <img 
      src={iconUrl} 
      alt={`${domain} icon`} 
      width={size} 
      height={size} 
      className="inline-block rounded-sm"
      loading="lazy"
    />
  );
};

// Twitter風のツイートコンポーネント
const TweetCard = ({ 
  name, 
  username, 
  text, 
  imageUrl, 
  date
}: { 
  name: string; 
  username: string; 
  text: string; 
  imageUrl?: string;
  date: string;
}) => {
  const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // URLを検出してリンクカラーで表示する関数
  const parseTextWithUrls = (text: string) => {
    // URLを検出する正規表現
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    if (!text) return null;
    
    // URLを含まないテキストはそのまま返す
    if (!urlRegex.test(text)) return text;
    
    // 正規表現をリセット
    urlRegex.lastIndex = 0;
    
    // テキストをURLで分割し、URLを青色で表示
    const parts = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    
    // biome-ignore lint/suspicious/noAssignInExpressions: 正規表現の一般的な使用方法
    while ((match = urlRegex.exec(text)) !== null) {
      // URLの前のテキスト
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      // URL部分
      parts.push(
        <span key={`url-${match.index}`} className="text-blue-400 break-all">
          {match[0]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // 残りのテキスト
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }
    
    return parts;
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors p-4 max-w-2xl">
      <div className="flex items-start">
        {/* アバターアイコン */}
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-300 text-lg font-bold overflow-hidden">
            <img 
              src="/hero_icon.jpg" 
              alt="アバターアイコン" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="flex-grow">
          {/* ヘッダー */}
          <div className="flex items-center">
            <span className="font-bold text-white mr-2">{name}</span>
            <span className="text-gray-400 text-sm">@{username}</span>
            <span className="text-gray-500 text-xs ml-auto">{formattedDate}</span>
          </div>
          
          {/* ツイート本文 */}
          <div className="mt-2 text-white whitespace-pre-wrap">
            {parseTextWithUrls(text)}
          </div>
          
          {/* 画像 */}
          {imageUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
              <img 
                src={imageUrl} 
                alt="ツイート画像" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
          
          {/* アクションボタン */}
          <div className="mt-3 flex items-center justify-between text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <title>返信</title>
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
              </svg>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <title>リツイート</title>
                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" />
              </svg>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <title>いいね</title>
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z" />
              </svg>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <title>共有</title>
                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z" />
                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// アクションタイプを取得する関数
const getActionType = (type: TimelineItem["type"]): "post" | "released" | "others" => {
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

// アクションに応じたアイコンを表示するコンポーネント
const ActionIcon = ({ type }: { type: TimelineItem["type"] }) => {
  const actionType = getActionType(type)
  
  switch (actionType) {
    case "post":
      return (
        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <title>投稿</title>
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      )
    case "released":
      return (
        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <title>リリース</title>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    case "others":
      return (
        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
          <title>その他</title>
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      )
  }
}

// プラットフォーム名を取得する関数
const getPlatformName = (type: TimelineItem["type"]): string => {
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
const getActionLabel = (type: TimelineItem["type"]): string => {
  switch (type) {
    case "oss":
      return "Contributed to"
    default:
      return "Created"
  }
}

// タイムラインアイテムカード
const TimelineItemCard = ({ item }: { item: TimelineItem }) => {
  const date = new Date(item.date)
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`
  const actionType = getActionType(item.type)
  
  // Twitterの場合、releaseタイプでsiteNameがTwitterの場合、またはshowAsTweetがtrueの場合は専用コンポーネントを使用
  if (item.type === 'twitter' || (item.type === 'release' && item.siteName === 'Twitter') || item.showAsTweet) {
    return (
      <div className="flex items-start group relative pl-10 pb-10">
        {/* 縦線 */}
        <div className="absolute left-3.5 top-0 h-full w-px bg-gray-700 group-last:h-6" />
        
        {/* アイコン */}
        <div className="absolute left-0 -top-1 flex items-center justify-center w-7 h-7 rounded-full bg-blue-900/30 border-blue-700 border-2 z-10">
          {item.type === 'twitter' ? (
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <title>Twitter</title>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
            </svg>
          ) : (
            <ActionIcon type={item.type} />
          )}
        </div>
        
        <div className="flex-grow">
          {/* カード上部の情報 */}
          <div className="flex items-center gap-2 mb-2">
            {item.type === 'twitter' ? (
              <span className="text-sm font-medium text-blue-400">Tweeted</span>
            ) : (
              <span className="text-sm font-medium text-green-400">Released</span>
            )}
            <span className="text-sm text-gray-400">{formattedDate}</span>
          </div>
          
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <TweetCard 
              name={item.siteName || "こばけん"}
              username="kbkn3"
              text={item.title}
              imageUrl={item.imageUrl}
              date={item.date}
            />
          </a>
        </div>
      </div>
    );
  }
  
  // アクションタイプに応じた背景色クラス
  const iconBgColorClass = 
    actionType === "post" ? "bg-blue-900/30 border-blue-700" : 
    actionType === "released" ? "bg-green-900/30 border-green-700" : 
    "bg-purple-900/30 border-purple-700"

  return (
    <div className="flex items-start group relative pl-10 pb-10">
      {/* 縦線 */}
      <div className="absolute left-3.5 top-0 h-full w-px bg-gray-700 group-last:h-6" />
      
      {/* アイコン */}
      <div className={`absolute left-0 -top-1 flex items-center justify-center w-7 h-7 rounded-full ${iconBgColorClass} border-2 z-10`}>
        <ActionIcon type={item.type} />
      </div>
      
      <div className="flex-grow">
        {/* カード上部の情報 */}
        <div className="flex items-center gap-2 mb-2">
          {actionType === "released" ? (
            <>
              <span className="text-sm font-medium text-green-400">Released</span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          ) : actionType === "post" ? (
            <>
              <span className="text-sm font-medium text-blue-400">Posted on</span>
              <span className="text-sm font-medium text-gray-300">{getPlatformName(item.type)}</span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-purple-400">{getActionLabel(item.type)}</span>
              <span className="text-sm text-gray-400">{formattedDate}</span>
            </>
          )}
        </div>
        
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block max-w-2xl"
        >
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors">
            <div className="p-4">
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <div className="mt-2 flex items-center gap-2">
                {actionType === "released" ? (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400 truncate">{item.url}</span>
                  </>
                ) : actionType === "post" ? (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400">{formattedDate}</span>
                  </>
                ) : (
                  <>
                    <SiteIcon url={item.url} size={16} />
                    <span className="text-sm text-gray-400 truncate">{item.url}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

// 年ごとのグループ
const YearGroup = ({ year, items }: { year: number; items: TimelineItem[] }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{year}</h2>
      <div className="relative">
        {items.map((item) => (
          <TimelineItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

interface TimelineSectionProps {
  timelineItems?: TimelineItem[];
  error?: string;
}

const TimelineSection = ({ timelineItems = [], error }: TimelineSectionProps) => {
  const loading = !timelineItems && !error;

  // タイムラインアイテム（Twitterも含める）
  const filteredItems = timelineItems;
  
  // 年ごとにグループ化
  const itemsByYear = filteredItems.reduce<Record<number, TimelineItem[]>>((acc, item) => {
    const year = new Date(item.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});
  
  // 年の降順でソート
  const sortedYears = Object.keys(itemsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="timeline" className="py-4 md:py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Timeline"
          icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
          className="text-blue-400 mb-8"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-4 rounded-lg">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            タイムラインアイテムがありません
          </div>
        ) : (
          <div>
            {sortedYears.map((year) => (
              <YearGroup key={year} year={year} items={itemsByYear[year]} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TimelineSection
