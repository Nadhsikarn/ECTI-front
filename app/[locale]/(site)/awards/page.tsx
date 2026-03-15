import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Star, Heart } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.awards.title,
    description: dict.awards.description,
    openGraph: {
      title: dict.awards.title,
      description: dict.awards.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/awards", en: "/en/awards" } },
  };
}

export default async function AwardsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const awards = [
    {
      icon: Award,
      title: dict.awards.bestPaperTitle,
      description: dict.awards.bestPaperText,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Star,
      title: dict.awards.outstandingTitle,
      description: dict.awards.outstandingText,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Heart,
      title: dict.awards.serviceTitle,
      description: dict.awards.serviceText,
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.awards.title}
        description={dict.awards.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.awards.title }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {awards.map((award) => (
            <Card
              key={award.title}
              className="border-border transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center gap-5 p-8 text-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${award.color}`}
                >
                  <award.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {award.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {award.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
