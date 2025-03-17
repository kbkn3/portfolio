import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import { YearGroup } from "~/components/timeline/YearGroup"
import type { TimelineItem } from "~/lib/timeline-data"

interface TimelineSectionProps {
  timelineItems?: TimelineItem[]
  error?: string
}

const TimelineSection = ({
  timelineItems = [],
  error,
}: TimelineSectionProps) => {
  const loading = !timelineItems && !error

  // タイムラインアイテム
  const filteredItems = timelineItems

  // 年ごとにグループ化
  const itemsByYear = filteredItems.reduce<Record<number, TimelineItem[]>>(
    (acc, item) => {
      const year = new Date(item.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(item)
      return acc
    },
    {},
  )

  // 年の降順でソート
  const sortedYears = Object.keys(itemsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <section id="timeline" className="py-4 md:py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Timeline"
          icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
          className="text-blue-400"
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
