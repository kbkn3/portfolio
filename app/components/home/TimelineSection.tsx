import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import type { TimelineItem } from "~/lib/timeline-data"

// タイプに応じたアイコンを表示するコンポーネント
const TypeIcon = ({ type }: { type: TimelineItem["type"] }) => {
  switch (type) {
    case "twitter":
      return <span className="text-blue-400">𝕏</span>
    case "zenn":
      return <span className="text-blue-500">Zenn</span>
    case "qiita":
      return <span className="text-green-500">Qiita</span>
    case "oss":
      return <span className="text-purple-500">OSS</span>
    case "blog":
      return <span className="text-orange-500">Blog</span>
    case "tech-blog":
      return <span className="text-indigo-500">Tech</span>
    case "release":
      return <span className="text-red-500">Release</span>
    default:
      return <span className="text-gray-500">Other</span>
  }
}

// タイムラインアイテムコンポーネント
const TimelineItemCard = ({ item }: { item: TimelineItem }) => {
  const date = new Date(item.date)
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`

  return (
    <div className="flex gap-4 mb-8 py-4">
      <div className="flex-shrink-0 w-16 text-sm text-gray-400">{formattedDate}</div>
      <div className="flex-shrink-0 w-20">
        <TypeIcon type={item.type} />
      </div>
      <div className="flex-grow">
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group"
        >
          {/* OGP カード表示 */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors">
            {item.imageUrl && (
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt="コンテンツのサムネイル画像"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="mt-2 text-gray-400 line-clamp-2">{item.description}</p>
              )}
              
              <div className="mt-3 flex items-center justify-between">
                {item.siteName && (
                  <span className="text-sm text-gray-500">{item.siteName}</span>
                )}
                
                <div className="flex items-center text-sm text-blue-400">
                  <span>詳細を見る</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <title>詳細を見る</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </a>
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

  // Twitterを除外したタイムラインアイテム
  const filteredItems = timelineItems.filter(item => item.type !== 'twitter');

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
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <TimelineItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TimelineSection
