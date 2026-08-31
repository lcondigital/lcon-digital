const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return json({ error: "Email service is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = String(body.name || "").trim().slice(0, 200);
  const company = String(body.company || "").trim().slice(0, 200);
  const email = String(body.email || "").trim().slice(0, 200);
  const service = String(body.service || "").trim().slice(0, 100);
  const message = String(body.message || "").trim().slice(0, 3000);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json({ error: "Please complete the required fields." }, 400);
  }

  const cf = request.cf || {};
  const visitorIp = request.headers.get("CF-Connecting-IP") || "unknown";
  const visitorCountry = cf.country || request.headers.get("CF-IPCountry") || null;
  const visitorCity = cf.city || request.headers.get("CF-IPCity") || null;
  const visitorRegion = cf.region || request.headers.get("CF-Region") || null;
  const createdAt = new Date().toISOString();
  let contactId = null;

  if (env.DB) {
    try {
      const existing = await env.DB.prepare(`
        SELECT COUNT(*) AS count FROM contacts WHERE ip = ? AND datetime(created_at) >= datetime('now','-1 hour')
      `).bind(visitorIp).first();
      if (Number(existing?.count || 0) >= 5) {
        return json({ error: "Too many requests. Please try again later." }, 429);
      }

      const inserted = await env.DB.prepare(`
        INSERT INTO contacts (created_at, name, company, email, service, message, ip, country, city, region, email_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'received')
      `).bind(createdAt, name, company || null, email, service || null, message, visitorIp, visitorCountry, visitorCity, visitorRegion).run();
      contactId = inserted.meta?.last_row_id || null;
    } catch (error) {
      console.error("Contact logging error:", error);
    }
  }

  const text = [
    "New contact request from the LCON DIGITAL website",
    "",
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Service: ${service || "—"}`,
    "",
    "Message:",
    message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0b2433">
      <h2 style="margin-bottom:20px">New contact request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service || "—")}</p>
      <hr style="border:0;border-top:1px solid #ddd;margin:24px 0">
      <p><strong>Message</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "LCON DIGITAL <geral@lcon-digital.com>",
      to: ["geral@lcon-digital.com"],
      reply_to: email,
      subject: `Website contact — ${name}`,
      text,
      html
    })
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    console.error("Resend error:", details);
    if (env.DB && contactId) {
      await env.DB.prepare(`UPDATE contacts SET email_status = 'email_failed' WHERE id = ?`).bind(contactId).run();
    }
    return json({ error: "Unable to send your message." }, 502);
  }

  if (env.DB && contactId) {
    await env.DB.prepare(`UPDATE contacts SET email_status = 'sent' WHERE id = ?`).bind(contactId).run();
  }

  if (env.DB && Math.random() < 0.05) {
    await env.DB.prepare(`DELETE FROM page_views WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
    await env.DB.prepare(`DELETE FROM contacts WHERE datetime(created_at) < datetime('now', '-90 days')`).run();
  }

  return json({ ok: true });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
