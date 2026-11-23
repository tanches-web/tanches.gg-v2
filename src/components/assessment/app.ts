// Assessment flow controller. Behaviour follows the source component (Assessment.html): track → intake → 8 questions
// (pick auto-advances after 220 ms) → results with lead + PDF. Partial "NOT completed" lead on page leave or 10 min idle.
import { report, makeRef, PRIORITY_COLOR, type AsmData, type Answers, type Report } from './engine';
import { tgSend, tgFields, type Payload } from '../../lib/tg-send';

const root = document.querySelector<HTMLElement>('[data-asm]');
if (root) init(root);

function init(root: HTMLElement) {
  const D: AsmData = JSON.parse(document.getElementById('asm-data')!.textContent || '{}');
  const S = { path: '' as string, step: 0, ans: {} as Answers, screen: 'path', fName: '', fEmail: '', fOrg: '', fPhone: '', ref: '', pdfBusy: false };
  let pending = false, incSent = false, sentKey: string | null = null;
  let idleT = 0, advT = 0, viaPointer = false;
  let R: Report | null = null;

  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const screens = root.querySelectorAll<HTMLElement>('[data-screen]');
  const live = $('#asm-live');
  const qs = () => (S.path ? D.tracks[S.path] : []);
  const path = () => D.paths.find((p) => p.key === S.path);
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const announce = (t: string) => { live.textContent = ''; window.setTimeout(() => { live.textContent = t; }, 60); };

  function show(name: string, focusEl?: HTMLElement | null) {
    S.screen = name;
    screens.forEach((s) => {
      const on = s.dataset.screen === name;
      s.hidden = !on;
      s.classList.remove('is-enter');
      if (on && !reduce()) { void s.offsetWidth; s.classList.add('is-enter'); }
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
    focusEl?.focus({ preventScroll: true });
  }

  // Intake ---------------------------------------------------------------
  const intakeForm = $<HTMLFormElement>('#asm-intake');
  const inName = $<HTMLInputElement>('#as-name'), inEmail = $<HTMLInputElement>('#as-email'), inOrg = $<HTMLInputElement>('#as-org'), inPhone = $<HTMLInputElement>('#as-phone');
  const err = $('#asm-intake-err');
  if (D.secretIds?.length) inName.placeholder = D.secretIds[Math.floor(Math.random() * D.secretIds.length)];
  const setErr = (m: string) => { err.textContent = m; err.hidden = !m; if (!m) [inName, inEmail].forEach((i) => i.removeAttribute('aria-invalid')); };
  [inName, inEmail, inOrg, inPhone].forEach((i) => i.addEventListener('input', () => setErr('')));

  root.querySelectorAll<HTMLButtonElement>('[data-path]').forEach((b) => b.addEventListener('click', () => {
    clearTimeout(advT);
    S.path = b.dataset.path!; S.step = 0; S.ans = {};
    setErr('');
    $('[data-intake-meta]').textContent = (path()?.label || '').toUpperCase() + ' · Before you start';
    show('intake', $('#as-intake-title'));
  }));
  $('[data-act="to-paths"]').addEventListener('click', () => { setErr(''); show('path', $('#as-paths-title')); });

  intakeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    S.fName = inName.value; S.fEmail = inEmail.value; S.fOrg = inOrg.value; S.fPhone = inPhone.value;
    const badName = !S.fName.trim(), badEmail = !/^\S+@\S+\.\S+$/.test(S.fEmail.trim());
    if (badName || badEmail) {
      setErr('Add your name and a valid email to start.');
      ([[inName, badName], [inEmail, badEmail]] as [HTMLInputElement, boolean][]).forEach(([el, bad]) => (bad ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid')));
      (badName ? inName : inEmail).focus();
      return;
    }
    clearTimeout(advT);
    pending = true; incSent = false;
    S.step = 0; S.ans = {};
    renderQ();
    show('q', qH);
    announce(stepSr());
    armIdle();
  });

  // Questions ------------------------------------------------------------
  const qForm = $<HTMLFormElement>('#asm-q');
  const qH = $('#as-q');
  const opts = $('[data-opts]');
  const segs = $('[data-segs]');
  const nextBtn = $<HTMLButtonElement>('[data-next]');
  const optTpl = document.getElementById('asm-tpl-opt') as HTMLTemplateElement;
  const stepSr = () => 'Question ' + (S.step + 1) + ' of ' + qs().length;

  function progress() {
    const list = qs(), q = list[S.step];
    const answered = q && S.ans[q.id] != null;
    const pct = list.length ? Math.round(((S.step + (answered ? 1 : 0)) / list.length) * 100) : 0;
    segs.setAttribute('aria-valuenow', String(pct));
    segs.setAttribute('aria-valuetext', stepSr());
    segs.querySelectorAll('i').forEach((el, i) => {
      el.className = i === S.step ? 'is-on' + (answered ? '' : ' is-pending') : S.ans[list[i].id] != null ? 'is-done' : '';
    });
    nextBtn.disabled = !answered;
  }

  function renderQ() {
    const list = qs(), q = list[S.step]; if (!q) return;
    qH.textContent = q.text;
    $('[data-step-label]').textContent = 'QUESTION ' + (S.step + 1) + ' OF ' + list.length;
    $('[data-q-meta]').textContent = (path()?.label || '').toUpperCase() + ' · ' + q.dim.toUpperCase();
    if (segs.children.length !== list.length) segs.replaceChildren(...list.map(() => document.createElement('i')));
    opts.replaceChildren(...q.options.map((o, i) => {
      const node = optTpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
      const input = node.querySelector('input')!;
      input.value = String(i); input.id = 'asm-o' + i; input.checked = S.ans[q.id] === i;
      node.querySelector('.asm-key')!.textContent = 'ABCD'[i];
      node.querySelector('.asm-optl')!.textContent = o.l;
      return node;
    }));
    progress();
    const card = qForm;
    card.classList.remove('is-enter');
    if (!reduce()) { void card.offsetWidth; card.classList.add('is-enter'); }
  }

  opts.addEventListener('pointerdown', () => { viaPointer = true; });
  opts.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement; if (t.name !== 'asm-opt') return;
    const q = qs()[S.step]; if (!q) return;
    S.ans = { ...S.ans, [q.id]: Number(t.value) };
    progress();
    armIdle();
  });
  // Pointer picks advance on their own after 220 ms (as in the source). Arrow keys only move the choice; Enter continues.
  opts.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (viaPointer) { viaPointer = false; clearTimeout(advT); advT = window.setTimeout(advance, 220); }
  });
  opts.addEventListener('keydown', (e) => {
    viaPointer = false;
    if (e.key === 'Enter') { e.preventDefault(); if (!nextBtn.disabled) advance(); }
  });
  qForm.addEventListener('submit', (e) => { e.preventDefault(); if (!nextBtn.disabled) advance(); });

  function advance() {
    clearTimeout(advT);
    if (S.screen !== 'q' || !S.path) return;
    const n = qs().length, q = qs()[S.step];
    if (!q || S.ans[q.id] == null) return;
    if (S.step < n - 1) {
      S.step++;
      renderQ();
      qH.focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top;
      if (top < 0) window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' });
      announce(stepSr());
    } else {
      S.ref = makeRef();
      renderRes();
      show('res', $('#as-tier'));
      sendLead();
    }
  }

  $('[data-act="back"]').addEventListener('click', () => {
    clearTimeout(advT);
    if (S.step > 0) { S.step--; renderQ(); qH.focus({ preventScroll: true }); announce(stepSr()); }
    else show('intake', $('#as-intake-title'));
  });

  // Leads ---------------------------------------------------------------
  function armIdle() { clearTimeout(idleT); if (pending) idleT = window.setTimeout(() => sendIncomplete('No activity for 10 minutes', false), 10 * 60 * 1000); }
  window.addEventListener('pagehide', () => sendIncomplete('Left the page before finishing', true));

  function sendIncomplete(reason: string, leaving: boolean) {
    if (!pending || incSent) return;
    incSent = true; clearTimeout(idleT);
    const list = qs(), p = path();
    const answered = list.filter((q) => S.ans[q.id] != null).length;
    const payload: Payload = {
      _subject: 'Assessment NOT completed: ' + S.fName.trim() + (S.fOrg.trim() ? ' · ' + S.fOrg.trim() : '') + ' (' + answered + ' of ' + list.length + ' answered)',
      Name: S.fName.trim(), Email: S.fEmail.trim(), Organization: S.fOrg.trim() || '(not provided)', Phone: S.fPhone.trim() || '(not provided)',
      Track: p ? p.label : S.path, 'Readiness survey': 'NOT completed. Answered ' + answered + ' of ' + list.length + ' questions. No report was generated.', Reason: reason,
      Submitted: new Date().toLocaleString(), Page: location.href,
    };
    list.forEach((q, i) => { const v = S.ans[q.id]; if (v != null && q.options[v]) payload['Q' + (i + 1) + '. ' + q.text] = q.options[v].l; });
    const body = new URLSearchParams(Object.assign({ 'form-name': 'assessment', 'bot-field': '' }, tgFields(payload)));
    try {
      if (leaving && navigator.sendBeacon && navigator.sendBeacon('/', body)) return;
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString(), keepalive: true }).catch(() => {});
    } catch {}
  }

  const pdfCtx = () => ({ name: S.fName, org: S.fOrg, ref: S.ref, pathLabel: path()?.label || '', report: R!, tier: D.tiers[R!.tier] });

  function sendLead() {
    const key = JSON.stringify(S.ans);
    if (sentKey === key) return;
    sentKey = key;
    const hadPartial = incSent; pending = false; clearTimeout(idleT);
    const r = R!, list = qs(), tier = D.tiers[r.tier].name, p = path();
    const payload: Payload = {
      _subject: 'Assessment lead ' + S.ref + ': ' + S.fName.trim() + (S.fOrg.trim() ? ' · ' + S.fOrg.trim() : '') + ' (' + tier + ', ' + r.score + '/100)',
      _template: 'table', _captcha: 'false', _replyto: S.fEmail.trim(),
      Reference: S.ref, Name: S.fName.trim(), Email: S.fEmail.trim(), Organization: S.fOrg.trim() || '(not provided)', Phone: S.fPhone.trim() || '(not provided)',
      Track: p ? p.label : S.path, 'Readiness tier': tier, 'Readiness score': r.score + ' / 100',
      'Area breakdown': r.dims.map((d) => d.name + ': ' + d.status + ' (' + d.pct + '%)').join(' | '),
      'Action plan': r.plan.map((x) => x.n + ' ' + x.t + ' [' + x.priority + ']').join(' | '),
      Strengths: r.strengths.map((s) => s.t).join(', ') || '(none)',
      Submitted: new Date().toLocaleString(), Page: location.href,
    };
    list.forEach((q, i) => { const a = S.ans[q.id]; payload['Q' + (i + 1) + '. ' + q.text] = a != null && q.options[a] ? q.options[a].l : '(skipped)'; });
    payload['Readiness survey'] = 'Completed' + (hadPartial ? '. They came back and finished after an earlier "NOT completed" email; this one has the full results.' : '.');
    const ctx = pdfCtx();
    let fileName = 'TANCHESGG_Readiness_Report.pdf';
    const withPdf: Promise<Blob | null> = import('./pdf')
      .then((m) => Promise.race([
        m.pdfAssets().then((A) => m.buildPdf(ctx, A, true) as Promise<Blob>).then((b) => ({ b, name: m.pdfFileName(ctx.name, ctx.org) })),
        new Promise<null>((res) => setTimeout(() => res(null), 15000)),
      ]))
      .then((x: any) => { if (x) { fileName = x.name; return x.b; } return null; })
      .catch(() => null);
    withPdf
      .then((blob) => {
        if (!blob) payload['PDF report'] = 'Could not be generated; the visitor can download it from the results page.';
        return tgSend(payload, { files: blob ? [['report', blob, fileName]] : [] });
      })
      .catch(() => {});
  }

  // Results -------------------------------------------------------------
  function renderRes() {
    R = report(qs(), S.ans, D.pad);
    const r = R, t = D.tiers[r.tier], p = path();
    const prepared = [S.fName.trim(), S.fOrg.trim()].filter(Boolean).join(', ') || (p ? p.label + ' organization' : '');
    const set = (k: string, v: string) => { root.querySelectorAll<HTMLElement>(`[data-r="${k}"]`).forEach((el) => { el.textContent = v; }); };
    set('tier', t.name);
    set('desc', t.desc);
    set('track', (p ? p.label.toUpperCase() : '') + ' track · Prepared for ' + prepared);
    set('score', String(r.score));
    set('ref', S.ref);
    set('first', S.fName.trim().split(' ')[0] || 'there');
    const meter = $('[data-r="meter"]');
    meter.style.width = '0%';
    void meter.offsetWidth;
    meter.style.width = r.score + '%';
    root.querySelectorAll<HTMLElement>('[data-tier]').forEach((el) => el.classList.toggle('is-on', el.dataset.tier === r.tier));

    $('[data-r="dims"]').replaceChildren(...r.dims.map((d) => {
      const li = document.createElement('li');
      const n = document.createElement('span'); n.className = 'asm-dimn'; n.textContent = d.name;
      const bar = document.createElement('span'); bar.className = 'asm-dimbar'; bar.setAttribute('aria-hidden', 'true');
      const fill = document.createElement('i'); fill.style.width = d.w; bar.append(fill);
      const st = document.createElement('span'); st.className = 'asm-stat';
      const dot = document.createElement('i'); dot.style.backgroundColor = d.pdot;
      const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = ', ' + d.pct + ' percent';
      st.append(dot, d.status, sr);
      li.append(n, bar, st);
      return li;
    }));

    const sTpl = document.getElementById('asm-tpl-strength') as HTMLTemplateElement;
    $('[data-r="strengths"]').replaceChildren(...r.strengths.map((s) => {
      const li = sTpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
      li.querySelector('.asm-strt')!.textContent = s.t;
      li.querySelector('.spec')!.textContent = s.dimUp;
      return li;
    }));
    $('[data-r="strengths"]').hidden = !r.strengths.length;
    $('[data-r="none"]').hidden = !!r.strengths.length;

    $('[data-r="plan"]').replaceChildren(...r.plan.map((x) => {
      const li = document.createElement('li'); li.className = 'asm-step';
      const n = document.createElement('span'); n.className = 'asm-stepn num'; n.textContent = x.n; n.setAttribute('aria-hidden', 'true');
      const main = document.createElement('div'); main.className = 'asm-stepmain';
      const h = document.createElement('h3'); h.className = 'h3'; h.textContent = x.t;
      const tags = document.createElement('div'); tags.className = 'asm-tags';
      const c1 = document.createElement('span'); c1.className = 'asm-chip';
      const pd = document.createElement('i'); pd.className = 'asm-pdot'; pd.style.backgroundColor = PRIORITY_COLOR[x.priority][0];
      c1.append(pd, x.priority);
      const c2 = document.createElement('span'); c2.className = 'asm-chip'; c2.textContent = x.dimUp;
      tags.append(c1, c2); main.append(h, tags);
      const body = document.createElement('div'); body.className = 'asm-stepbody';
      const d = document.createElement('p'); d.className = 'body'; d.textContent = x.d; body.append(d);
      if (x.hasAns) { const a = document.createElement('p'); a.className = 'spec'; a.textContent = 'You answered: ' + x.ansUp; body.append(a); }
      li.append(n, main, body);
      return li;
    }));

    const params = Object.entries({ name: S.fName.trim(), email: S.fEmail.trim(), org: S.fOrg.trim(), tier: t.name, score: String(r.score), ref: S.ref, track: p ? p.label : '' }).filter(([, v]) => v);
    $<HTMLAnchorElement>('[data-r="book"]').href = '/Contact?' + new URLSearchParams(params).toString();
    import('./pdf').then((m) => m.loadJsPdf()).catch(() => {});
  }

  const pdfBtn = $<HTMLButtonElement>('[data-act="pdf"]');
  const pdfLabel = $('[data-pdf-label]');
  pdfBtn.addEventListener('click', async () => {
    if (S.pdfBusy || !R) return;
    S.pdfBusy = true; pdfBtn.setAttribute('aria-busy', 'true'); pdfLabel.textContent = 'Building your PDF…';
    try {
      const m = await import('./pdf');
      const A = await m.pdfAssets();
      await m.buildPdf(pdfCtx(), A, false);
    } catch (e) { console.error(e); }
    finally { S.pdfBusy = false; pdfBtn.removeAttribute('aria-busy'); pdfLabel.textContent = 'Download PDF report'; }
  });


  $('[data-act="retake"]').addEventListener('click', () => {
    clearTimeout(advT);
    S.path = ''; S.ans = {}; S.step = 0; sentKey = null; R = null;
    show('path', $('#as-paths-title'));
  });
}
