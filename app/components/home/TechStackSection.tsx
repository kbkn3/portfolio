import { ThreePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import TechStack from "~/components/tech-stack"

const TechStackSection = () => (
  <section id="techstack" className="py-4 md:py-8 lg:py-12">
    <div>
      <SectionHeading
        title="TechStack"
        icon={<ThreePin className="w-8 h-8 rotate-[20deg]" />}
        className="text-orange-400"
      />
    </div>
    <TechStack />
  </section>
)

export default TechStackSection
