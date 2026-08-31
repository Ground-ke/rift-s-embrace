import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/**
 * Standalone Verve Radiant Spiral Hand Logo Mark
 * Vector replica preserving exact proportions, spiral coiling, radiant rays, and upward flourish.
 */
export function VerveIcon({
  className = "size-8",
  color = "currentColor",
  accentColor = "#FFA834",
  secondaryColor = "#FFC843",
  animated = false,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  accentColor?: string;
  secondaryColor?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "animate-pulse" : ""} shrink-0`}
      aria-label="Verve logo mark"
      {...props}
    >
      <defs>
        <linearGradient
          id="verve-sun-grad"
          x1="20"
          y1="20"
          x2="140"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
        <filter id="verve-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="4"
            floodColor={accentColor}
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      <g className={animated ? "origin-center transition-transform hover:scale-105" : ""}>
        {/* Ray 1 (Top-most radiant finger ray) */}
        <path
          d="M 58 64 C 54 52 45 38 34 26 C 30 22 24 23 26 29 C 32 42 42 58 48 70 C 51 74 56 70 58 64 Z"
          fill="url(#verve-sun-grad)"
        />

        {/* Ray 2 (Upper-middle radiant finger ray) */}
        <path
          d="M 46 76 C 34 66 22 55 9 46 C 5 43 1 48 4 52 C 15 63 28 77 38 86 C 42 89 47 84 46 76 Z"
          fill="url(#verve-sun-grad)"
        />

        {/* Ray 3 (Lower-middle radiant finger ray) */}
        <path
          d="M 40 92 C 26 87 14 83 2 80 C -2 79 -1 85 3 87 C 14 93 27 99 37 103 C 42 105 45 98 40 92 Z"
          fill="url(#verve-sun-grad)"
        />

        {/* Ray 4 (Bottom radiant ray) */}
        <path
          d="M 44 110 C 31 112 18 114 5 116 C 0 117 0 123 5 123 C 18 122 31 119 43 118 C 48 117 49 111 44 110 Z"
          fill="url(#verve-sun-grad)"
        />

        {/* Central Palm Spiral & Upward Right V-Arm */}
        {/* The main stroke swoops in a clockwise spiral and rises upward to form the right branch of the V */}
        <path
          d="M 69 90 C 72 81 83 80 87 87 C 91 95 86 104 77 105 C 65 107 55 97 56 85 C 57 69 72 58 87 60 C 103 62 114 77 112 94 C 110 112 92 125 74 123 C 58 121 48 107 48 94 C 48 76 62 60 79 56 C 96 52 114 62 120 78 C 124 88 124 100 121 112 C 118 122 108 132 96 137 C 82 143 65 141 53 133 C 44 126 40 116 40 105"
          fill="none"
          stroke="url(#verve-sun-grad)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The prominent upward right swooping V-arm with outward curved thumb tip */}
        <path
          d="M 96 137 C 112 133 124 121 127 105 C 130 90 128 72 124 57 C 122 47 122 38 124 31 C 125 26 132 23 138 25 C 144 27 149 32 147 37 C 145 42 138 45 136 52 C 133 63 134 78 131 92 C 127 113 113 130 96 137 Z"
          fill="url(#verve-sun-grad)"
        />
      </g>
    </svg>
  );
}

/**
 * Geometric tribal/brutalist typography for "erve" + "& Co"
 */
export function VerveWordmark({
  className = "h-8",
  textColor = "currentColor",
  sunColor = "#FFCC00",
  showCo = true,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  textColor?: string;
  sunColor?: string;
  showCo?: boolean;
}) {
  return (
    <svg
      viewBox={showCo ? "0 0 240 120" : "0 0 240 70"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      aria-label="Verve wordmark"
      {...props}
    >
      {/* "erve" Letters - Bold geometric tribal block glyphs */}
      <g fill={textColor}>
        {/* Letter 'e' (1st) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 10 10 H 52 V 54 H 10 V 10 Z M 22 20 H 40 V 29 H 22 V 20 Z M 22 35 H 40 V 44 H 22 V 35 Z"
        />

        {/* Letter 'r' */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 64 10 H 106 V 54 H 92 V 34 H 80 V 54 H 64 V 10 Z M 78 20 H 94 V 26 H 78 V 20 Z"
        />

        {/* Letter 'v' */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 118 10 H 132 L 145 42 L 158 10 H 172 L 153 54 H 137 L 118 10 Z"
        />

        {/* Letter 'e' (2nd) */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 184 10 H 226 V 54 H 184 V 10 Z M 196 20 H 214 V 29 H 196 V 20 Z M 196 35 H 214 V 44 H 196 V 35 Z"
        />
      </g>

      {/* Optional "& Co" Submark */}
      {showCo && (
        <g>
          {/* Stylized Spiral Ampersand '&' */}
          <path
            d="M 98 72 C 94 67 86 67 82 72 C 78 77 79 84 84 87 C 89 89 94 88 97 91 C 100 94 99 101 94 104 C 88 107 80 105 77 99 C 75 95 76 90 79 87 C 82 85 85 86 86 89 C 87 92 85 95 82 95"
            fill="none"
            stroke={textColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Geometric Angular 'C' */}
          <path
            d="M 132 76 H 115 V 102 H 132"
            fill="none"
            stroke={textColor}
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Golden Radiant 8-Ray Sun with Center Spiral */}
          <g transform="translate(162, 89)">
            {/* Center Spiral Core */}
            <circle cx="0" cy="0" r="8" fill="none" stroke={sunColor} strokeWidth="2.5" />
            <path
              d="M -3 -1 C -1 -3 3 -3 4 -1 C 5 2 3 4 0 4 C -3 4 -4 2 -3 -1"
              fill="none"
              stroke={sunColor}
              strokeWidth="1.8"
            />
            {/* 8 Sun Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <polygon
                key={angle}
                points="-2.5,-12 2.5,-12 0,-18"
                fill={sunColor}
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        </g>
      )}
    </svg>
  );
}

export type VerveLogoVariant = "horizontal" | "stacked" | "icon-only" | "mark-and-text";
export type VerveTheme = "auto" | "light" | "dark" | "gold" | "monochrome";

export interface VerveLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VerveLogoVariant;
  theme?: VerveTheme;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  showCo?: boolean;
  animated?: boolean;
  linkToHome?: boolean;
}

/**
 * Full Verve & Co. Brand Logo Component
 * Supports responsive scaling, light/dark themes, icon-only and full lockup variants.
 */
export function VerveLogo({
  variant = "horizontal",
  theme = "auto",
  size = "md",
  showCo = true,
  animated = false,
  linkToHome = false,
  className = "",
  ...props
}: VerveLogoProps) {
  // Theme color resolution
  const isDark = theme === "dark" || theme === "auto";
  const textColor =
    theme === "gold"
      ? "#FFA834"
      : theme === "monochrome"
        ? "currentColor"
        : isDark
          ? "#F6F4EE"
          : "#121212";

  const accentColor = theme === "monochrome" ? "currentColor" : "#FFA834";
  const sunColor = theme === "monochrome" ? "currentColor" : "#FFC843";

  // Size mappings
  const sizeStyles = {
    xs: { icon: "size-5", wordmark: "h-4", text: "text-xs" },
    sm: { icon: "size-7", wordmark: "h-6", text: "text-sm" },
    md: { icon: "size-9", wordmark: "h-8", text: "text-base" },
    lg: { icon: "size-12", wordmark: "h-10", text: "text-lg" },
    xl: { icon: "size-16", wordmark: "h-14", text: "text-xl" },
    "2xl": { icon: "size-24", wordmark: "h-20", text: "text-2xl" },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} {...props}>
      {/* The Standalone Icon Mark */}
      <VerveIcon
        className={sizeStyles.icon}
        accentColor={accentColor}
        secondaryColor={sunColor}
        animated={animated}
      />

      {/* The Wordmark Lockup (when not icon-only) */}
      {variant !== "icon-only" && (
        <div className="flex flex-col justify-center">
          <VerveWordmark
            className={sizeStyles.wordmark}
            textColor={textColor}
            sunColor={sunColor}
            showCo={showCo}
          />
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center group transition-transform hover:opacity-90 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Verve - Return to Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Brand Presenter Pill ("Presented by Verve & Co.")
 */
export function VervePresenterBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-lavender/30 bg-card/80 px-3 py-1.5 backdrop-blur shadow-sm ${className}`}
    >
      <VerveIcon className="size-4 text-amber-400" />
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-bone-muted">
        Verve &amp; Co. <span className="text-lavender">Presents</span>
      </span>
    </div>
  );
}

/**
 * Integrated Verve Back Navigation Action
 * Combines standard Back navigation action with the Verve brand logo mark.
 */
export function VerveBackButton({
  to = "/",
  label = "Back to Event",
  className = "",
}: {
  to?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2.5 border border-border/80 bg-card/60 px-3 py-2 text-xs font-medium uppercase tracking-wider text-bone transition-all hover:border-lavender/50 hover:bg-card hover:text-bone hover:shadow-[0_0_12px_rgba(255,168,52,0.15)] active:scale-95 ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 text-lavender" />
      <VerveIcon className="size-5 text-amber-400 transition-transform group-hover:rotate-6" />
      <span className="font-semibold">{label}</span>
    </Link>
  );
}

/**
 * Brand Loading Screen Component
 * Renders a centered animated Verve logo mark with a radiant pulse effect.
 */
export function VerveLoadingScreen({
  message = "Loading experience...",
  fullScreen = false,
}: {
  message?: string;
  fullScreen?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${
        fullScreen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-md" : "min-h-[50vh] w-full"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative mb-6">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
        <VerveIcon className="relative size-16 sm:size-20 animate-bounce text-amber-400" />
      </div>

      <VerveWordmark className="h-7 text-bone" showCo={true} />

      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-lavender animate-pulse">
        {message}
      </p>
    </div>
  );
}

/**
 * Brand Error & 404 Recovery State Component
 */
export function VerveErrorState({
  title = "Page Not Found",
  code = "404",
  description = "The requested event or page cannot be found in the Rift.",
  actionLabel = "Return to Dashboard",
  actionTo = "/",
  onRetry,
}: {
  title?: string;
  code?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="w-full max-w-md border border-border/80 bg-card/70 p-8 sm:p-10 shadow-2xl backdrop-blur">
        {/* Brand Lockup Header */}
        <div className="mb-6 flex justify-center">
          <div className="relative grid size-16 place-items-center border border-lavender/40 bg-oxblood/40">
            <VerveIcon className="size-10 text-amber-400" />
          </div>
        </div>

        <VerveWordmark className="mx-auto h-6 text-bone" showCo={true} />

        {code && (
          <div className="mt-6 font-mono text-5xl font-bold tracking-tight text-lavender sm:text-6xl">
            {code}
          </div>
        )}

        <h1 className="mt-3 font-display text-2xl text-bone sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-bone-muted leading-relaxed">{description}</p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex min-h-11 items-center justify-center border border-lavender/40 bg-oxblood px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-bone hover:bg-oxblood/80 transition-colors"
            >
              Try Again
            </button>
          )}
          <Link
            to={actionTo}
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-card px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-bone hover:border-lavender/40 hover:bg-card/80 transition-colors"
          >
            <VerveIcon className="size-4 text-amber-400" />
            {actionLabel}
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
        Verve &amp; Co. Brand Ticketing Engine
      </div>
    </div>
  );
}
