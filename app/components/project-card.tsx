import { FileText, Github, Web } from "~/components/icons"
import { Card, CardContent, CardFooter } from "~/components/ui/card"

export interface ProjectCardProps {
  title: string
  description: string
  image?: string
  link?: string
  tags: string[]
  articleTitle?: string
  articleUrl?: string
  serviceTitle?: string
  serviceUrl?: string
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  articleTitle,
  articleUrl,
  serviceTitle,
  serviceUrl,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors border-0">
      <div className="relative aspect-video">
        <img
          src={image || "https://placeholder.pics/svg/1600x900"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="px-4">
        <h3 className="font-normal text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 flex flex-col items-start gap-2">
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white hover:underline"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        )}
        {articleTitle && articleUrl && (
          <a
            href={articleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white hover:underline"
          >
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span className="break-words">{articleTitle}</span>
          </a>
        )}
        {serviceTitle && serviceUrl && (
          <a
            href={serviceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white hover:underline"
          >
            <Web className="h-4 w-4 flex-shrink-0" />
            <span className="break-words">{serviceTitle}</span>
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
