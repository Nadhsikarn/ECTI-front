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
    { next: { revalidate: 3600 } }
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