/**
 * A small fixed-window rate limiter kept in the server process's memory.
 *
 * Deliberately dependency-free. The thing being protected is Brevo's free
 * quota — 300 confirmation emails a day, shared by everyone who ever wants to
 * subscribe — so the job is to stop a form being hammered, not to withstand a
 * determined attack.
 *
 * What this does NOT do, and it matters: serverless instances are recycled and
 * requests fan out across several of them, so counters are neither shared nor
 * permanent. Someone patient enough to spread requests out, or lucky enough to
 * land on a cold instance, gets a fresh budget. Trading that away buys zero
 * dependencies and zero setup, which is the right trade until real abuse shows
 * up in the logs; the upgrade path is a shared store (Upstash, Vercel KV) and
 * only the guts of this file change.
 */

interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Above this many tracked keys, drop the expired ones before adding more. */
const SWEEP_THRESHOLD = 500;

function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
}

export interface RateLimitResult {
  /** False once the caller has spent its budget for the current window. */
  ok: boolean;
  /** Seconds until the window resets — for the Retry-After header. */
  retryAfter: number;
}

/**
 * Counts one hit against `key` and reports whether it was within `limit` for
 * the current `windowMs`. Calling this *is* the hit; there is no separate
 * consume step, so a rejected request still counts and hammering never resets
 * the clock.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  if (windows.size > SWEEP_THRESHOLD) sweep(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  existing.count += 1;

  return {
    ok: existing.count <= limit,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
