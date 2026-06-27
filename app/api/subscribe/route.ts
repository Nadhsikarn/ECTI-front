import { NextResponse } from "next/server";

const STRAPI_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337").replace(/\/+$/, "");
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const locale = body.locale === "en" ? "en" : "th";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!STRAPI_API_TOKEN) {
    console.error("subscribe: STRAPI_API_TOKEN is not set");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  let res: Response;
  try {
    res = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: { email, language: locale } }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("subscribe: cannot reach Strapi", err);
    return NextResponse.json({ error: "server_error" }, { status: 502 });
  }

  if (res.ok) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // Strapi returns 400 for both validation and unique-constraint violations;
  // inspect the message to tell a duplicate email apart from other failures.
  if (res.status === 400) {
    const data = await res.json().catch(() => null);
    const msg = JSON.stringify(data ?? "").toLowerCase();
    if (msg.includes("unique") || msg.includes("already")) {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const detail = await res.text().catch(() => "");
  console.error("subscribe: strapi error", res.status, detail);
  return NextResponse.json({ error: "server_error" }, { status: 502 });
}
