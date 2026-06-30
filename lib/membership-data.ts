const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

export interface Benefit {
  id: number;
  description: string;
}

export interface HowtoJoin {
  id: number;
  title: string;
  description: string;
  order: number;
  iconUrl: string | null;
}

export interface MemberType {
  id: number;
  type: string;
  eligibility: string;
  annual_fee: number;
  lifetime_fee: number;
  iconUrl: string | null;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
}

// Fetch helper
async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
        return null;
    }
    const json = await res.json();
    return json?.data || [];
  } catch (err) {
    return [];
  }
}

export async function fetchBenefits(locale: string): Promise<Benefit[]> {
  const data = await fetchAPI(`/api/benefits?locale=${locale}`);
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    description: item.description || "",
  }));
}

export async function fetchHowToJoins(locale: string): Promise<HowtoJoin[]> {
  const data = await fetchAPI(`/api/howto-joins?populate=*&locale=${locale}`);
  if (!data || !Array.isArray(data)) return [];
  return data
    .map((item: any) => ({
      id: item.id,
      title: item.title || "",
      description: item.description || "",
      order: item.order ?? 0,
      iconUrl: item.icon?.url ? `${BASE_URL}${item.icon.url}` : null,
    }))
    .sort((a: HowtoJoin, b: HowtoJoin) => a.order - b.order);
}

export async function fetchMemberTypes(locale: string): Promise<MemberType[]> {
  const data = await fetchAPI(`/api/member-types?populate=*&locale=${locale}`);
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    type: item.type || "",
    eligibility: item.eligibility || "",
    annual_fee: item.annual_fee || 0,
    lifetime_fee: item.lifetime_fee || 0,
    iconUrl: item.icon?.url ? `${BASE_URL}${item.icon.url}` : null,
  }));
}

export async function fetchQuestions(locale: string): Promise<Question[]> {
  const data = await fetchAPI(`/api/questions?locale=${locale}`);
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    question: item.question || "",
    answer: item.answer || "",
  }));
}
