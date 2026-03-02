import { useState } from "react"
import { OnePin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import { experiences } from "~/content/experiences"
import type { ExperienceItem } from "~/lib/schemas"
import ExperienceCard from "./ExperienceCard"
import ExperienceDetailDialog from "./ExperienceDetailDialog"

const ExperienceSection = () => {
  const leftExperiences = experiences.filter((_, index) => index % 2 === 0)
  const rightExperiences = experiences.filter((_, index) => index % 2 !== 0)

  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (exp: ExperienceItem) => {
    setSelectedExp(exp)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <section id="experience" className="py-4 md:py-8 lg:py-12">
      <div className="container">
        <SectionHeading
          title="Experience"
          icon={<OnePin className="w-8 h-8 rotate-[20deg]" />}
          className="text-blue-400"
        />

        {/* モバイルビュー */}
        <div className="relative mt-8 md:hidden">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute left-4 top-6 w-6 h-0.5 bg-blue-200 bg-opacity-20" />
                <div className="ml-10">
                  <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PCビュー */}
        <div className="relative mt-8 hidden md:block">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200 bg-opacity-20" />
          <div className="grid grid-cols-2">
            <div className="space-y-24">
              {leftExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 right-0 w-12" />
                  <div className="pr-12">
                    <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-24 pt-24">
              {rightExperiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="absolute top-6 h-0.5 bg-blue-200 bg-opacity-20 left-0 w-12" />
                  <div className="pl-12">
                    <ExperienceCard exp={exp} onClick={() => openDialog(exp)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ExperienceDetailDialog
          exp={selectedExp}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        />
      </div>
    </section>
  )
}

export default ExperienceSection
