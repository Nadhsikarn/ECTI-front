import Link from "next/link";
import { ArrowRight, Clock, Newspaper, Tag, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsPost, NewsTag } from "@/lib/news-data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function getTagLabel(tag: NewsTag, dict: Dictionary): string {
  const map: Record<NewsTag, string> = {
    announcements: dict.news.tagAnnouncements,
    cfp: dict.news.tagCfp,
    academic: dict.news.tagAcademic,
    training: dict.news.tagTraining,
    article: dict.news.tagArticle,
  };
  return map[tag];
}

export function getTagStyle(tag: NewsTag): string {
  switch (tag) {
    case "announcements":
      return "bg-primary/10 text-primary border-primary/20";
    case "cfp":
      return "bg-accent/10 text-accent border-accent/20";
    case "academic":
      return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    case "training":
      return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    case "article":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20";
  }
}

export function NewsCard({
  post,
  locale,
  dict,
}: {
  post: NewsPost;
  locale: Locale;
  dict: Dictionary;
}) {
  const isTh = locale === "th";
  const title = post.title;
  const summary = post.summary;
  const date = post.date
    ? new Date(post.date).toLocaleDateString(
        isTh ? "th-TH" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <Card className="group flex flex-col gap-0 overflow-hidden border-border pt-0 transition-shadow hover:shadow-lg">
      {/* Cover image (or branded placeholder when a post has none) */}
      <Link
        href={`/${locale}/news/${post.slug}`}
        className="relative block aspect-video w-full overflow-hidden bg-muted"
        aria-label={title}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <Newspaper className="h-9 w-9 text-primary/30" />
          </div>
        )}
      </Link>

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
