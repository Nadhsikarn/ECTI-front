const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

export interface BoardMember {
  id: number;
  name: string;
  role: string;
  institution: string;
  committee: "exec" | "academic" | "publications";
  image: { url: string } | null;
}

export async function getBoardMembers(locale: string): Promise<BoardMember[]> {
  const res = await fetch(
    `${BASE_URL}/api/board-members?populate=image&locale=${locale}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const json = await res.json();

  return json.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    institution: item.institution,
    committee: item.committee,
    image: item.image ?? null,
  }));
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
}

export async function getMilestones(locale: string): Promise<Milestone[]> {
  const res = await fetch(
    `${BASE_URL}/api/milestones?sort=year:asc&locale=${locale}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map((item: any) => ({
    id: item.id,
    year: String(item.year),
    title: item.title,
    description: item.description,
  }));
}

export interface AboutCard {
  id: number;
  title: string;
  description: string;
}

export async function getMissionVisionCards(locale: string): Promise<AboutCard[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/mission-vision?populate=cards&locale=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const data = json.data;
    const cards = data?.cards ?? data?.attributes?.cards ?? [];
    return cards.map((item: any) => ({
      id: item.id,
      title: item.title ?? "",
      description: item.description ?? "",
    }));
  } catch (error) {
    console.error("Error fetching mission-vision cards:", error);
    return [];
  }
}

export interface ObjectiveItem {
  id: number;
  text: string;
}

export async function getObjectives(locale: string): Promise<ObjectiveItem[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/objective?populate=items&locale=${locale}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const data = json.data;
    const items = data?.items ?? data?.attributes?.items ?? [];
    return items.map((item: any) => ({
      id: item.id,
      text: item.text ?? "",
    }));
  } catch (error) {
    console.error("Error fetching objectives:", error);
    return [];
  }
}
