import { getNewsPosts } from "@/lib/news-data";
import { NewsCard } from "@/components/news-card";
import type { Dictionary, Locale } from "@/lib/i18n";

interface FeaturedUpdatesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export async function FeaturedUpdatesSection({ locale, dict }: FeaturedUpdatesSectionProps) {
  const posts = await getNewsPosts(locale);
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            {dict.home.sectionUpdates}
          </h2>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <NewsCard key={post.slug} post={post} locale={locale} dict={dict} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
            <p className="text-sm text-muted-foreground">{dict.news.noResults}</p>
          </div>
        )}
      </div>
    </section>
  );
}
