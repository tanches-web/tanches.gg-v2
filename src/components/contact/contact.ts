// Contact page: tabs (message / assessment, #assessment selects the second), prefill from the query string
// (?name ?email ?org ?program ?topic ?tier ?score ?ref ?track, as sent by /Assessment), and the send.
import { tgSend, mailtoFor, type Payload } from '../../lib/tg-send';

const card = document.querySelector<HTMLElement>('[data-ct-card]');
if (card) init(card);

function init(card: HTMLElement) {
  const tabs = [...card.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')!)!);
  const done = card.querySelector<HTMLElement>('[data-done]')!;

  const select = (i: number, focus = false) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; panels[k].hidden = k !== i; });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const n = tabs.length;
      const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
      if (to >= 0) { e.preventDefault(); select(to, true); }
    });
  });
  window.addEventListener('hashchange', () => {
    if (location.hash === '#assessment' && !card.classList.contains('is-sent')) select(1);
  });

  const form = card.querySelector<HTMLFormElement>('[data-ctform]');
  if (!form) return;
  const q = new URLSearchParams(location.search);
  const el = <T extends HTMLElement>(id: string) => form.querySelector<T>('#' + id)!;
  const inName = el<HTMLInputElement>('ct-name'), inEmail = el<HTMLInputElement>('ct-email'), inOrg = el<HTMLInputElement>('ct-org');
  const selProg = el<HTMLSelectElement>('ct-prog'), selTopic = el<HTMLSelectElement>('ct-topic');

  try { const ids = JSON.parse(form.dataset.ids || '[]'); if (ids.length) inName.placeholder = ids[Math.floor(Math.random() * ids.length)]; } catch {}
  const setSel = (s: HTMLSelectElement, v: string | null) => { if (v && [...s.options].some((o) => o.value === v)) s.value = v; };
  if (q.get('name')) inName.value = q.get('name')!;
  if (q.get('email')) inEmail.value = q.get('email')!;
  if (q.get('org')) inOrg.value = q.get('org')!;
  setSel(selProg, q.get('program'));
  setSel(selTopic, q.get('topic') || (q.get('tier') ? 'Full facility build' : ''));
  const aTier = q.get('tier') || '', aScore = q.get('score') || '', aRef = q.get('ref') || '', aTrack = q.get('track') || '';
  if (aTier) {
    const box = form.querySelector<HTMLElement>('[data-attached]')!;
    box.querySelector('[data-attached-note]')!.textContent = 'Readiness tier: ' + aTier + (aScore ? ' (' + aScore + '/100)' : '') + (aRef ? ' · Ref ' + aRef : '');
    box.hidden = false;
  }
  const page = form.querySelector<HTMLInputElement>('[data-page]'); if (page) page.value = location.href;

  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const lbl = btn.querySelector('.lbl')!;
  const err = form.querySelector<HTMLElement>('.err')!;
  let busy = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (busy || !form.reportValidity()) return;
    // Every field keyed by its label text, as the source form did.
    const d: Payload = {};
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('.fields input, .fields select, .fields textarea').forEach((f) => {
      const k = (f.labels?.[0]?.textContent || f.name || 'Field').trim();
      d[k] = f.value;
      if (f.type === 'email') d._replyto = f.value;
    });
    const payload: Payload = Object.assign(
      { _subject: 'Contact lead: ' + (d['Full name'] || '') + (d['Organization'] ? ' · ' + d['Organization'] : ''), _template: 'table', _captcha: 'false' },
      d,
      aTier ? { 'Readiness tier': aTier, 'Readiness score': aScore ? aScore + ' / 100' : '', 'Assessment ref': aRef, 'Assessment track': aTrack } : {},
      { Form: 'Contact', Page: location.href, Submitted: new Date().toLocaleString() },
    );
    busy = true; err.hidden = true;
    btn.setAttribute('aria-busy', 'true'); lbl.textContent = 'Sending…';
    tgSend(payload, { extra: { program: selProg.value, interest: selTopic.value }, silent: true })
      .then(() => {
        card.classList.add('is-sent');
        card.querySelector<HTMLElement>('[data-tabs]')!.hidden = true;
        panels.forEach((p) => { p.hidden = true; });
        done.hidden = false;
        done.focus();
      })
      .catch(() => {
        err.textContent = (form.dataset.err || '') + ' ';
        const a = document.createElement('a'); a.href = mailtoFor(payload); a.textContent = 'Email it instead';
        err.append(a);
        err.hidden = false;
      })
      .finally(() => { busy = false; btn.removeAttribute('aria-busy'); lbl.textContent = 'Request my consultation'; });
  });
}
