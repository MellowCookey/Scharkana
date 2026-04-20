(function () {
  /* ── Aktiver Nav-Link ──────────────────────────────────────────── */
  function setActiveNav(pathname) {
    var page = pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('a.nav-btn[data-page]').forEach(function (a) {
      a.classList.toggle('active',
        a.dataset.page === page || (page === 'index' && a.dataset.page === 'willkommen'));
    });
  }
  setActiveNav(location.pathname);

  /* ── Hamburger ─────────────────────────────────────────────────── */
  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks  = document.querySelector('.nav-links');
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  /* ── SPA-Navigation: nur <section> tauschen, Canvas läuft durch ── */
  function execScripts(container) {
    container.querySelectorAll('script').forEach(function (old) {
      var s = document.createElement('script');
      Array.from(old.attributes).forEach(function (a) { s.setAttribute(a.name, a.value); });
      s.textContent = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
  }

  function loadPage(url, push) {
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc     = (new DOMParser()).parseFromString(html, 'text/html');
        var newSec  = doc.querySelector('section.section');
        var curSec  = document.querySelector('section.section');
        if (newSec && curSec) {
          curSec.id        = newSec.id;
          curSec.innerHTML = newSec.innerHTML;
          execScripts(curSec);
        }
        document.title = doc.title;
        setActiveNav(url);
        if (push) history.pushState({ url: url }, doc.title, url);
        window.scrollTo(0, 0);
      })
      .catch(function () { window.location.href = url; });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    closeMenu();
    if (a.target === '_blank') return;
    if (href.indexOf('://') !== -1) return;
    if (a.hasAttribute('download')) return;
    if (href.charAt(0) === '#') return;
    e.preventDefault();
    loadPage(href, true);
  });

  window.addEventListener('popstate', function () {
    loadPage(location.href, false);
  });
})();
