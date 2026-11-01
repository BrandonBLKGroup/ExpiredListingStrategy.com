/* Personal pages: ExpiredListingStrategy.com/<their-address> shows the full site with a "Prepared for" opener on top,
   in the BLK brand: black, chrome display type, Montserrat tracked labels, Inter body.
   The address comes from the link itself and is confirmed by Brandon's lead board, which also logs the open on their lead.
   Nothing about any lead is stored in this file or this repo. */
(function () {
  'use strict';
  var path = location.pathname.replace(/^\/+|\/+$/g, '');
  try { path = decodeURIComponent(path); } catch (e) {}
  path = path.toLowerCase();
  if (!/^\d+[a-z]?-[a-z0-9-]+$/.test(path)) return; // only personal links like /4-ligadura-ln
  var slug = path.slice(0, 80);
  var preview = /[?&]preview\b/.test(location.search);
  var qs = new URLSearchParams(location.search);
  var via = qs.get('via') === 'mail' ? 'mail' : '';          // came from the QR code on their mailer
  var drop = /^\d{4}-\d{2}-\d{2}$/.test(qs.get('d') || '') ? qs.get('d') : '';
  if (via || drop) { try { history.replaceState(null, '', location.pathname + (preview ? '?preview=1' : '') + location.hash); } catch (e) {} } // keep their clean address URL
  var BOARD = 'https://blk-leads-production.up.railway.app/api/public/els-visit';
  window.ELS_SLUG = slug;

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap';
  document.head.appendChild(font);

  var css = document.createElement('style');
  css.textContent = [
    '.pf{position:relative;overflow:hidden;background:#131313;color:#ECEDEE;min-height:calc(100vh - 70px);min-height:calc(100svh - 70px);display:flex;align-items:center;padding:72px 0 84px;border-bottom:1px solid #2C2C2A;font-family:Inter,-apple-system,system-ui,sans-serif}',
    '.pf .wrap{position:relative;z-index:1;width:100%}',
    '.pf-ghost{position:absolute;right:-30px;bottom:-70px;font:900 clamp(280px,48vw,640px)/.8 Archivo,sans-serif;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:2px #262628;pointer-events:none;user-select:none;z-index:0}',
    '.pf-kick{font:500 11px Montserrat,sans-serif;letter-spacing:6px;text-transform:uppercase;color:#9FA4A8}',
    '.pf-for{font:500 12px Montserrat,sans-serif;letter-spacing:6px;text-transform:uppercase;color:#D9DBDD;margin-top:46px;display:flex;align-items:center;gap:16px}',
    '.pf-for:after{content:"";height:1px;width:64px;background:linear-gradient(90deg,#F7F8F9,#949AA0 55%,#2C2C2A)}',
    '.pf-addr{font:900 clamp(50px,10vw,140px)/.92 Archivo,sans-serif;letter-spacing:-.03em;text-transform:uppercase;margin:16px 0 0;overflow-wrap:anywhere}',
    '.pf-chrome{background:linear-gradient(180deg,#F7F8F9 0%,#DEE1E3 30%,#949AA0 52%,#EEF0F1 60%,#B6BABE 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-box-decoration-break:clone;box-decoration-break:clone}',
    '.pf-city{font:300 clamp(13px,1.6vw,17px) Montserrat,sans-serif;letter-spacing:6px;text-transform:uppercase;color:#ECEDEE;margin-top:20px}',
    '.pf-line{font-size:17px;line-height:1.6;max-width:580px;margin:30px 0 0;color:#C9CCCF}',
    '.pf-dom{color:#fff;font-weight:600;white-space:nowrap;border-bottom:1px solid #949AA0;padding-bottom:1px}',
    '.pf-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}',
    '.pf-b{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 26px;font:600 11px Montserrat,sans-serif;letter-spacing:3px;text-transform:uppercase;text-decoration:none;border:1px solid #ECEDEE;transition:background .15s,color .15s}',
    '.pf-b1{background:#ECEDEE;color:#131313}.pf-b1:hover{background:#fff;color:#131313}',
    '.pf-b2{background:transparent;color:#ECEDEE;border-color:#5E6266}.pf-b2:hover{border-color:#ECEDEE;color:#fff}',
    '.pf-by{display:flex;align-items:center;gap:14px;margin-top:40px;padding-top:24px;border-top:1px solid #2C2C2A;max-width:580px}',
    '.pf-by img{width:48px;height:48px;border-radius:50%;object-fit:cover;filter:grayscale(1) contrast(1.05)}',
    '.pf-by b{display:block;font:600 11px Montserrat,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#ECEDEE}',
    '.pf-by span{display:block;font-size:12.5px;line-height:1.45;color:#9FA4A8;margin-top:4px}',
    '.pf-go{display:inline-flex;align-items:center;gap:12px;margin-top:34px;font:500 11px Montserrat,sans-serif;letter-spacing:5px;text-transform:uppercase;color:#9FA4A8;text-decoration:none}',
    '.pf-go:hover{color:#fff}.pf-go i{font-style:normal;display:inline-block;animation:pfBob 1.8s ease-in-out infinite}',
    '.pf-in{opacity:0;transform:translateY(14px);animation:pfIn .8s cubic-bezier(.2,.7,.2,1) forwards}',
    '.pf-in.d2{animation-delay:.15s}.pf-in.d3{animation-delay:.3s}.pf-in.d4{animation-delay:.45s}',
    '@keyframes pfIn{to{opacity:1;transform:none}}@keyframes pfBob{50%{transform:translateY(4px)}}',
    '@media (prefers-reduced-motion:reduce){.pf-in{opacity:1;transform:none;animation:none}.pf-go i{animation:none}}',
    '@media (max-width:640px){.pf{padding:56px 0 64px}.pf-kick{letter-spacing:3.5px}.pf-for{letter-spacing:5px}.pf-city{letter-spacing:4px}.pf-for{margin-top:34px}.pf-line{font-size:16px}.pf-b{width:100%}.pf-ghost{bottom:-40px}}'
  ].join('\n');
  document.head.appendChild(css);

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var titleCase = function (s) { return s.replace(/\b\w/g, function (c) { return c.toUpperCase(); }).replace(/\b(Ne|Nw|Se|Sw)\b/g, function (d) { return d.toUpperCase(); }); };
  var guess = titleCase(slug.replace(/-/g, ' '));
  var num = (slug.match(/^\d+/) || [''])[0];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var prettyDate = function (ymd) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(ymd || ''); return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : ''; };

  // Brandon's rule: 90 or more days on market (from the daily listing sheet) gets the special line. 89 or less gets the standard one.
  var LONG_DOM = 90;
  function lineHtml(street, dom) {
    var st = '<b id="pfStreet" style="color:#ECEDEE;font-weight:600">' + esc(street) + '</b>';
    var plan = ' Below is the exact 30-day, 3% plan we would run to put ' + st + ' back in front of every buyer in the market, and get it sold.';
    if (dom >= LONG_DOM) return 'Your listing expired after <b class="pf-dom">' + dom + ' days</b>. Your house did not fail, the strategy did.' + plan;
    return 'Your listing expired. Your house did not fail.' + plan;
  }

  var hero = document.querySelector('.hero');
  if (!hero) return;
  hero.id = hero.id || 'pfPlan';

  var sec = document.createElement('section');
  sec.className = 'pf'; sec.setAttribute('aria-label', 'Prepared for your home');
  sec.innerHTML =
    '<div class="pf-ghost" aria-hidden="true">' + esc(num.length <= 5 ? num : '') + '</div>' +
    '<div class="wrap">' +
      '<div class="pf-kick pf-in">A private marketing strategy</div>' +
      '<div class="pf-for pf-in d2">Prepared for</div>' +
      '<h1 class="pf-addr pf-in d2"><span class="pf-chrome" id="pfAddr">' + esc(guess) + '</span></h1>' +
      '<div class="pf-city pf-in d3" id="pfCity">Central Arkansas</div>' +
      '<p class="pf-line pf-in d3" id="pfLine">' + lineHtml(guess, null) + '</p>' +
      '<div class="pf-cta pf-in d3"><a class="pf-b pf-b1" href="#strategy">Get the full strategy</a><a class="pf-b pf-b2" href="#form">15-minute strategy call</a><a class="pf-b pf-b2" href="https://blk-leads-production.up.railway.app/r/' + slug + '.pdf' + (preview ? '?preview=1' : '') + '" target="_blank" rel="noopener">Your 30-day plan (PDF)</a></div>' +
      '<div class="pf-by pf-in d4"><img src="/brandon-headshot.jpg" alt="Brandon Bruning"><div><b>Prepared by Brandon Bruning</b><span id="pfWhen">The BLK Group at LPT Realty &middot; (501) 398-9830</span></div></div>' +
      '<a class="pf-go pf-in d4" href="#' + hero.id + '">See your plan <i>&darr;</i></a>' +
    '</div>';
  hero.parentNode.insertBefore(sec, hero);

  // Make the two asks further down speak to their house too.
  function personalize(street) {
    var h = document.querySelector('#strategy h2');
    if (h) h.innerHTML = 'Get the full 10-page strategy for <span style="white-space:nowrap">' + esc(street) + '</span>. Free.';
    var m = document.querySelector('#leadform .microhead');
    if (m) m.textContent = 'Free strategy call for ' + street;
    document.title = 'Prepared for ' + street + ' | The BLK Group';
  }
  personalize(guess);

  function show(r) {
    if (!r || !r.ok || !r.street) return;
    var street = titleCase(String(r.street).toLowerCase());
    document.getElementById('pfAddr').textContent = street;
    var dom = parseInt(r.dom, 10);
    document.getElementById('pfLine').innerHTML = lineHtml(street, isNaN(dom) ? null : dom);
    if (r.city) document.getElementById('pfCity').textContent = r.city + ', Arkansas';
    var d = prettyDate(r.prepared);
    if (d) document.getElementById('pfWhen').innerHTML = 'The BLK Group at LPT Realty &middot; ' + esc(d);
    personalize(street);
    var a = document.getElementById('f-addr');
    if (a && !a.value) a.value = street + (r.city ? ', ' + r.city : '');
  }
  var sent = false;
  function report() {
    if (sent || document.visibilityState === 'hidden') return;
    sent = true;
    try {
      // text/plain keeps this a simple request (no preflight). The board ignores link-preview bots and ?preview opens.
      fetch(BOARD, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ slug: slug, ref: document.referrer || '', preview: preview, via: via, d: drop }) })
        .then(function (r) { return r.json(); }).then(show).catch(function () {});
    } catch (e) {}
  }
  report();
  document.addEventListener('visibilitychange', report);

  // Anything they send from this page lands on their existing lead, not a new one.
  if (typeof window.sendInquiry === 'function') {
    var orig = window.sendInquiry;
    window.sendInquiry = function (p) { p = p || {}; p.els_slug = slug; return orig(p); };
  }
})();
