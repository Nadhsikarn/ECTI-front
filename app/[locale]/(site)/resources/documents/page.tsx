import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ResourceCollection } from "@/components/resource-collection";
import { getAssociationDocuments } from "@/lib/documents-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.resources.downloadsTitle,
    description: dict.resources.documentsDesc,
    alternates: {
      languages: {
        th: "/th/resources/documents",
        en: "/en/resources/documents",
      },
    },
  };
}

export default async function DocumentsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);
  const documents = await getAssociationDocuments(locale);

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.resources.downloadsTitle}
        description={dict.resources.documentsDesc}
        homeLabel={dict.nav.home}
        breadcrumbs={[
          { label: dict.resources.title, href: `/${locale}/resources` },
          { label: dict.resources.downloadsTitle },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <ResourceCollection
          items={documents}
          locale={locale as Locale}
          labels={{
            download: dict.resources.download,
            open: dict.resources.openLink,
          }}
        />
      </div>
    </>
  );
}
