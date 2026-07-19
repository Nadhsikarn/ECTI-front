import { absoluteMediaUrl } from "@/lib/strapi-media";
import { locales } from "@/lib/i18n";

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

export interface NewsAttachment {
  id: number;
  title: string;
  fileUrl: string | null; // uploaded file URL, or the external link fallback
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
  coverImage: string | null; // resolved absolute URL, or null when unset
  attachments: NewsAttachment[]; // downloadable files; only populated on the detail fetch
}

function mapNewsPost(item: any): NewsPost {
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
    coverImage: item.cover_image?.url ? absoluteMediaUrl(item.cover_image.url) : null,
    attachments: (item.attachments ?? [])
      .map((att: any) => ({
        id: att.id,
        title: att.title ?? "",
        // Prefer the uploaded file (Strapi media), fall back to an external link.
        fileUrl: att.file?.url
          ? absoluteMediaUrl(att.file.url)
          : (typeof att.link === "string" && att.link.trim() ? att.link.trim() : null),
      }))
      .filter((a: NewsAttachment) => a.fileUrl), // hide rows with neither file nor link
  };
}

// A published post can exist in only some locales (ECTI news is often authored in
// a single language). Fetch one locale's rows; callers merge across locales so a
// post never disappears / 404s just because it wasn't translated.
async function fetchNewsRows(locale: string): Promise<any[]> {
  const res = await fetch(
    `${BASE_URL}/api/news-posts?populate[tags]=true&populate[cover_image]=true&sort=publishedAt:desc&locale=${locale}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data ?? []).filter((item: any) => item.slug); // skip entries with no slug
}

// Same post shares a documentId across locales (and the slug is non-localized too).
function postKey(item: any): string {
  return item.documentId ?? item.slug;
}

export async function getNewsPosts(locale: string): Promise<NewsPost[]> {
  // Prefer the requested locale, then add posts that only exist in another locale.
  const primary = await fetchNewsRows(locale);
  const seen = new Set(primary.map(postKey));

  const otherLocales = locales.filter((l) => l !== locale);
  const fallbackRows = (await Promise.all(otherLocales.map(fetchNewsRows))).flat();

  const merged = [...primary];
  for (const row of fallbackRows) {
    const key = postKey(row);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(row);
    }
  }

  return merged
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.createdAt ?? 0).getTime() -
        new Date(a.publishedAt ?? a.createdAt ?? 0).getTime()
    )
    .map(mapNewsPost);
}

export async function getNewsPostBySlug(slug: string, locale: string): Promise<NewsPost | undefined> {
  // Try the requested locale first, then fall back to any locale that has the post.
  const tryLocales = [locale, ...locales.filter((l) => l !== locale)];
  for (const loc of tryLocales) {
    const res = await fetch(
      `${BASE_URL}/api/news-posts?filters[slug][$eq]=${slug}&populate[tags]=true&populate[cover_image]=true&populate[attachments][populate][file]=true&locale=${loc}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) continue;
    const json = await res.json();
    if (json.data?.length) return mapNewsPost(json.data[0]);
  }
  return undefined;
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
