import { type SVGProps, forwardRef } from "react"

export const OnePin = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
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
    <title>1 pin</title>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
))

export const TwoPin = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
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
    <title>2 pin</title>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <circle cx="12" cy="8" r="3" />
    <circle cx="12" cy="16" r="3" />
  </svg>
))

export const ThreePin = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & { size?: number }
>(({ size = 24, className, ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
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
    <title>3 pin</title>
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <circle cx="12" cy="6" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="18" r="3" />
  </svg>
))
