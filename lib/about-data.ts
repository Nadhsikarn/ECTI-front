export interface BoardMember {
  id: number;
  name: string;
  name_en: string;
  role: string;
  role_en: string;
  institution: string;
  institution_en: string;
  committee: "exec" | "academic" | "publications";
  image: { url: string } | null;
}

export async function getBoardMembers(): Promise<BoardMember[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/abouts?populate=image`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) return [];

  const json = await res.json();

  return json.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    name_en: item.name_en,
    role: item.role,
    role_en: item.role_en,
    institution: item.institution,
    institution_en: item.institution_en,
    committee: item.committee,
    image: item.image ?? null,
  }));
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
}

export async function getMilestones(): Promise<Milestone[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/milestones?sort=year:asc`,
    { next: { revalidate: 0 } }
  );
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.map((item: any) => ({
    id: item.id,
    year: item.year,
    title: item.title,
    title_en: item.title_en,
    description: item.description,
    description_en: item.description_en,
  }));
}

export interface AboutCard {
  id: number;
  title_th: string;
  title_en: string;
  description_th: string;
  description_en: string;
}

export async function getMissionVisionCards(): Promise<AboutCard[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mission-vision?populate=cards`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const data = json.data;
    const cards = data?.cards ?? data?.attributes?.cards ?? [];
    return cards.map((item: any) => ({
      id: item.id,
      title_th: item.title_th ?? "",
      title_en: item.title_en ?? "",
      description_th: item.description_th ?? "",
      description_en: item.description_en ?? "",
    }));
  } catch (error) {
    console.error("Error fetching mission-vision cards:", error);
    return [];
  }
}

export interface ObjectiveItem {
  id: number;
  text_th: string;
  text_en: string;
}

export async function getObjectives(): Promise<ObjectiveItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/objective?populate=items`,
      { next: { revalidate: 0 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    const data = json.data;
    const items = data?.items ?? data?.attributes?.items ?? [];
    return items.map((item: any) => ({
      id: item.id,
      text_th: item.text_th ?? "",
      text_en: item.text_en ?? "",
    }));
  } catch (error) {
    console.error("Error fetching objectives:", error);
    return [];
  }
}