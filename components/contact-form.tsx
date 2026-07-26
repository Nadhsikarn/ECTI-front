"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

// Web3Forms access key routes submissions to the destination inbox. It lives in
// an env var so the org can change the destination email later (make a new key,
// swap this value) without touching code. It's used client-side by design.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

interface ContactFormProps {
  labels: {
    formTitle: string;
    formName: string;
    formEmail: string;
    formContactPlaceholder: string;
    formSubject: string;
    formMessage: string;
    formSend: string;
    formSuccess: string;
    formError: string;
  };
}

export function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget; // capture before await (currentTarget clears after)
    setError(false);
    setSending(true);
    try {
      const formData = new FormData(form);
      formData.append("access_key", ACCESS_KEY ?? "");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <Card className="h-full border-border">
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <p className="max-w-sm leading-relaxed text-foreground">
            {labels.formSuccess}
          </p>
          <Button
            variant="outline"
            className="border-border text-foreground"
            onClick={() => setSubmitted(false)}
          >
            {labels.formSend}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-foreground">{labels.formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              {labels.formName}
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder={labels.formName}
              className="border-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact" className="text-sm font-medium text-foreground">
              {labels.formEmail}
            </label>
            <Input
              id="contact"
              name="contact"
              type="text"
              required
              placeholder={labels.formContactPlaceholder}
              className="border-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              {labels.formSubject}
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder={labels.formSubject}
              className="border-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              {labels.formMessage}
            </label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={labels.formMessage}
              className="border-input"
            />
          </div>

          {/* Honeypot — hidden from humans; bots that tick it get flagged as spam. */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {sending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {labels.formSend}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                {labels.formSend}
              </span>
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {labels.formError}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
