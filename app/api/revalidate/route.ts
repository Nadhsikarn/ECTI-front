import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Strapi webhook target. Configure Strapi to POST here (with the shared secret in
// the `x-webhook-secret` header) on any content publish/update/delete. We
// revalidate the root layout so every page rebuilds with fresh CMS data on the
// next visit — keeping the site current without waiting for the fetch revalidate
// TTL (lib/*-data.ts fetches cache for 1h as a fallback).
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret');
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
