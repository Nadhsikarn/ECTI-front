import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ResourceCollection } from "@/components/resource-collection";
import { memberEbooks } from "@/lib/resource-detail-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.resources.linksTitle,
    description: dict.resources.ebooksDesc,
    alternates: {
      languages: {
        th: "/th/resources/e-books",
        en: "/en/resources/e-books",
      },
    },
  };
}

export default async function EbooksPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.resources.linksTitle}
        description={dict.resources.ebooksDesc}
        homeLabel={dict.nav.home}
        breadcrumbs={[
          { label: dict.resources.title, href: `/${locale}/resources` },
          { label: dict.resources.linksTitle },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <ResourceCollection
          items={memberEbooks}
          locale={locale as Locale}
          icon={BookOpen}
          labels={{
            download: dict.resources.download,
            open: dict.resources.openLink,
          }}
        />
      </div>
    </>
  );
}
