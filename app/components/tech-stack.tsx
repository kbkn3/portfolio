import { Card } from "~/components/ui/card"
import { technologies } from "~/content/tech-stack"

export default function TechStack() {
  return (
    <div className="container">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech) => (
          <Card
            key={tech.category}
            className="p-4 bg-gray-800 hover:bg-gray-700 transition-colors border-0"
          >
            <h3 className="text-lg font-normal text-white">{tech.category}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
