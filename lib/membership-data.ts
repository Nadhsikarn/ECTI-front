const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

export interface Benefit {
  id: number;
  Benefit: string;
}

export interface HowtoJoin {
  id: number;
  title: string;
  description: string;
  step: string;
  iconUrl: string | null;
}

export interface MemberType {
  id: number;
  Type: string;
  Eligibility: string;
  AnnualFee: number;
  LifetimeFee: number;
  iconUrl: string | null;
}

export interface Question {
  id: number;
  Questions: string;
  answer: string;
}

// Fetch helper
async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
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

export async function fetchBenefits(): Promise<Benefit[]> {
  const data = await fetchAPI("/api/benefits");
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    Benefit: item.Benefit || "",
  }));
}

export async function fetchHowToJoins(): Promise<HowtoJoin[]> {
  const data = await fetchAPI("/api/howto-joins?populate=*");
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    step: item.step || "",
    iconUrl: item.icon?.url ? `${BASE_URL}${item.icon.url}` : null,
  }));
}

export async function fetchMemberTypes(): Promise<MemberType[]> {
  const data = await fetchAPI("/api/member-type?populate=*");
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    Type: item.Type || "",
    Eligibility: item.Eligibility || "",
    AnnualFee: item.AnnualFee || 0,
    LifetimeFee: item.LifetimeFee || 0,
    iconUrl: item.icon?.url ? `${BASE_URL}${item.icon.url}` : null,
  }));
}

export async function fetchQuestions(): Promise<Question[]> {
  const data = await fetchAPI("/api/questions");
  if (!data || !Array.isArray(data)) return [];
  return data.map((item: any) => ({
    id: item.id,
    Questions: item.Questions || "",
    answer: item.answer || "",
  }));
}
