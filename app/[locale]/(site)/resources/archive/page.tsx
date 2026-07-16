import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Newspaper, BookText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ResourceRowList } from "@/components/resource-row-list";
import { getArchiveItems } from "@/lib/archive-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.resources.archiveTitle,
    description: dict.resources.archiveDesc,
    alternates: {
      languages: {
        th: "/th/resources/archive",
        en: "/en/resources/archive",
      },
    },
  };
}

export default async function ArchivePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const { magazines, journals } = await getArchiveItems(locale);

  const sections = [
    { title: dict.resources.catMagazine, icon: Newspaper, items: magazines },
    { title: dict.resources.catIndustry, icon: BookText, items: journals },
  ];

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.resources.archiveTitle}
        description={dict.resources.archiveDesc}
        homeLabel={dict.nav.home}
        breadcrumbs={[
          { label: dict.resources.title, href: `/${locale}/resources` },
          { label: dict.resources.archiveTitle },
        ]}
      />

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-16 lg:px-8">
        {sections.map((section) =>
          section.items.length > 0 ? (
            <section key={section.title}>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                {section.title}
              </h2>
              <ResourceRowList
                items={section.items}
                locale={locale as Locale}
                openLabel={dict.resources.openLink}
                icon={section.icon}
              />
            </section>
          ) : null
        )}
      </div>
    </>
  );
}
