/* Personal pages: ExpiredListingStrategy.com/<their-address> shows the full site with a "Prepared for" opener on top.
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
  var BOARD = 'https://blk-leads-production.up.railway.app/api/public/els-visit';
  window.ELS_SLUG = slug;

  var css = document.createElement('style');
  css.textContent = [
    '.pf{position:relative;overflow:hidden;background:var(--paper,#FAFAF8);color:var(--ink,#1D1D1F);min-height:calc(100vh - 70px);min-height:calc(100svh - 70px);display:flex;align-items:center;padding:64px 0 72px;border-bottom:1px solid var(--line,#E3E1DC)}',
    '.pf .wrap{position:relative;z-index:1;width:100%}',
    '.pf-ghost{position:absolute;right:-24px;bottom:-60px;font:900 clamp(260px,46vw,620px)/.8 Archivo,sans-serif;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:2px #E6E4DF;pointer-events:none;user-select:none;z-index:0}',
    '.pf-kick{font:800 12px Archivo,sans-serif;letter-spacing:3.5px;text-transform:uppercase;color:var(--muted,#6B6B68)}',
    '.pf-for{font:800 13px Archivo,sans-serif;letter-spacing:4px;text-transform:uppercase;margin-top:44px;display:flex;align-items:center;gap:14px}',
    '.pf-for:after{content:"";height:2px;width:56px;background:var(--ink,#1D1D1F)}',
    '.pf-addr{font:900 clamp(46px,9.5vw,132px)/.9 Archivo,sans-serif;letter-spacing:-.035em;text-transform:uppercase;margin-top:14px;overflow-wrap:anywhere}',
    '.pf-city{font:800 clamp(15px,2vw,22px) Archivo,sans-serif;letter-spacing:2px;text-transform:uppercase;color:var(--muted,#6B6B68);margin-top:18px}',
    '.pf-line{font-size:18px;max-width:560px;margin-top:28px;color:#3A3A38}',
    '.pf-by{display:flex;align-items:center;gap:14px;margin-top:40px;padding-top:24px;border-top:1px solid var(--line,#E3E1DC);max-width:560px}',
    '.pf-by img{width:52px;height:52px;border-radius:50%;object-fit:cover;filter:grayscale(1)}',
    '.pf-by b{display:block;font:800 14px Archivo,sans-serif;letter-spacing:1.5px;text-transform:uppercase}',
    '.pf-by span{display:block;font-size:13px;line-height:1.45;color:var(--muted,#6B6B68);margin-top:3px}',
    '.pf-go{display:inline-flex;align-items:center;gap:12px;margin-top:40px;font:800 13px Archivo,sans-serif;letter-spacing:3px;text-transform:uppercase;color:var(--ink,#1D1D1F);text-decoration:none;border-bottom:2px solid var(--ink,#1D1D1F);padding-bottom:6px}',
    '.pf-go i{font-style:normal;display:inline-block;animation:pfBob 1.8s ease-in-out infinite}',
    '.pf-in{opacity:0;transform:translateY(14px);animation:pfIn .8s cubic-bezier(.2,.7,.2,1) forwards}',
    '.pf-in.d2{animation-delay:.15s}.pf-in.d3{animation-delay:.3s}.pf-in.d4{animation-delay:.45s}',
    '@keyframes pfIn{to{opacity:1;transform:none}}@keyframes pfBob{50%{transform:translateY(4px)}}',
    '@media (prefers-reduced-motion:reduce){.pf-in{opacity:1;transform:none;animation:none}.pf-go i{animation:none}}',
    '@media (max-width:640px){.pf{min-height:0;padding:52px 0 60px}.pf-for{margin-top:30px}.pf-line{font-size:16px}.pf-ghost{bottom:-30px}}'
  ].join('\n');
  document.head.appendChild(css);

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var guess = slug.replace(/-/g, ' ');
  var num = (slug.match(/^\d+/) || [''])[0];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var prettyDate = function (ymd) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(ymd || ''); return m ? MONTHS[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] : ''; };

  var sec = document.createElement('section');
  sec.className = 'pf'; sec.setAttribute('aria-label', 'Prepared for your home');
  sec.innerHTML =
    '<div class="pf-ghost" aria-hidden="true">' + esc(num.length <= 5 ? num : '') + '</div>' +
    '<div class="wrap">' +
      '<div class="pf-kick pf-in">A private marketing strategy</div>' +
      '<div class="pf-for pf-in d2">Prepared for</div>' +
      '<h1 class="pf-addr pf-in d2" id="pfAddr">' + esc(guess) + '</h1>' +
      '<div class="pf-city pf-in d3" id="pfCity"></div>' +
      '<p class="pf-line pf-in d3">Below is the exact 30-day plan we would run to put your home back in front of every buyer in the market, and get it sold.</p>' +
      '<div class="pf-by pf-in d4"><img src="/brandon-headshot.jpg" alt="Brandon Bruning"><div><b>Prepared by Brandon Bruning</b><span id="pfWhen">The BLK Group at LPT Realty &middot; (501) 398-9830</span></div></div>' +
      '<a class="pf-go pf-in d4" href="#pfPlan">See your plan <i>&darr;</i></a>' +
    '</div>';
  var hero = document.querySelector('.hero');
  if (!hero) return;
  hero.id = hero.id || 'pfPlan';
  sec.querySelector('.pf-go').setAttribute('href', '#' + hero.id);
  hero.parentNode.insertBefore(sec, hero);
  document.title = 'Prepared for ' + guess.replace(/\b\w/g, function (c) { return c.toUpperCase(); }) + ' | The BLK Group';

  function show(r) {
    if (!r || !r.ok || !r.street) return;
    document.getElementById('pfAddr').textContent = r.street;
    if (r.city) document.getElementById('pfCity').textContent = r.city + ', Arkansas';
    var d = prettyDate(r.prepared);
    if (d) document.getElementById('pfWhen').innerHTML = 'The BLK Group at LPT Realty &middot; ' + esc(d);
    document.title = 'Prepared for ' + r.street + ' | The BLK Group';
    var a = document.getElementById('f-addr');
    if (a && !a.value) a.value = r.street + (r.city ? ', ' + r.city : '');
  }
  var sent = false;
  function report() {
    if (sent || document.visibilityState === 'hidden') return;
    sent = true;
    try {
      // text/plain keeps this a simple request (no preflight). The board ignores link-preview bots and ?preview opens.
      fetch(BOARD, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ slug: slug, ref: document.referrer || '', preview: preview }) })
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
