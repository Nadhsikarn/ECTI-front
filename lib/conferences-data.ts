const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

export interface Conference {
  id: number;
  title: string;
  description: string;
  years: string[];
}

export async function getConferences(locale: string): Promise<Conference[]> {
  const res = await fetch(
    `${BASE_URL}/api/conferences?sort=order:asc&locale=${locale}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map((item: any) => ({
    id: item.id,
    title: item.title ?? "",
    description: item.description ?? "",
    years: (item.years ?? "")
      .split(",")
      .map((y: string) => y.trim())
      .filter(Boolean),
  }));
}
