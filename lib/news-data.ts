const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

export const NEWS_TAGS = [
  "announcements",
  "cfp",
  "academic",
  "training",
  "article",
] as const;

export type NewsTag = (typeof NEWS_TAGS)[number];

// Drop keys the CMS still holds but the front no longer knows (e.g. a tag whose
// enum value was removed), so a stale key renders nothing instead of a blank badge.
function toNewsTags(raw: any): NewsTag[] {
  return (raw ?? [])
    .map((t: any) => t.key)
    .filter((key: any): key is NewsTag => NEWS_TAGS.includes(key));
}

export interface NewsPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  body: any[];      // Rich text blocks
  date: string;     // ISO date
  tags: NewsTag[];
  author?: string;
  readTimeMin: number;
}

export async function getNewsPosts(locale: string): Promise<NewsPost[]> {
  const res = await fetch(
    `${BASE_URL}/api/news-posts?populate=tags&sort=publishedAt:desc&locale=${locale}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data
    .filter((item: any) => item.slug) // skip entries with no slug (e.g. missing localization)
    .map((item: any) => ({
      id: item.id,
      slug: item.slug,
      title: item.title ?? "",
      summary: item.summary ?? "",
      body: item.body ?? [],
      date: item.publishedAt ?? item.createdAt ?? item.date ?? "",
      tags: toNewsTags(item.tags),
      author: item.author ?? undefined,
      readTimeMin: item.read_time_min ?? 1,
    }));
}

export async function getNewsPostBySlug(slug: string, locale: string): Promise<NewsPost | undefined> {
  const res = await fetch(
    `${BASE_URL}/api/news-posts?filters[slug][$eq]=${slug}&populate=tags&locale=${locale}`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return undefined;
  const json = await res.json();
  if (!json.data?.length) return undefined;
  const item = json.data[0];
  return {
    id: item.id,
    slug: item.slug,
    title: item.title ?? "",
    summary: item.summary ?? "",
    body: item.body ?? [],
    date: item.publishedAt ?? item.createdAt ?? item.date ?? "",
    tags: toNewsTags(item.tags),
    author: item.author ?? undefined,
    readTimeMin: item.read_time_min ?? 1,
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  tags: NewsTag[],
  limit = 3,
  locale: string
): Promise<NewsPost[]> {
  const all = await getNewsPosts(locale);
  return all
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}
