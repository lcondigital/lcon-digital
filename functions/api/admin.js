function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="LCON DIGITAL Admin", charset="UTF-8"' }
  });
}

function authorized(request, env) {
  if (!env.ADMIN_USER || !env.ADMIN_PASSWORD) return false;
  const value = request.headers.get("Authorization") || "";
  if (!value.startsWith("Basic ")) return false;
  try {
    const decoded = atob(value.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return false;
    return decoded.slice(0, separator) === env.ADMIN_USER && decoded.slice(separator + 1) === env.ADMIN_PASSWORD;
  } catch { return false; }
}

export async function onRequestPost({ request, env }) {
  if (!authorized(request, env)) return unauthorized();
  if (!env.DB) return new Response("D1 database is not configured.", { status: 503 });
  await env.DB.prepare(`DELETE FROM page_views WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
  await env.DB.prepare(`DELETE FROM contacts WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
  return Response.json({ ok: true });
}
