import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { EventsListClient } from "@/components/events-list-client";
import { events, getUniqueYears, getUniqueLocations } from "@/lib/events-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.events.title,
    description: dict.events.description,
    openGraph: {
      title: dict.events.title,
      description: dict.events.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/events", en: "/en/events" } },
  };
}

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const years = getUniqueYears();
  const locations = getUniqueLocations(locale as Locale);

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.events.title}
        description={dict.events.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.events.title }]}
      />

      <EventsListClient
        locale={locale as Locale}
        dict={dict}
        events={events}
        years={years}
        locations={locations}
      />
    </>
  );
}
