import Link from "next/link";
import { MapPin, CalendarDays, FileText, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Dictionary, Locale } from "@/lib/i18n";

interface FeaturedEventSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function FeaturedEventSection({ locale, dict }: FeaturedEventSectionProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionFeaturedEvent}
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Left: visual banner */}
            <div className="relative flex flex-col items-center justify-center gap-4 bg-primary px-8 py-12 text-center text-primary-foreground lg:w-2/5 lg:py-16">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-foreground/20" />
                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-primary-foreground/15" />
              </div>
              <div className="relative flex flex-col items-center gap-3">
                <span className="text-5xl font-bold md:text-6xl">
                  {dict.home.featuredEventTitle}
                </span>
                <p className="text-base text-primary-foreground/80">
                  {dict.home.featuredEventSubtitle}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{dict.home.featuredEventLocation}</span>
                </div>
              </div>
            </div>

            {/* Right: details */}
            <div className="flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-lg font-semibold text-foreground">
                  {dict.home.featuredEventDate}
                </span>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm text-foreground">
                    {dict.home.featuredEventDeadlinePaper}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <UserPlus className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm text-foreground">
                    {dict.home.featuredEventDeadlineReg}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/events`}>
                  <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                    {dict.home.featuredEventCta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={`/${locale}/events`}>
                  <Button variant="outline" className="gap-2">
                    {dict.home.featuredEventRegCta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
