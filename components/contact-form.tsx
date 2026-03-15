"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  labels: {
    formTitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSend: string;
    formSuccess: string;
  };
}

export function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // mock submit delay
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
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
              type="text"
              required
              placeholder={labels.formName}
              className="border-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              {labels.formEmail}
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder={labels.formEmail}
              className="border-input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              {labels.formSubject}
            </label>
            <Input
              id="subject"
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
              rows={5}
              required
              placeholder={labels.formMessage}
              className="border-input"
            />
          </div>
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
        </form>
      </CardContent>
    </Card>
  );
}
