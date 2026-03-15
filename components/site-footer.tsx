import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinksCol1 = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
    { label: dict.nav.events, href: `/${locale}/events` },
    { label: dict.nav.publications, href: `/${locale}/publications` },
  ];

  const quickLinksCol2 = [
    { label: dict.nav.awards, href: `/${locale}/awards` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.resources, href: `/${locale}/resources` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/ecaboratory",
      icon: Facebook,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/ecti",
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/ecti",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:info@ecti.or.th",
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand - spans 1 col, logo at natural aspect ratio */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Image
              src="/images/ecti-logo.png"
              alt="ECTI Association"
              width={320}
              height={130}
              className="h-auto w-36 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              {dict.footer.quickLinks}
            </h3>
            <nav className="flex flex-col gap-2" aria-label={locale === "th" ? "ลิงก์ด่วน" : "Quick links"}>
              {quickLinksCol1.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links Column 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              &nbsp;
            </h3>
            <nav className="flex flex-col gap-2" aria-label={locale === "th" ? "ลิงก์เพิ่มเติม" : "More links"}>
              {quickLinksCol2.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50">
              {dict.footer.followUs}
            </h3>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground focus-visible:bg-primary-foreground/20 focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-center text-xs text-primary-foreground/50">
            &copy; {currentYear} ECTI Association. {dict.footer.copyright}.
          </p>
        </div>
      </div>
    </footer>
  );
}
