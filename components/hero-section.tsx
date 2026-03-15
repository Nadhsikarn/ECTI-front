import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function CircuitPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="90" cy="90" r="1.5" fill="currentColor" />
          <circle cx="90" cy="10" r="1.5" fill="currentColor" />
          <circle cx="10" cy="90" r="1.5" fill="currentColor" />
          <path d="M10 10 H40 V50 H50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M90 10 V40 H50 V50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M10 90 H40 V50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M90 90 V60 H50 V50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="25" r="1" fill="currentColor" />
          <circle cx="25" cy="50" r="1" fill="currentColor" />
          <circle cx="75" cy="50" r="1" fill="currentColor" />
          <circle cx="50" cy="75" r="1" fill="currentColor" />
          <path d="M50 25 V50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M25 50 H50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M75 50 H50" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 75 V50" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      {/* Blue-toned overlay for readability while preserving image visibility */}
      <div className="absolute inset-0 bg-primary/75" />

      {/* Subtle circuit pattern overlay */}
      <CircuitPattern />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-24 text-center lg:px-8 lg:py-32">
        <Image
          src="/images/ecti-logo.png"
          alt="ECTI Association Logo"
          width={280}
          height={112}
          className="h-16 w-auto brightness-0 invert md:h-20"
          priority
        />

        <h1 className="max-w-4xl text-balance text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {dict.home.heroTitle}
        </h1>

        <p className="max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          {dict.home.heroSubtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${locale}/membership`}>
            <Button
              size="lg"
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {dict.home.heroPrimaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link href={`/${locale}/events`}>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {dict.home.heroSecondaryCta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
