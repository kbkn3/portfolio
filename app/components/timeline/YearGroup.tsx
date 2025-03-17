import type { TimelineItem } from "~/lib/timeline-data"
import TimelineItemCard from "./TimelineItemCard"

interface YearGroupProps {
  year: number
  items: TimelineItem[]
}

// 年ごとのグループ
export const YearGroup = ({ year, items }: YearGroupProps) => {
  return (
    <div className="mb-8 w-full overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-4">{year}</h2>
      <div className="relative w-full">
        {items.map((item) => (
          <TimelineItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
