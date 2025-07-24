# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Router v7 portfolio website deployed on Cloudflare Pages. It features server-side rendering, timeline/portfolio sections, and OG data fetching for link previews.

## Development Commands

```bash
# Install dependencies (using Bun)
bun install

# Start development server (port 5173)
bun run dev

# Build for production
bun run build

# Type checking (generates types first, then checks)
bun run typecheck

# Code formatting and linting (using Biome)
bun run check    # Check and auto-fix all issues
bun run lint     # Lint with auto-fix
bun run format   # Format with auto-fix

# Serve production build locally
bun run start

# Deploy to Cloudflare Pages
bunx wrangler pages deploy ./build/client
```

## Architecture

### Route Structure

- `/` (Timeline) - Main timeline page showing activities with OG data fetching
- `/portfolio` - Portfolio page with experience, projects, and tech stack sections

### Key Directories

- `app/routes/` - Page components with React Router's file-based routing
- `app/components/` - Reusable components organized by feature
  - `home/` - Homepage-specific components (Header, Hero, Footer)
  - `timeline/` - Timeline components (TimelineItem, TimelineLinks)
  - `ui/` - Shadcn UI components (New York style)
- `app/lib/` - Utilities and data
  - `timeline-data.ts` - Timeline entries data
  - `utils.ts` - Utility functions including `cn()` for className merging
- `functions/` - Cloudflare Pages Functions for edge computing
- `public/` - Static assets (project images, social icons)

### Core Technologies

- **Framework**: React Router v7 with SSR on Cloudflare Workers
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: Shadcn UI (Radix UI based)
- **Build**: Vite with React Router plugin
- **Type Safety**: TypeScript with strict mode
- **Code Quality**: Biome (replaces ESLint/Prettier)

### Important Patterns

1. **Path Aliases**: Use `~/` for imports from the app directory
2. **Component Styling**: Use `cn()` utility from `~/lib/utils` for conditional classes
3. **View Transitions**: Tab navigation uses React Router's view transitions API
4. **OG Data Fetching**: Server-side fetching in route loaders using `open-graph-scraper`
5. **Security**: CSP headers configured in `app/root.tsx`

### Development Notes

- No test framework is currently configured
- Uses Bun as package manager (presence of bun.lockb)
- Git workflow on `develop` branch
- Biome configuration enforces 2-space indentation, 80-char line width
- TypeScript configured with strict mode and path aliases
