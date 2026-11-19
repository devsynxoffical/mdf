import { NextResponse } from "next/server";

/**
 * Strategy-call requests from /book.
 * Forwards the lead as JSON to LEAD_WEBHOOK_URL (e.g. a GoHighLevel inbound
 * webhook, Zapier or Make). Without that variable it answers 503 and the form
 * falls back to the visitor's email app, so no lead is silently lost.
 */
const FIELDS = ["name", "email", "phone", "business", "niche", "revenue", "bottleneck", "slot", "notes", "page", "referrer"] as const;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  // Honeypot: bots fill hidden fields; accept silently and drop.
  if (typeof data.company_site === "string" && data.company_site.trim()) return NextResponse.json({ ok: true });

  const lead: Record<string, string> = {};
  for (const k of FIELDS) lead[k] = String(data[k] ?? "").slice(0, 2000).trim();
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...lead, source: "milliondollarfunnels.us/book", submittedAt: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("lead webhook failed", e);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
