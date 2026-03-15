import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Locale } from "@/lib/i18n";

interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  locale: Locale;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbEntry[];
  homeLabel: string;
}

export function PageHeader({
  locale,
  title,
  description,
  breadcrumbs,
  homeLabel,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${locale}`}
                  className="text-primary-foreground/60 hover:text-primary-foreground/90"
                >
                  {homeLabel}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="contents">
                <BreadcrumbSeparator className="text-primary-foreground/40" />
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="text-primary-foreground font-medium">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={crumb.href ?? "#"}
                        className="text-primary-foreground/60 hover:text-primary-foreground/90"
                      >
                        {crumb.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <h1 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/75">
          {description}
        </p>
      </div>
    </section>
  );
}
