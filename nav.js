(function () {
  var page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('a.nav-btn[data-page]').forEach(function (a) {
    if (a.dataset.page === page || (page === 'index' && a.dataset.page === 'willkommen')) {
      a.classList.add('active');
    }
  });

  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
