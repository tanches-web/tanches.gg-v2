/* TANCHES.GG analytics + ad pixels. Loaded on every public page (never in /prod_site).
   To turn a tracker on, paste its ID between the quotes and upload the folder again. Leave it empty to keep it off.
   - GA4: Google Analytics > Admin > Data streams > Measurement ID (looks like G-XXXXXXXXXX)
   - LinkedIn: Campaign Manager > Analyze > Insight Tag > Partner ID (numbers only)
   - LinkedIn lead conversion: Campaign Manager > Conversions > your "Lead" conversion ID (numbers only, optional)
   - Meta: Events Manager > Data sources > your Pixel ID (numbers only) */
window.TG_TRACKING = {
  ga4: '',
  linkedinPartnerId: '',
  linkedinLeadConversionId: '',
  metaPixelId: '',
};

(function () {
  var C = window.TG_TRACKING || {}, ok = function (v) { return typeof v === 'string' && /^[\w-]+$/.test(v.trim()) ? v.trim() : ''; };
  var add = function (src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };
  var GA = ok(C.ga4), LI = ok(C.linkedinPartnerId), LIC = ok(C.linkedinLeadConversionId), FB = ok(C.metaPixelId);
  if (GA) { window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); }; window.gtag('js', new Date()); window.gtag('config', GA); add('https://www.googletagmanager.com/gtag/js?id=' + GA); }
  if (LI) { window._linkedin_partner_id = LI; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(LI);
    if (!window.lintrk) { window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); }; window.lintrk.q = []; } add('https://snap.licdn.com/li.lms-analytics/insight.min.js'); }
  if (LIC) window.TG_LI_LEAD = LIC;
  if (FB) { !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', FB); window.fbq('track', 'PageView'); }
})();
