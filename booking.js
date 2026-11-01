/* Book a strategy call: every "strategy call" button opens Brandon's calendar in a BLK-branded window with his photo.
   Stays off (buttons scroll to the call-back form like before) until CALENDLY is set to his public booking link. */
(function () {
  'use strict';
  var CALENDLY = ''; // e.g. 'https://calendly.com/your-name/15min'. Public booking link, safe to keep here.
  if (!CALENDLY) return;
  var BOARD = 'https://blk-leads-production.up.railway.app/api/public/inquiry';

  var font = document.createElement('link');
  font.rel = 'stylesheet'; font.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600&display=swap';
  document.head.appendChild(font);
  var css = document.createElement('style');
  css.textContent = [
    '.bk{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(8,8,8,.78);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}',
    '.bk.on{display:flex}',
    '.bk-p{position:relative;display:grid;grid-template-columns:320px 1fr;width:min(1040px,100%);max-height:calc(100vh - 48px);background:#131313;border:1px solid #2C2C2A;color:#ECEDEE;font-family:Inter,-apple-system,system-ui,sans-serif;overflow:hidden}',
    '.bk-l{padding:36px 30px;border-right:1px solid #2C2C2A;overflow:auto}',
    '.bk-l img{width:132px;height:132px;border-radius:50%;object-fit:cover;display:block;border:1px solid #2C2C2A}',
    '.bk-k{font:500 10.5px Montserrat,sans-serif;letter-spacing:4px;text-transform:uppercase;color:#9FA4A8;margin-top:26px}',
    '.bk-n{font:900 34px/1 Archivo,sans-serif;text-transform:uppercase;letter-spacing:-.5px;margin-top:10px;background:linear-gradient(180deg,#F7F8F9 0%,#DEE1E3 30%,#949AA0 52%,#EEF0F1 60%,#B6BABE 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.bk-t{font:500 10.5px Montserrat,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#D9DBDD;margin-top:10px}',
    '.bk-h{font:600 15px Inter,sans-serif;margin-top:26px;padding-top:22px;border-top:1px solid #2C2C2A}',
    '.bk-h span{display:block;font-weight:400;color:#9FA4A8;font-size:13.5px;margin-top:4px}',
    '.bk-ul{list-style:none;padding:0;margin:18px 0 0;font-size:13.5px;color:#C9CCCF}',
    '.bk-ul li{padding:7px 0 7px 22px;position:relative}.bk-ul li:before{content:"";position:absolute;left:0;top:15px;width:10px;height:1px;background:#949AA0}',
    '.bk-alt{display:inline-block;margin-top:22px;font:500 10.5px Montserrat,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#9FA4A8;border-bottom:1px solid #5E6266;padding-bottom:4px;cursor:pointer;background:none;border-top:0;border-left:0;border-right:0}',
    '.bk-alt:hover{color:#fff}',
    '.bk-r{position:relative;min-height:660px;background:#fff}',
    '.bk-r .calendly-inline-widget,.bk-r iframe{width:100%;height:100%;min-height:660px;border:0}',
    '.bk-x{position:absolute;top:10px;right:10px;z-index:3;width:40px;height:40px;border:1px solid #2C2C2A;background:#131313;color:#ECEDEE;font:400 22px/1 Inter,sans-serif;cursor:pointer}',
    '.bk-load{position:absolute;inset:0;display:grid;place-items:center;font:500 10.5px Montserrat,sans-serif;letter-spacing:4px;text-transform:uppercase;color:#6B6B68}',
    '@media (max-width:820px){.bk{padding:0;align-items:stretch}.bk-p{grid-template-columns:1fr;max-height:none;height:100%;overflow:auto;border:0}',
    '.bk-l{display:grid;grid-template-columns:64px 1fr;gap:0 14px;align-items:center;padding:18px 64px 16px 18px;border-right:0;border-bottom:1px solid #2C2C2A;overflow:visible}',
    '.bk-l img{width:64px;height:64px;grid-row:span 3}.bk-k{margin-top:0;letter-spacing:3.5px}.bk-n{font-size:21px;margin-top:4px;white-space:nowrap}.bk-t{margin-top:5px;letter-spacing:1.5px;font-size:9.5px}',
    '.bk-h,.bk-ul{display:none}.bk-alt{grid-column:1/-1;justify-self:start;margin-top:12px;letter-spacing:2px;font-size:9.5px}.bk-r{min-height:720px}}'
  ].join('\n');
  document.head.appendChild(css);

  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var wrap = document.createElement('div');
  wrap.className = 'bk'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-label', 'Book a strategy call with Brandon Bruning');
  wrap.innerHTML =
    '<div class="bk-p">' +
      '<button class="bk-x" type="button" aria-label="Close">&times;</button>' +
      '<div class="bk-l">' +
        '<img src="/brandon-headshot.jpg" alt="Brandon Bruning">' +
        '<div class="bk-k">15-minute strategy call</div>' +
        '<div class="bk-n">Brandon Bruning</div>' +
        '<div class="bk-t">Team Leader &middot; The BLK Group</div>' +
        '<div class="bk-h" id="bkFor">Pick a time that works for you<span>A real conversation, not a script.</span></div>' +
        '<ul class="bk-ul"><li>What happened with your listing, in real numbers</li><li>Exactly what we would change, specific to your home</li><li>No pressure. Keep the plan either way.</li></ul>' +
        '<button class="bk-alt" type="button" id="bkAlt">Rather we call you? Leave your number</button>' +
      '</div>' +
      '<div class="bk-r"><div class="bk-load">Loading the calendar</div><div id="bkCal"></div></div>' +
    '</div>';
  document.body.appendChild(wrap);

  var loaded = false, last = null;
  function street() { var el = document.getElementById('pfStreet'); return el ? el.textContent : ''; }
  function calUrl() {
    var u = CALENDLY + (CALENDLY.indexOf('?') < 0 ? '?' : '&') + 'hide_gdpr_banner=1&hide_event_type_details=1&background_color=131313&text_color=ecedee&primary_color=ecedee';
    var s = street(); if (s) u += '&a1=' + encodeURIComponent(s); // first question on the Calendly event: Property address
    u += '&utm_source=expiredlistingstrategy&utm_content=' + encodeURIComponent(window.ELS_SLUG || 'site');
    return u;
  }
  function loadCal() {
    if (loaded) return; loaded = true;
    var host = document.getElementById('bkCal');
    var f = document.createElement('iframe');
    f.src = calUrl() + '&embed_domain=' + encodeURIComponent(location.host) + '&embed_type=Inline';
    f.title = 'Book a time with Brandon'; f.setAttribute('loading', 'eager');
    f.style.cssText = 'position:relative;z-index:1;width:100%;height:100%;min-height:inherit;border:0;display:block';
    host.style.cssText = 'position:absolute;inset:0';
    host.appendChild(f);
  }
  function open(e) {
    if (e) e.preventDefault();
    last = document.activeElement;
    var s = street();
    if (s) document.getElementById('bkFor').innerHTML = 'For ' + esc(s) + '<span>Pick a time that works for you.</span>';
    loadCal();
    wrap.classList.add('on'); document.documentElement.style.overflow = 'hidden';
    wrap.querySelector('.bk-x').focus();
  }
  function close() { wrap.classList.remove('on'); document.documentElement.style.overflow = ''; if (last && last.focus) last.focus(); }
  wrap.querySelector('.bk-x').onclick = close;
  wrap.onclick = function (e) { if (e.target === wrap) close(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('on')) close(); });
  document.getElementById('bkAlt').onclick = function () { close(); var f = document.getElementById('leadform'); if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'center' }); var n = document.getElementById('f-name'); if (n) setTimeout(function () { n.focus(); }, 500); } };

  // Every strategy-call button opens the calendar. The call-back form stays as the backup.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#form"], a[data-book]');
    if (a) open(e);
  });
  var formCol = document.querySelector('#form .g2 > div');
  if (formCol) {
    var b = document.createElement('p'); b.style.marginTop = '18px';
    b.innerHTML = '<a class="btn btn-sage" href="#book" data-book>Pick a time on my calendar</a>';
    var callP = formCol.querySelector('a[href^="tel:"]');
    if (callP && callP.parentNode) formCol.insertBefore(b, callP.parentNode); else formCol.appendChild(b);
  }

  // When they book from their personal page, put it on their lead right away.
  window.addEventListener('message', function (e) {
    if (!/calendly\.com$/.test((e.origin || '').replace(/^https?:\/\//, ''))) return;
    if (!e.data || e.data.event !== 'calendly.event_scheduled' || !window.ELS_SLUG) return;
    try { fetch(BOARD, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ els_slug: window.ELS_SLUG, wants: 'Booked a strategy call on the calendar', page: 'expiredlistingstrategy.com' }) }); } catch (x) {}
  });
})();
