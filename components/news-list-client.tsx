"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Newspaper,
  SortAsc,
  SortDesc,
  Tag,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsPost, NewsTag } from "@/lib/news-data";
import type { Dictionary, Locale } from "@/lib/i18n";

interface NewsListClientProps {
  locale: Locale;
  dict: Dictionary;
  posts: NewsPost[];
}

const POSTS_PER_PAGE = 6;

function getTagLabel(tag: NewsTag, dict: Dictionary): string {
  const map: Record<NewsTag, string> = {
    announcements: dict.news.tagAnnouncements,
    cfp: dict.news.tagCfp,
    awards: dict.news.tagAwards,
    publications: dict.news.tagPublications,
    community: dict.news.tagCommunity,
  };
  return map[tag];
}

function getTagStyle(tag: NewsTag): string {
  switch (tag) {
    case "announcements":
      return "bg-primary/10 text-primary border-primary/20";
    case "cfp":
      return "bg-accent/10 text-accent border-accent/20";
    case "awards":
      return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    case "publications":
      return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    case "community":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20";
  }
}

export function NewsListClient({
  locale,
  dict,
  posts,
}: NewsListClientProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<NewsTag | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const isTh = locale === "th";

  const allTags: NewsTag[] = [
    "announcements",
    "cfp",
    "awards",
    "publications",
    "community",
  ];

  const filtered = useMemo(() => {
    let result = [...posts];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const title = isTh ? p.title_th : p.title_en;
        const summary = isTh ? p.summary_th : p.summary_en;
        return (
          title.toLowerCase().includes(q) ||
          summary.toLowerCase().includes(q)
        );
      });
    }

    // Tag filter
    if (activeTag !== "all") {
      result = result.filter((p) => p.tags.includes(activeTag));
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, search, activeTag, sortOrder, isTh]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const hasActiveFilters = search.trim() !== "" || activeTag !== "all";

  function clearFilters() {
    setSearch("");
    setActiveTag("all");
    setVisibleCount(POSTS_PER_PAGE);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:p-6">
        {/* Search + sort row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={dict.news.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSortOrder((prev) =>
                prev === "newest" ? "oldest" : "newest"
              )
            }
            className="gap-1.5 shrink-0"
          >
            {sortOrder === "newest" ? (
              <SortDesc className="h-4 w-4" />
            ) : (
              <SortAsc className="h-4 w-4" />
            )}
            {sortOrder === "newest" ? dict.news.sortNewest : dict.news.sortOldest}
          </Button>
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={activeTag === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveTag("all");
              setVisibleCount(POSTS_PER_PAGE);
            }}
            className="h-8 rounded-full text-xs"
          >
            {dict.news.tagAll}
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveTag(tag);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className="h-8 rounded-full text-xs"
            >
              {getTagLabel(tag, dict)}
            </Button>
          ))}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              {dict.news.clearFilters}
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {dict.news.showing} {Math.min(visibleCount, filtered.length)} {dict.news.of}{" "}
        {filtered.length} {dict.news.articles}
      </p>

      {/* News cards */}
      {visible.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <NewsCard key={post.slug} post={post} locale={locale} dict={dict} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                className="gap-2"
              >
                {dict.news.loadMore}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <Newspaper className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold text-foreground">
            {dict.news.noResults}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {dict.news.noResultsDesc}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
            {dict.news.clearFilters}
          </Button>
        </div>
      )}
    </div>
  );
}

/* ---- Skeleton loader ---- */
export function NewsListSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:p-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border border-border p-5">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Individual News Card ---- */
function NewsCard({
  post,
  locale,
  dict,
}: {
  post: NewsPost;
  locale: Locale;
  dict: Dictionary;
}) {
  const isTh = locale === "th";
  const title = isTh ? post.title_th : post.title_en;
  const summary = isTh ? post.summary_th : post.summary_en;
  const date = post.date
  ? new Date(post.date).toLocaleDateString(
      isTh ? "th-TH" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    )
  : "";

  return (
    <Card className="group flex flex-col border-border transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-[10px] font-medium ${getTagStyle(tag)}`}
            >
              {getTagLabel(tag, dict)}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <Link href={`/${locale}/news/${post.slug}`} className="group/link">
          <h3 className="text-base font-semibold leading-snug text-card-foreground group-hover/link:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {summary}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            {post.readTimeMin} {dict.news.minRead}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          )}
        </div>

        {/* Read more link */}
        <Link
          href={`/${locale}/news/${post.slug}`}
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {dict.common.readMore}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
