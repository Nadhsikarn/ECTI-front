import { Users, CalendarDays, BookOpen, Clock, Handshake } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

interface StatsSectionProps {
  dict: Dictionary;
}

export function StatsSection({ dict }: StatsSectionProps) {
  const stats = [
    { icon: Users, value: "2,500+", label: dict.home.statMembers },
    { icon: CalendarDays, value: "50+", label: dict.home.statConferences },
    { icon: BookOpen, value: "10,000+", label: dict.home.statPublications },
    { icon: Clock, value: "20+", label: dict.home.statYears },
    { icon: Handshake, value: "30+", label: dict.home.statPartners },
  ];

  return (
    <section className="border-b border-border bg-card py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
