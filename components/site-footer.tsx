import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getSocialLinks } from "@/lib/social-data";

interface SiteFooterProps {
  locale: Locale;
  dict: Dictionary;
}

// X (formerly Twitter) brand logo — lucide's `X` is a close/cross icon, not the
// brand mark, so we inline the official logo here.
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const social = await getSocialLinks(locale);

  const quickLinksCol1 = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
    { label: dict.nav.events, href: `/${locale}/events` },
    { label: dict.nav.publications, href: `/${locale}/publications` },
  ];

  const quickLinksCol2 = [
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.resources, href: `/${locale}/resources` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  type FooterIcon = React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;

  const allSocial: { label: string; href: string | null; icon: FooterIcon }[] = [
    { label: "Facebook", href: social.facebook, icon: Facebook },
    { label: "X", href: social.x, icon: XIcon },
    { label: "LinkedIn", href: social.linkedin, icon: Linkedin },
    { label: "YouTube", href: social.youtube, icon: Youtube },
  ];

  const socialLinks = allSocial.filter(
    (s): s is { label: string; href: string; icon: FooterIcon } => Boolean(s.href)
  );

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand - spans 1 col, logo at natural aspect ratio */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Image
              src="/images/ecti-logo.svg"
              alt="ECTI Association"
              width={185}
              height={66}
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
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 text-primary-foreground/60 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground focus-visible:bg-primary-foreground/20 focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
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
