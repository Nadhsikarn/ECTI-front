import Link from "next/link";
import { ArrowRight, Newspaper, CalendarDays, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Dictionary, Locale } from "@/lib/i18n";

interface FeaturedUpdatesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function FeaturedUpdatesSection({ locale, dict }: FeaturedUpdatesSectionProps) {
  const updates = [
    {
      icon: Newspaper,
      label: dict.home.updateNewsLabel,
      title: dict.home.updateNewsTitle,
      date: dict.home.updateNewsDate,
      description: dict.home.updateNewsDesc,
      href: `/${locale}/news`,
      badgeVariant: "default" as const,
    },
    {
      icon: CalendarDays,
      label: dict.home.updateConferenceLabel,
      title: dict.home.updateConferenceTitle,
      date: dict.home.updateConferenceDate,
      description: dict.home.updateConferenceDesc,
      href: `/${locale}/events`,
      badgeVariant: "secondary" as const,
    },
    {
      icon: FileText,
      label: dict.home.updateCfpLabel,
      title: dict.home.updateCfpTitle,
      date: dict.home.updateCfpDate,
      description: dict.home.updateCfpDesc,
      href: `/${locale}/events`,
      badgeVariant: "destructive" as const,
    },
  ];

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionUpdates}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {updates.map((update) => (
            <Link key={update.title} href={update.href} className="group">
              <Card className="h-full border-border bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant={update.badgeVariant} className="text-xs">
                      {update.label}
                    </Badge>
                    <update.icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary">
                      {update.title}
                    </h3>
                    <p className="text-xs font-medium text-accent">
                      {update.date}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {update.description}
                  </p>

                  <div className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                    {dict.common.readMore}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
