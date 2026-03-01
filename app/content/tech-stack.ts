import type { TechCategory } from "~/lib/schemas"

export const technologies: TechCategory[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Remix",
      "HonoX",
      "TypeScript",
      "TailwindCSS",
      "Zustand",
      "GraphQL",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Hono",
      "Go",
      "Python",
      "PostgreSQL",
      "MySQL",
      "MemoryDB",
    ],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Cloudflare", "AWS", "CI/CD", "Git"],
  },
  {
    category: "Tools",
    skills: ["VS Code", "Figma", "Bun test", "Vitest", "GitHub"],
  },
]
