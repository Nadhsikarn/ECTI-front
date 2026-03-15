"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/lib/i18n";

interface NewsletterSectionProps {
  dict: Dictionary;
}

export function NewsletterSection({ dict }: NewsletterSectionProps) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-16 md:py-16">
          {/* Subtle circles */}
          <div className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary-foreground/5" />

          <div className="relative flex flex-col items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
              <Mail className="h-7 w-7" aria-hidden="true" />
            </div>

            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {dict.home.sectionNewsletter}
            </h2>

            <p className="max-w-lg text-pretty text-primary-foreground/80">
              {dict.home.newsletterSubtitle}
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {dict.home.newsletterPlaceholder}
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder={dict.home.newsletterPlaceholder}
                className="h-11 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                required
              />
              <Button
                type="submit"
                className="h-11 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {dict.home.newsletterButton}
              </Button>
            </form>

            <p className="text-xs text-primary-foreground/60">
              {dict.home.newsletterDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
