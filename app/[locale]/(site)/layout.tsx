import { notFound } from "next/navigation";
import { isValidLocale, getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <div className="flex min-h-screen flex-col" lang={locale}>
      <a href="#main-content" className="skip-link">
        {locale === "th" ? "ข้ามไปเนื้อหาหลัก" : "Skip to main content"}
      </a>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <SiteFooter locale={locale as Locale} dict={dict} />
      <BackToTop />
    </div>
  );
}
