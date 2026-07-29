import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { FileText } from "lucide-react";
import { ResourceRowList } from "@/components/resource-row-list";
import { DocumentGuideSection } from "@/components/document-guide";
import { getAssociationDocuments } from "@/lib/documents-data";
import { getDocumentGuide } from "@/lib/document-guide-data";

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
  const [documents, guide] = await Promise.all([
    getAssociationDocuments(locale),
    getDocumentGuide(locale),
  ]);

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
        <DocumentGuideSection
          guide={guide}
          documents={documents}
          labels={{
            reimbursementTitle: dict.resources.guideReimbursementTitle,
            loanTitle: dict.resources.guideLoanTitle,
            stepsLabel: dict.resources.guideStepsLabel,
            receiptTitle: dict.resources.guideReceiptTitle,
            mailingTitle: dict.resources.guideMailingTitle,
            taxId: dict.resources.guideTaxId,
            phone: dict.resources.guidePhone,
            copy: dict.resources.guideCopy,
            copied: dict.resources.guideCopied,
          }}
        />

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {dict.resources.guideFormsTitle}
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            {dict.resources.guideFormsDesc}
          </p>
          <ResourceRowList
            items={documents}
            locale={locale as Locale}
            openLabel={dict.resources.openLink}
            icon={FileText}
            columns={2}
          />
        </section>
      </div>
    </>
  );
}
