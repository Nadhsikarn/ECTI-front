import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Link2, Archive } from "lucide-react";
import { KnowledgeLinksSection } from "@/components/knowledge-links-section";

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

  const sections = [
    {
      icon: Download,
      title: dict.resources.downloadsTitle,
      description: dict.resources.downloadsText,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Link2,
      title: dict.resources.linksTitle,
      description: dict.resources.linksText,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Archive,
      title: dict.resources.archiveTitle,
      description: dict.resources.archiveText,
      color: "bg-primary/10 text-primary",
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
        />

        {/* Existing: Downloads / Links / Archive */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="border-border transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-start gap-5 p-8">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
