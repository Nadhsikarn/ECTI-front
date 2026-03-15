import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact-form";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.contact.title,
    description: dict.contact.description,
    openGraph: {
      title: dict.contact.title,
      description: dict.contact.description,
      locale: locale === "th" ? "th_TH" : "en_US",
    },
    alternates: { languages: { th: "/th/contact", en: "/en/contact" } },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const contactCards = [
    {
      icon: MapPin,
      title: dict.contact.addressTitle,
      text: dict.contact.addressText,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Mail,
      title: dict.contact.emailTitle,
      text: dict.contact.emailText,
      color: "bg-accent/10 text-accent",
      href: `mailto:${dict.contact.emailText}`,
    },
    {
      icon: Phone,
      title: dict.contact.phoneTitle,
      text: dict.contact.phoneText,
      color: "bg-chart-4/15 text-chart-4",
    },
    {
      icon: Clock,
      title: dict.contact.officeHoursTitle,
      text: dict.contact.officeHoursText,
      color: "bg-primary/10 text-primary",
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/ecti" },
    { icon: Twitter, label: "X (Twitter)", href: "https://x.com/ecti" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/ecti" },
    { icon: Globe, label: "ecti.or.th", href: "https://ecti.or.th" },
  ];

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={dict.contact.title}
        description={dict.contact.description}
        homeLabel={dict.nav.home}
        breadcrumbs={[{ label: dict.contact.title }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* --- Contact Info Cards --- */}
        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((info) => {
              const content = (
                <Card
                  key={info.title}
                  className="border-border transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${info.color}`}
                    >
                      <info.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {info.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {info.text}
                    </p>
                  </CardContent>
                </Card>
              );
              if (info.href) {
                return (
                  <a
                    key={info.title}
                    href={info.href}
                    className="block transition-transform hover:scale-[1.01]"
                  >
                    {content}
                  </a>
                );
              }
              return content;
            })}
          </div>
        </section>

        {/* --- Form + Map --- */}
        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <ContactForm
            labels={{
              formTitle: dict.contact.formTitle,
              formName: dict.contact.formName,
              formEmail: dict.contact.formEmail,
              formSubject: dict.contact.formSubject,
              formMessage: dict.contact.formMessage,
              formSend: dict.contact.formSend,
              formSuccess: dict.contact.formSuccess,
            }}
          />

          {/* Map Placeholder */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-foreground">
              {dict.contact.mapTitle}
            </h2>
            <Card className="flex-1 overflow-hidden border-border">
              <CardContent className="relative h-full min-h-[350px] p-0">
                {/* Map placeholder with styling */}
                <div className="flex h-full items-center justify-center bg-secondary/50">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-foreground">
                        {locale === "th"
                          ? "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ"
                          : "KMUTNB"}
                      </p>
                      <p className="max-w-xs text-xs text-muted-foreground">
                        {dict.contact.addressText}
                      </p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=King+Mongkut+University+of+Technology+North+Bangkok"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <MapPin className="h-4 w-4" />
                      {locale === "th" ? "เปิดใน Google Maps" : "Open in Google Maps"}
                    </a>
                  </div>
                </div>
                {/* Decorative grid pattern */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-[0.04]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="map-grid"
                      width="32"
                      height="32"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 32V0h32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* --- Social Links Block --- */}
        <section className="text-center">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            {dict.contact.socialTitle}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
              >
                <link.icon className="h-5 w-5 text-primary" />
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
