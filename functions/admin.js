const RETENTION_DAYS = 90;

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
    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return user === env.ADMIN_USER && password === env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fmtDate(value) {
  if (!value) return "—";
  try { return new Intl.DateTimeFormat("pt-PT", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Lisbon" }).format(new Date(value)); }
  catch { return esc(value); }
}

export async function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return unauthorized();
  if (!env.DB) return new Response("D1 database is not configured.", { status: 503 });

  await env.DB.prepare(`DELETE FROM page_views WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
  await env.DB.prepare(`DELETE FROM contacts WHERE datetime(created_at) < datetime('now', '-90 days')`).run();

  const [summary, countries, recentViews, contacts] = await Promise.all([
    env.DB.prepare(`
      SELECT
        (SELECT COUNT(*) FROM page_views WHERE datetime(created_at) >= datetime('now','-30 days')) AS views_30d,
        (SELECT COUNT(DISTINCT ip) FROM page_views WHERE datetime(created_at) >= datetime('now','-30 days')) AS visitors_30d,
        (SELECT COUNT(*) FROM contacts WHERE datetime(created_at) >= datetime('now','-30 days')) AS contacts_30d,
        (SELECT COUNT(*) FROM page_views) AS stored_views,
        (SELECT COUNT(*) FROM contacts) AS stored_contacts
    `).first(),
    env.DB.prepare(`
      SELECT COALESCE(country, '—') AS country, COUNT(*) AS visits
      FROM page_views
      GROUP BY country
      ORDER BY visits DESC
      LIMIT 20
    `).all(),
    env.DB.prepare(`
      SELECT created_at, ip, country, city, region, path, language, referrer, user_agent
      FROM page_views ORDER BY created_at DESC LIMIT 100
    `).all(),
    env.DB.prepare(`
      SELECT created_at, name, company, email, service, message, ip, country, city, region, email_status
      FROM contacts ORDER BY created_at DESC LIMIT 100
    `).all()
  ]);

  const countryRows = (countries.results || []).map(r => `<tr><td>${esc(r.country)}</td><td>${esc(r.visits)}</td></tr>`).join("");
  const viewRows = (recentViews.results || []).map(r => `
    <tr><td>${fmtDate(r.created_at)}</td><td>${esc(r.ip)}</td><td>${esc([r.city, r.region, r.country].filter(Boolean).join(", ") || "—")}</td><td>${esc(r.path)}</td><td>${esc(r.language)}</td><td>${esc(r.referrer || "—")}</td></tr>
  `).join("");
  const contactRows = (contacts.results || []).map(r => `
    <tr><td>${fmtDate(r.created_at)}</td><td>${esc(r.name)}</td><td>${esc(r.company || "—")}</td><td><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></td><td>${esc(r.service || "—")}</td><td>${esc(r.message)}</td><td>${esc(r.ip)}</td><td>${esc([r.city, r.region, r.country].filter(Boolean).join(", ") || "—")}</td><td>${esc(r.email_status || "—")}</td></tr>
  `).join("");

  const s = summary || {};
  return new Response(`<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>LCON DIGITAL — Área privada</title>
<style>
:root{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#0b2433;background:#f5f8f8}*{box-sizing:border-box}body{margin:0}.top{background:#0b2b3a;color:#fff;padding:24px 32px;display:flex;justify-content:space-between;align-items:center}.top strong{letter-spacing:.08em}.wrap{max-width:1500px;margin:0 auto;padding:28px 24px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.card{background:#fff;border:1px solid #d9e2e4;border-radius:14px;padding:20px}.label{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#2c8a6d;font-weight:800}.value{font-size:32px;font-weight:800;margin-top:8px}.grid{display:grid;grid-template-columns:1fr 2fr;gap:20px;margin-top:20px}.panel{background:#fff;border:1px solid #d9e2e4;border-radius:14px;padding:20px;overflow:hidden}.panel h2{margin-top:0}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px}th,td{padding:10px;border-bottom:1px solid #e4eaeb;text-align:left;vertical-align:top}th{background:#f3f7f7;position:sticky;top:0;white-space:nowrap}td{max-width:420px;word-break:break-word}a{color:#1677a8}.note{color:#647985;font-size:13px}.full{margin-top:20px}.pill{display:inline-block;padding:4px 8px;border-radius:99px;background:#e7f5ef;color:#267b61;font-weight:700;font-size:12px}@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}.grid{grid-template-columns:1fr}.top{padding:20px}.wrap{padding:20px 14px}}@media(max-width:560px){.cards{grid-template-columns:1fr 1fr}.value{font-size:25px}}
</style></head>
<body><header class="top"><div><strong>LCON DIGITAL</strong><div class="note" style="color:#b9cbd1;margin-top:5px">Área privada · dados dos últimos ${RETENTION_DAYS} dias</div></div><a href="/" style="color:#fff">Ver site →</a></header>
<main class="wrap">
<div class="cards">
<div class="card"><div class="label">Visitas · 30 dias</div><div class="value">${esc(s.views_30d || 0)}</div></div>
<div class="card"><div class="label">Visitantes únicos · 30 dias</div><div class="value">${esc(s.visitors_30d || 0)}</div></div>
<div class="card"><div class="label">Contactos · 30 dias</div><div class="value">${esc(s.contacts_30d || 0)}</div></div>
<div class="card"><div class="label">Registos armazenados</div><div class="value">${esc(s.stored_views || 0)} <span class="note">visitas</span></div><div class="note">${esc(s.stored_contacts || 0)} contactos</div></div>
</div>
<div class="grid">
<section class="panel"><h2>Origem por país</h2><p class="note">Localização aproximada obtida através do Cloudflare.</p><div class="table-wrap"><table><thead><tr><th>País</th><th>Visitas</th></tr></thead><tbody>${countryRows || '<tr><td colspan="2">Ainda sem dados.</td></tr>'}</tbody></table></div></section>
<section class="panel"><h2>Acessos recentes</h2><p class="note">IP, localização aproximada, página e origem da visita.</p><div class="table-wrap"><table><thead><tr><th>Data</th><th>IP</th><th>Localização</th><th>Página</th><th>Idioma</th><th>Referrer</th></tr></thead><tbody>${viewRows || '<tr><td colspan="6">Ainda sem acessos registados.</td></tr>'}</tbody></table></div></section>
</div>
<section class="panel full"><h2>Contactos recebidos</h2><p class="note">Inclui a localização aproximada e IP associado ao pedido de contacto.</p><div class="table-wrap"><table><thead><tr><th>Data</th><th>Nome</th><th>Empresa</th><th>Email</th><th>Serviço</th><th>Mensagem</th><th>IP</th><th>Localização</th><th>Email</th></tr></thead><tbody>${contactRows || '<tr><td colspan="9">Ainda sem contactos.</td></tr>'}</tbody></table></div></section>
<p class="note" style="margin-top:20px">Os registos são mantidos por um máximo de ${RETENTION_DAYS} dias e destinam-se a segurança, gestão do site e análise de utilização. A geolocalização por IP é aproximada.</p>
</main></body></html>`, { headers: { "Content-Type": "text/html; charset=UTF-8", "Cache-Control": "no-store" } });
}
