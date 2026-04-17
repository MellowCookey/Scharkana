(function () {
  var page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('a.nav-btn[data-page]').forEach(function (a) {
    if (a.dataset.page === page || (page === 'index' && a.dataset.page === 'willkommen')) {
      a.classList.add('active');
    }
  });
})();
