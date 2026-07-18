const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");

// Strapi returns media URLs relative on a local/self-hosted instance
// (/uploads/…) but absolute on Strapi Cloud (https://…). Prefix the base URL
// only when the URL isn't already absolute, otherwise a Cloud URL gets doubled.
export function absoluteMediaUrl(url: string): string {
  return url.startsWith("http") ? url : `${BASE_URL}${url}`;
}
