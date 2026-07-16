import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Link2, Archive, ArrowRight } from "lucide-react";
import { KnowledgeLinksSection } from "@/components/knowledge-links-section";
import { fetchResources } from "@/lib/resources-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.resources.title,
    description: dict.resources.description,
    openGraph: {
      title: dict.resources.title,
      description: dict.resources.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/resources", en: "/en/resources" } },
  };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const apiResources = await fetchResources(locale);

  const sections = [
    {
      icon: Download,
      title: dict.resources.downloadsTitle,
      description: dict.resources.downloadsText,
      color: "bg-primary/10 text-primary",
      href: `/${locale}/resources/documents`,
    },
    {
      icon: Link2,
      title: dict.resources.linksTitle,
      description: dict.resources.linksText,
      color: "bg-accent/10 text-accent",
      href: `/${locale}/resources/e-books`,
    },
    {
      icon: Archive,
      title: dict.resources.archiveTitle,
      description: dict.resources.archiveText,
      color: "bg-primary/10 text-primary",
      href: `/${locale}/resources/archive`,
    },
  ];

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.resources.title}
        description={dict.resources.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.resources.title }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* New: Knowledge Links from Platforms */}
        <KnowledgeLinksSection
          locale={locale as Locale}
          labels={{
            sectionTitle: dict.resources.knowledgeTitle,
            sectionSubtitle: dict.resources.knowledgeSubtitle,
            filterAll: dict.resources.knowledgeFilterAll,
            openOn: dict.resources.knowledgeOpenOn,
            editorHint: dict.resources.knowledgeEditorHint,
          }}
          initialResources={apiResources}
        />

        {/* Association Documents / Related Links / Archive */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
            >
              <Card className="h-full border-border transition-shadow group-hover:shadow-lg">
                <CardContent className="flex h-full flex-col items-start gap-5 p-8">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${section.color}`}
                  >
                    <section.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary">
                    {dict.resources.viewAll}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
