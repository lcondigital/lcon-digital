const RETENTION_DAYS = 90;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}

function getVisitor(request) {
  const cf = request.cf || {};
  return {
    ip: request.headers.get("CF-Connecting-IP") || "unknown",
    country: cf.country || request.headers.get("CF-IPCountry") || null,
    city: cf.city || request.headers.get("CF-IPCity") || null,
    region: cf.region || request.headers.get("CF-Region") || null,
    timezone: cf.timezone || request.headers.get("CF-Timezone") || null
  };
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: "Analytics storage is not configured." }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false }, 400); }

  const path = String(body.path || "/").slice(0, 500);
  const language = String(body.language || "pt").slice(0, 10);
  const referrer = String(body.referrer || "").slice(0, 500) || null;
  const userAgent = request.headers.get("User-Agent")?.slice(0, 500) || null;
  const visitor = getVisitor(request);
  const now = new Date().toISOString();

  // Avoid storing repeated refreshes of the same page from the same IP in a 30-second window.
  const duplicate = await env.DB.prepare(
    `SELECT id FROM page_views WHERE ip = ? AND path = ? AND datetime(created_at) >= datetime('now','-30 seconds') LIMIT 1`
  ).bind(visitor.ip, path).first();
  if (duplicate) return json({ ok: true, stored: false });

  await env.DB.prepare(`
    INSERT INTO page_views (created_at, ip, country, city, region, timezone, path, language, referrer, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(now, visitor.ip, visitor.country, visitor.city, visitor.region, visitor.timezone, path, language, referrer, userAgent).run();

  // Opportunistic retention cleanup; the admin page also performs a full cleanup.
  if (Math.random() < 0.02) {
    await env.DB.prepare(`DELETE FROM page_views WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
    await env.DB.prepare(`DELETE FROM contacts WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
  }

  return json({ ok: true, stored: true });
}
