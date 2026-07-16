import { Newspaper, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ResourceItem } from "@/lib/resource-detail-data";
import type { Locale } from "@/lib/i18n";

interface ResourceRowListProps {
  items: ResourceItem[];
  locale: Locale;
  /** Accessible label for the open action, e.g. "เปิดลิงก์" */
  openLabel: string;
  /** Leading icon for each row (defaults to a magazine icon) */
  icon?: LucideIcon;
}

/**
 * Horizontal list rows for the Archive page (issue #28) — a lighter alternative
 * to the card grid. Each row opens the PDF in a new tab (native scrollable
 * viewer, no forced download), with an open icon on the right.
 */
export function ResourceRowList({
  items,
  locale,
  openLabel,
  icon: Icon = Newspaper,
}: ResourceRowListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const title =
          locale === "en" && item.titleEn ? item.titleEn : item.title;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${openLabel}: ${title}`}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-card-foreground">
                  {title}
                </span>
                {item.meta && (
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.meta}
                  </span>
                )}
              </span>

              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
