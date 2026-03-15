import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.publications.title,
    description: dict.publications.description,
    openGraph: {
      title: dict.publications.title,
      description: dict.publications.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/publications", en: "/en/publications" } },
  };
}

export default async function PublicationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const journals = [
    {
      title: dict.publications.journalEEC,
      description: dict.publications.journalEECDesc,
      icon: BookOpen,
    },
    {
      title: dict.publications.journalCIT,
      description: dict.publications.journalCITDesc,
      icon: BookOpen,
    },
  ];

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.publications.title}
        description={dict.publications.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.publications.title }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Journals */}
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {dict.publications.journalsTitle}
        </h2>
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {journals.map((journal) => (
            <Card
              key={journal.title}
              className="border-border transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <journal.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {journal.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {journal.description}
                </p>
                <Button
                  variant="outline"
                  className="mt-auto w-fit gap-2 border-border"
                >
                  <ExternalLink className="h-4 w-4" />
                  {dict.common.readMore}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proceedings */}
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          {dict.publications.proceedingsTitle}
        </h2>
        <Card className="border-border">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <FileText className="h-7 w-7 text-accent" />
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {dict.publications.proceedingsText}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
