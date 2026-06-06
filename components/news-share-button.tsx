"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface NewsShareButtonProps {
  label: string;
  copiedLabel: string;
}

export function NewsShareButton({ label, copiedLabel }: NewsShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      <span className="font-medium">{copied ? copiedLabel : label}</span>
    </button>
  );
}
