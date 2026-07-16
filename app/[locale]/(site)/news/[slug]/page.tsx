import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  CalendarDays,
  Tag,
} from "lucide-react";
import {
  getNewsPosts,
  getNewsPostBySlug,
  getRelatedPosts,
} from "@/lib/news-data";
import { NewsShareButton } from "@/components/news-share-button";
import { getTagLabel, getTagStyle } from "@/components/news-card";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getNewsPosts("th");
  return posts.flatMap((post) => [
    { locale: "th", slug: post.slug },
    { locale: "en", slug: post.slug },
  ]);
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = await getNewsPostBySlug(slug, locale);
  if (!post) return {};
  const dict = getDictionary(locale as Locale);
  return {
    title: `${post.title} | ${dict.news.title}`,
    description: post.summary,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = await getNewsPostBySlug(slug, locale);
  if (!post) notFound();

  const dict = getDictionary(locale as Locale);
  const isTh = locale === "th";

  const title = post.title;
  const summary = post.summary;
  const body = post.body;
  const date = new Date(post.date).toLocaleDateString(
    isTh ? "th-TH" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const relatedPosts = await getRelatedPosts(post.slug, post.tags, 3, locale);

  return (
    <>
      <PageHeader
        locale={locale as Locale}
        title={title}
        description={summary}
        homeLabel={dict.nav.home}
        breadcrumbs={[
          { label: dict.news.title, href: `/${locale}/news` },
          { label: title.length > 40 ? title.slice(0, 40) + "..." : title },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <Link
          href={`/${locale}/news`}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.news.backToNews}
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={`text-xs font-medium ${getTagStyle(tag)}`}>
                  {getTagLabel(tag, dict)}
                </Badge>
              ))}
            </div>

            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-primary" />
                {dict.news.publishedOn} {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                {post.readTimeMin} {dict.news.minRead}
              </span>
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  {post.author}
                </span>
              )}
            </div>

            <div className="prose prose-sm max-w-none">
              <RichTextRenderer blocks={body} />
            </div>

            <Separator className="my-8" />

            <NewsShareButton
              label={dict.news.shareArticle}
              copiedLabel={dict.news.copied}
            />
          </article>

          <aside className="flex flex-col gap-6">
            <Card className="border-primary/20">
              <CardHeader className="rounded-t-lg bg-primary/5">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4 text-primary" />
                  {dict.news.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {dict.news.publishedOn}
                    </span>
                    <span className="text-sm text-card-foreground">{date}</span>
                  </div>
                  <Separator />
                  {post.author && (
                    <>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                          {dict.news.author}
                        </span>
                        <span className="text-sm text-card-foreground">{post.author}</span>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">Tags</span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={`text-[10px] ${getTagStyle(tag)}`}>
                          {getTagLabel(tag, dict)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {relatedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{dict.news.relatedPosts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {relatedPosts.map((related, i) => {
                      const relTitle = related.title;
                      const relDate = new Date(related.date).toLocaleDateString(
                        isTh ? "th-TH" : "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      );
                      return (
                        <div key={related.slug}>
                          <Link href={`/${locale}/news/${related.slug}`} className="group/related flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground">{relDate}</span>
                            <span className="text-sm font-medium leading-snug text-card-foreground group-hover/related:text-primary transition-colors line-clamp-2">
                              {relTitle}
                            </span>
                            <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                              {dict.common.readMore}
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </Link>
                          {i < relatedPosts.length - 1 && <Separator className="mt-3" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}