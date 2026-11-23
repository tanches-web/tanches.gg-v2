// Shared form sender, ported from the source SiteNav (window.tgSend / tgFields / tgFormName / tgTrackLead / tgFormFail).
// Posts to Netlify Forms at '/'. URL-encoded, or multipart when files are attached. On failure a notice offers a
// pre-filled email so a lead is never lost silently.

export type Payload = Record<string, string>;

export const tgFormName = (p: Payload) =>
  p && p.Form
    ? String(p.Form).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : /^assessment/i.test((p && p._subject) || '') ? 'assessment' : 'contact';

export const tgFields = (p: Payload) => {
  const pick = (...ks: string[]) => { for (const k of ks) if (p[k] && !/^\(not provided\)$/.test(p[k])) return String(p[k]); return ''; };
  return {
    name: pick('Full name', 'Name'), email: pick('_replyto', 'Work email', 'Email'), organization: pick('Organization', 'School or organization'), phone: pick('Phone', 'Phone number'),
    subject: pick('_subject'), page: pick('Page') || location.href,
    details: Object.keys(p).filter((k) => k[0] !== '_').map((k) => k + ': ' + p[k]).join('\n'),
  };
};

export const tgTrackLead = (form: string) => {
  const w = window as any;
  try {
    if (w.gtag) w.gtag('event', 'generate_lead', { form_name: form });
    if (w.fbq) w.fbq('track', 'Lead', { content_name: form });
    if (w.lintrk && w.TG_LI_LEAD) w.lintrk('track', { conversion_id: Number(w.TG_LI_LEAD) });
  } catch {}
};

export const mailtoFor = (payload: Payload) => {
  const lines = Object.keys(payload || {}).filter((k) => k[0] !== '_').map((k) => k + ': ' + payload[k]).join('\n');
  return 'mailto:contact@tanches.gg?subject=' + encodeURIComponent((payload && payload._subject) || 'Website inquiry') + '&body=' + encodeURIComponent(lines.slice(0, 1800));
};

export const tgFormFail = (payload: Payload) => {
  document.getElementById('tg-form-fail')?.remove();
  const box = document.createElement('div');
  box.id = 'tg-form-fail';
  box.setAttribute('role', 'alert');
  box.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999;width:min(calc(100% - 32px),520px);display:flex;flex-direction:column;gap:10px;padding:18px 20px;border-radius:18px;background:var(--surface);color:var(--ink);border:1px solid var(--line-2);box-shadow:var(--shadow-float);font:15px/1.5 var(--font);';
  const t = document.createElement('strong'); t.textContent = 'Your message didn’t go through.'; t.style.cssText = 'font-size:16px;font-weight:660';
  const b = document.createElement('span'); b.textContent = 'Please email us at contact@tanches.gg or call (281) 826-2437. Your details are ready to send.'; b.style.color = 'var(--ink-2)';
  const row = document.createElement('span'); row.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;margin-top:4px';
  const a = document.createElement('a'); a.className = 'btn btn-primary btn-sm'; a.href = mailtoFor(payload); a.textContent = 'Email it instead';
  const c = document.createElement('button'); c.type = 'button'; c.className = 'btn btn-ghost btn-sm'; c.textContent = 'Close';
  c.onclick = () => box.remove();
  row.append(a, c); box.append(t, b, row);
  document.body.appendChild(box);
};

/** Send a payload to Netlify. extra: additional named fields (sent as-is). files: [field, Blob, fileName]. */
export function tgSend(payload: Payload, opts: { files?: [string, Blob, string][]; extra?: Record<string, string>; silent?: boolean } = {}) {
  const fields: Record<string, string> = Object.assign({ 'form-name': tgFormName(payload), 'bot-field': '' }, tgFields(payload || {}), opts.extra || {});
  const files = (opts.files || []).filter((f) => f && f[1]);
  let req: RequestInit;
  if (files.length) {
    const fd = new FormData();
    Object.keys(fields).forEach((k) => fd.append(k, fields[k]));
    files.forEach((f) => fd.append(f[0], f[1], f[2]));
    req = { method: 'POST', body: fd };
  } else {
    req = { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fields).toString() };
  }
  return fetch('/', req)
    .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status + (r.status === 404 ? ' (turn on form detection in Netlify and redeploy)' : '')); return r; })
    .then((r) => { tgTrackLead(fields['form-name']); return r; })
    .catch((err) => { console.warn('[TANCHES.GG] form not sent:', err && err.message); if (!opts.silent) { try { tgFormFail(payload); } catch {} } throw err; });
}
