"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slim bar that slides in just below the sticky nav once the reader scrolls
 * past the article hero, so they always know which article they're reading.
 *
 * A zero-height sentinel sits in normal flow right below the hero; an
 * IntersectionObserver (with the nav height as top rootMargin) flips the bar
 * on exactly when that point scrolls under the nav — robust to any hero
 * height. The bar itself is fixed, so it takes no layout space and leaves no
 * gap when hidden.
 */
export function NewsStickyTitle({ title }: { title: string }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      // Shrink the root's top by the sticky nav height (~64px = top-16).
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-0" />
      <div
        aria-hidden={!show}
        className={`fixed inset-x-0 top-16 z-40 border-b border-border bg-card/95 backdrop-blur transition-all duration-200 supports-[backdrop-filter]:bg-card/80 ${
          show
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <p className="truncate text-lg font-semibold text-foreground">
            {title}
          </p>
        </div>
      </div>
    </>
  );
}
