import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { NewsListClient } from "@/components/news-list-client";
import { newsPosts } from "@/lib/news-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.news.title,
    description: dict.news.description,
    openGraph: {
      title: dict.news.title,
      description: dict.news.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/news", en: "/en/news" } },
  };
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.news.title}
        description={dict.news.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.news.title }]}
      />

      <NewsListClient
        locale={locale as Locale}
        dict={dict}
        posts={newsPosts}
      />
    </>
  );
}
