import { type SVGProps, forwardRef } from "react"

export const Twitter = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    // strokeWidth="2"
    // strokeLinecap="round"
    // strokeLinejoin="round"
    className={className}
    {...props}
  >
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
))

export const Github = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    // strokeWidth="2"
    // strokeLinecap="round"
    // strokeLinejoin="round"
    className={className}
    {...props}
  >
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
))

// public/social/zenn.svg
export const Zenn = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  // biome-ignore lint/a11y/useAltText: <explanation>
  <img
    ref={ref}
    src="/social/zenn.svg"
    alt="Zenn"
    aria-label="Zenn"
    width={size}
    height={size}
    className={className}
    {...props}
  />
))

export const Qiita = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  // biome-ignore lint/a11y/useAltText: <explanation>
  <img
    ref={ref}
    src="/social/qiita-icon.png"
    alt="Qiita"
    aria-label="Qiita"
    width={size}
    height={size}
    className={className}
    {...props}
  />
))

export const QiitaWhite = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  // biome-ignore lint/a11y/useAltText: <explanation>
  <img
    ref={ref}
    src="/social/qiita-white-icon.png"
    alt="Qiita"
    aria-label="Qiita"
    width={size}
    height={size}
    className={className}
    style={{ filter: "brightness(0) saturate(100%) invert(67%) sepia(13%) saturate(246%) hue-rotate(185deg) brightness(90%) contrast(87%)" }}
    {...props}
  />
))

export const FileText = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <title>Article</title>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
))

export const Web = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <title>Website</title>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
))
