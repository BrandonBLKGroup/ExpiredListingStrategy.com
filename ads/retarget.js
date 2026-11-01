/* AMPLIFIER · retargeting tag (Brandon 2026-11-01): everyone who opens one of our links gets the ad that matches that link.
   Expired pages get the expired ad, FSBO pages the FSBO ad (each in a Central AR and an NWA version), everyone else gets
   "Thinking of buying or selling?". Inert until PIXEL holds the Meta pixel (dataset) ID from Events Manager.
   Privacy: the pixel never runs on the page itself, because personal pages carry the owner's address in the link. It runs in a
   hidden frame on this same site whose own address names only the audience, with the referrer cut to the bare site, so Meta
   never learns whose page it was. */
(function () {
  var PIXEL = ''; // set this (one line, both sites) and every page starts filling the six audiences
  if (!PIXEL || window.__blkTag) return; window.__blkTag = 1;
  var h = location.hostname.toLowerCase(), p = location.pathname.toLowerCase(), q = location.search.toLowerCase();
  var seg = /expiredlistingstrategy/.test(h) ? 'expired_ca'
    : /^\/(fsbo-backup-plan-nwa|fsbo-nwa|fsbo-playbook-nwa)/.test(p) ? 'fsbo_nwa'
    : /^\/fsbo/.test(p) ? 'fsbo_ca'
    : /^\/nwa-(strategy|plan|why)/.test(p) ? 'expired_nwa'
    : /[?&]k=nwa(&|$)/.test(q) ? 'general_nwa'
    : 'general_ca';
  function go() {
    var f = document.createElement('iframe');
    f.src = '/ads/t.html?s=' + seg + '&p=' + encodeURIComponent(PIXEL);
    f.setAttribute('referrerpolicy', 'origin'); f.setAttribute('aria-hidden', 'true'); f.title = 'ads'; f.tabIndex = -1;
    f.style.cssText = 'position:absolute;width:1px;height:1px;border:0;left:-9999px;top:0;visibility:hidden';
    document.body.appendChild(f);
  }
  if (document.body) go(); else document.addEventListener('DOMContentLoaded', go);
})();
