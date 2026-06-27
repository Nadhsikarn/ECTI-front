"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/lib/i18n";

interface NewsletterSectionProps {
  dict: Dictionary;
}

export function NewsletterSection({ dict }: NewsletterSectionProps) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "th";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success(dict.home.newsletterSuccess);
        setEmail("");
      } else if (res.status === 409 || data?.error === "duplicate") {
        toast.info(dict.home.newsletterDuplicate);
      } else if (res.status === 400 || data?.error === "invalid_email") {
        toast.error(dict.home.newsletterInvalid);
      } else {
        toast.error(dict.home.newsletterError);
      }
    } catch {
      toast.error(dict.home.newsletterError);
    } finally {
      setLoading(false);
    }
  }

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
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {dict.home.newsletterPlaceholder}
              </label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder={dict.home.newsletterPlaceholder}
                className="h-11 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                required
              />
              <Button
                type="submit"
                disabled={loading}
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
