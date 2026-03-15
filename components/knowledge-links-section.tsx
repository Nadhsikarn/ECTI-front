"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Play, Linkedin, Facebook } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { resourcesLinks, type Platform } from "@/lib/resources-links";
import type { Locale } from "@/lib/i18n";

const PLATFORMS: Platform[] = ["YouTube", "LinkedIn", "Facebook"];

const platformConfig: Record<
  Platform,
  { icon: typeof Play; color: string; badgeClass: string }
> = {
  YouTube: {
    icon: Play,
    color: "text-red-600",
    badgeClass:
      "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  LinkedIn: {
    icon: Linkedin,
    color: "text-blue-600",
    badgeClass:
      "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  Facebook: {
    icon: Facebook,
    color: "text-indigo-600",
    badgeClass:
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
  },
};

interface KnowledgeLinksSectionProps {
  locale: Locale;
  labels: {
    sectionTitle: string;
    sectionSubtitle: string;
    filterAll: string;
    openOn: string;
    editorHint: string;
  };
}

export function KnowledgeLinksSection({
  locale,
  labels,
}: KnowledgeLinksSectionProps) {
  const [activePlatform, setActivePlatform] = useState<Platform | "all">("all");

  const filtered = useMemo(() => {
    const items =
      activePlatform === "all"
        ? [...resourcesLinks]
        : resourcesLinks.filter((l) => l.platform === activePlatform);

    return items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [activePlatform]);

  function getTitle(item: (typeof resourcesLinks)[number]) {
    if (locale === "en" && item.title_en) return item.title_en;
    return item.title_th;
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section>
      {/* Section heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {labels.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {labels.sectionSubtitle}
        </p>
      </div>

      {/* Platform filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActivePlatform("all")}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            activePlatform === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {labels.filterAll}
        </button>
        {PLATFORMS.map((p) => {
          const cfg = platformConfig[p];
          const Icon = cfg.icon;
          const isActive = activePlatform === p;
          return (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {p}
            </button>
          );
        })}
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const cfg = platformConfig[item.platform];
          const Icon = cfg.icon;
          return (
            <Card
              key={item.url}
              className="group border-border transition-shadow hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                {/* Top row: badge + date */}
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={`gap-1 ${cfg.badgeClass}`}
                  >
                    <Icon className="h-3 w-3" />
                    {item.platform}
                  </Badge>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(item.date)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold leading-snug text-card-foreground line-clamp-2">
                  {getTitle(item)}
                </h3>

                {/* Summary */}
                {item.summary_th && (
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-1">
                    {item.summary_th}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-auto pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 px-3 text-xs font-medium text-primary"
                    asChild
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {labels.openOn} {item.platform}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Separator className="mt-10" />
    </section>
  );
}
