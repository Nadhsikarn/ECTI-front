import { getDictionary, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  CalendarDays,
  Share2,
  Tag,
} from "lucide-react";
import {
  getNewsPosts,
  getNewsPostBySlug,
  getRelatedPosts,
} from "@/lib/news-data";
import type { NewsTag } from "@/lib/news-data";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.flatMap((post) => [
    { locale: "th", slug: post.slug },
    { locale: "en", slug: post.slug },
  ]);
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = await getNewsPostBySlug(slug);
  if (!post) return {};
  const isTh = locale === "th";
  const dict = getDictionary(locale as Locale);
  return {
    title: `${isTh ? post.title_th : post.title_en} | ${dict.news.title}`,
    description: isTh ? post.summary_th : post.summary_en,
  };
}

function getTagLabel(tag: NewsTag, dict: ReturnType<typeof getDictionary>): string {
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
    case "announcements": return "bg-primary/10 text-primary border-primary/20";
    case "cfp": return "bg-accent/10 text-accent border-accent/20";
    case "awards": return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    case "publications": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    case "community": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
  }
}

// Rich text blocks renderer
function RichTextRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-4 text-sm leading-relaxed text-foreground/90">
                {block.children?.map((child: any, j: number) => (
                  <span
                    key={j}
                    className={`${child.bold ? "font-semibold" : ""} ${child.italic ? "italic" : ""} ${child.underline ? "underline" : ""}`}
                  >
                    {child.text}
                  </span>
                ))}
              </p>
            );
          case "heading":
            return (
              <h3 key={i} className="mt-6 mb-2 text-base font-semibold text-foreground">
                {block.children?.map((child: any) => child.text).join("")}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="mb-4 flex flex-col gap-1">
                {block.children?.map((item: any, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item.children?.map((child: any) => child.text).join("")}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  const dict = getDictionary(locale as Locale);
  const isTh = locale === "th";

  const title = isTh ? post.title_th : post.title_en;
  const summary = isTh ? post.summary_th : post.summary_en;
  const body = isTh ? post.body : post.body_en;
  const date = new Date(post.date).toLocaleDateString(
    isTh ? "th-TH" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const relatedPosts = await getRelatedPosts(post.slug, post.tags, 3);

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

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span className="font-medium">{dict.news.shareArticle}</span>
            </div>
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
                      const relTitle = isTh ? related.title_th : related.title_en;
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