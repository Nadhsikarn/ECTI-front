import { NextResponse } from "next/server";

// Newsletter signup → Brevo, using Brevo's double opt-in endpoint: it stores the
// address as *unconfirmed* and mails a confirmation link, and only a click on
// that link adds the person to the list. That's what keeps a typo'd or
// maliciously entered address off the list, and it's the consent record we want
// under PDPA. Brevo also appends the unsubscribe link to every campaign.
//
// The API key stays server-side — this route is the only thing that sees it.

const BREVO_API = "https://api.brevo.com/v3";

const API_KEY = process.env.BREVO_API_KEY;
const LIST_ID = Number(process.env.BREVO_LIST_ID);
const DOI_TEMPLATE_ID = Number(process.env.BREVO_DOI_TEMPLATE_ID);
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Names what's missing so a misconfigured deploy says so instead of 500-ing blind. */
function missingConfig(): string[] {
  const missing: string[] = [];
  if (!API_KEY) missing.push("BREVO_API_KEY");
  if (!LIST_ID) missing.push("BREVO_LIST_ID");
  if (!DOI_TEMPLATE_ID) missing.push("BREVO_DOI_TEMPLATE_ID");
  return missing;
}

/**
 * Looks the address up before we ask Brevo to mail anything.
 *
 * Necessary because /contacts/doubleOptinConfirmation answers 204 even for an
 * address that is already a confirmed subscriber — it just mails the
 * confirmation link again. So the "you're already subscribed" case has to be
 * detected here; there is no error response to react to.
 *
 * Fails open: if the lookup itself breaks, we'd rather send a duplicate
 * confirmation than turn a working form into an error for everyone.
 */
async function findContact(email: string): Promise<{ listIds?: number[]; emailBlacklisted?: boolean } | null> {
  try {
    const res = await fetch(`${BREVO_API}/contacts/${encodeURIComponent(email)}`, {
      headers: { "api-key": API_KEY as string, accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 404) return null; // never seen this address
    if (!res.ok) {
      console.error(`subscribe: contact lookup returned ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error("subscribe: contact lookup failed", err);
    return null;
  }
}

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

  const missing = missingConfig();
  if (missing.length > 0) {
    console.error(`subscribe: not configured — missing ${missing.join(", ")}`);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  // Already a confirmed subscriber? Say so instead of mailing them again.
  // Someone who unsubscribed (emailBlacklisted) still gets the confirmation
  // flow — that's them opting back in, and the double opt-in is the record of
  // that consent. Same for a contact who exists but hasn't confirmed yet:
  // re-sending the link is the point.
  const existing = await findContact(email);
  if (existing && existing.listIds?.includes(LIST_ID) && !existing.emailBlacklisted) {
    return NextResponse.json({ error: "duplicate" }, { status: 409 });
  }

  let res: Response;
  try {
    res = await fetch(`${BREVO_API}/contacts/doubleOptinConfirmation`, {
      method: "POST",
      headers: {
        "api-key": API_KEY as string,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        includeListIds: [LIST_ID],
        templateId: DOI_TEMPLATE_ID,
        // Where Brevo sends them after they click confirm — a page that says so
        // plainly, rather than the home page with a toast they can miss.
        redirectionUrl: `${SITE_URL}/${locale}/newsletter/confirmed`,
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("subscribe: cannot reach Brevo", err);
    return NextResponse.json({ error: "server_error" }, { status: 502 });
  }

  // 204 on success — nothing to parse.
  if (res.ok) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const data = await res.json().catch(() => null);
  const code = typeof data?.code === "string" ? data.code : "";
  const message = JSON.stringify(data ?? "").toLowerCase();

  // Already on the list, or already sent a confirmation they haven't clicked.
  if (
    res.status === 400 &&
    (code === "duplicate_parameter" || message.includes("already") || message.includes("exist"))
  ) {
    return NextResponse.json({ error: "duplicate" }, { status: 409 });
  }

  if (res.status === 400 && (code === "invalid_parameter" || message.includes("email"))) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  console.error(
    `subscribe: Brevo returned ${res.status}: ${JSON.stringify(data)}` +
      (res.status === 401 ? " — check BREVO_API_KEY." : "")
  );
  return NextResponse.json({ error: "server_error" }, { status: 502 });
}
