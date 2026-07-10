import Link from "next/link";
import { MapPin, CalendarDays, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedEvents } from "@/lib/events-data";
import type { FeaturedEvent } from "@/lib/events-data";
import type { Dictionary, Locale } from "@/lib/i18n";

interface FeaturedEventSectionProps {
  locale: Locale;
  dict: Dictionary;
}

function SpotlightEventCard({
  event,
  eventsHref,
  dict,
}: {
  event: FeaturedEvent;
  eventsHref: string;
  dict: Dictionary;
}) {
  return (
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
              {event.title}
            </span>
            {event.description && (
              <p className="text-base text-primary-foreground/80">
                {event.description}
              </p>
            )}

            {event.location && (
              <div className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-1 flex-col justify-center gap-6 p-8 lg:p-12">
          {event.dateLabel && (
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-lg font-semibold text-foreground">
                {event.dateLabel}
              </span>
            </div>
          )}

          {event.deadlines.length > 0 && (
            <>
              <Separator />

              <div className="flex flex-col gap-3">
                {event.deadlines.map((deadline, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm text-foreground">
                      {deadline.label}: {deadline.date}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-wrap gap-3">
            <Link href={eventsHref}>
              <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                {dict.events.btnDetails}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactEventCard({ event }: { event: FeaturedEvent }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold leading-snug text-foreground">
        {event.title}
      </h3>

      {event.description && (
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
        {event.dateLabel && (
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {event.dateLabel}
          </span>
        )}
        {event.location && (
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {event.location}
          </span>
        )}
        {event.deadlines[0] && (
          <span className="flex items-start gap-1.5 text-xs">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span>
              {event.deadlines[0].label}: {event.deadlines[0].date}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export async function FeaturedEventSection({ locale, dict }: FeaturedEventSectionProps) {
  const events = await getFeaturedEvents(locale, 5);

  // No activities to feature (or API unreachable) — hide the section entirely.
  if (events.length === 0) return null;

  const [spotlight, ...rest] = events;
  const eventsHref = `/${locale}/events`;

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionFeaturedEvent}
          </h2>
        </div>

        <SpotlightEventCard event={spotlight} eventsHref={eventsHref} dict={dict} />

        {rest.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((event) => (
              <CompactEventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
