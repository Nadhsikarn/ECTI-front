"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [mobileMenuOpen, handleKeyDown]);

  const switchLocale = locale === "th" ? "en" : "th";
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`);

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.membership, href: `/${locale}/membership` },
    { label: dict.nav.events, href: `/${locale}/events` },
    { label: dict.nav.publications, href: `/${locale}/publications` },
    { label: dict.nav.awards, href: `/${locale}/awards` },
    { label: dict.nav.news, href: `/${locale}/news` },
    { label: dict.nav.resources, href: `/${locale}/resources` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  function isActive(href: string) {
    if (href === `/${locale}`) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md transition-shadow supports-[backdrop-filter]:bg-card/80 ${
        scrolled ? "border-border shadow-sm" : "border-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={locale === "th" ? "หน้าแรก ECTI" : "ECTI Home"}
        >
          <Image
            src="/images/ecti-logo.png"
            alt="ECTI Association"
            width={160}
            height={64}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label={locale === "th" ? "เมนูหลัก" : "Main navigation"}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  active
                    ? "text-primary"
                    : "text-foreground/65 hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {/* Active bottom indicator */}
                {active && (
                  <span
                    className="absolute inset-x-1 -bottom-[13px] h-[2px] rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Language toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href={switchPath}
            aria-label={dict.common.switchLangLabel}
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-border text-foreground"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium">{dict.common.switchLang}</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen
              ? (locale === "th" ? "ปิดเมนู" : "Close menu")
              : (locale === "th" ? "เปิดเมนู" : "Open menu")
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-card px-4 py-3 lg:hidden"
          aria-label={locale === "th" ? "เมนูมือถือ" : "Mobile navigation"}
        >
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/65 hover:bg-secondary hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <span
                      className="mr-2 h-4 w-[3px] rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
