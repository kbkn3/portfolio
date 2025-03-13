import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"

const TimelineSection = () => (
  <section id="timeline" className="py-4 md:py-8 lg:py-12">
    <div className="container">
      <SectionHeading
        title="Timeline"
        icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
        className="text-blue-400"
      />
    </div>
  </section>
)

export default TimelineSection
