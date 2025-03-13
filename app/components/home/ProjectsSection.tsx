import { TwoPin } from "~/components/MahjongTile"
import SectionHeading from "~/components/SectionHeading"
import ProjectCard, { type ProjectCardProps } from "~/components/project-card"

interface ProjectsSectionProps {
  projects: ProjectCardProps[]
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => (
  <section id="projects" className="py-4 md:py-8 lg:py-12">
    <div>
      <SectionHeading
        title="Projects"
        icon={<TwoPin className="w-8 h-8 rotate-[20deg]" />}
        className="text-indigo-400"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            tags={project.tags}
            articleTitle={project.articleTitle}
            articleUrl={project.articleUrl}
            serviceTitle={project.serviceTitle}
            serviceUrl={project.serviceUrl}
          />
        ))}
      </div>
    </div>
  </section>
)

export default ProjectsSection
