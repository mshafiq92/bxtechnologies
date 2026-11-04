import type { SVGProps } from "react";

/*
 * Inline SVG icons (README: "Icons are inline SVG. No icon font.").
 * Decorative by default (aria-hidden). Give the parent control an accessible name.
 * Arrows are drawn as icons because the self-hosted Latin font subsets have no arrow glyphs.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 16, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Stroke>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Stroke size={10} {...props}>
      <path d="m6 9 6 6 6-6" />
    </Stroke>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14" />
    </Stroke>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Stroke>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </Stroke>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 15V3M7 8l5-5 5 5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </Stroke>
  );
}

/* Brand icons: paths from the design handoff (BxFooter.dc.html). */

function Fill({ size = 16, viewBox, children, ...props }: IconProps & { viewBox: string }) {
  return (
    <svg
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Fill viewBox="0 0 448 512" {...props}>
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3M447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </Fill>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Fill viewBox="0 0 320 512" {...props}>
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </Fill>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Fill viewBox="0 0 512 512" size={15} {...props}>
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L196.2 280.2 22 48h145.6l108.9 144.3zm-24.8 373.8h39.1L151.1 88h-42z" />
    </Fill>
  );
}
