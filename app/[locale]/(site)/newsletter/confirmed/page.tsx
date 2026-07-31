import Link from "next/link";
import { notFound } from "next/navigation";
import { MailCheck } from "lucide-react";
import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.home.newsletterConfirmedTitle,
    // Nothing here is worth indexing, and the URL is only ever reached from a
    // link in a confirmation email.
    robots: { index: false, follow: false },
  };
}

/**
 * Where Brevo sends a subscriber after they click the link in the double opt-in
 * email (see app/api/subscribe/route.ts).
 *
 * A page rather than a toast on the home page: arriving here *is* the result the
 * person came to see, so it gets the whole screen instead of a corner box that
 * fades. It also survives a refresh, can be bookmarked, and doesn't depend on
 * any client-side timing.
 */
export default async function NewsletterConfirmedPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-4 py-20 text-center lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MailCheck className="h-8 w-8" aria-hidden="true" />
      </div>

      <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
        {dict.home.newsletterConfirmedTitle}
      </h1>

      <p className="text-pretty leading-relaxed text-muted-foreground">
        {dict.home.newsletterConfirmed}
      </p>

      <Button asChild className="mt-2 h-11">
        <Link href={`/${locale}`}>{dict.home.newsletterBackHome}</Link>
      </Button>
    </div>
  );
}
