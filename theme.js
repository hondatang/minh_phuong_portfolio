(function () {
  var root = document.documentElement;
  var pack = new URLSearchParams(window.location.search).get('pack');
  if (pack === 'serif' || pack === 'grotesk') {
    root.setAttribute('data-pack', pack);
    try { sessionStorage.setItem('sciencefolio.pack', pack); } catch (error) {}
  } else {
    var savedPack = null;
    try { savedPack = sessionStorage.getItem('sciencefolio.pack'); } catch (error) {}
    root.setAttribute('data-pack', savedPack === 'serif' ? 'serif' : 'grotesk');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark');
        var on = document.body.classList.contains('dark');
        themeToggle.textContent = on ? 'Light mode' : 'Dark mode';
        try { localStorage.setItem('sciencefolio.dark', on ? '1' : '0'); } catch (error) {}
      });

      try {
        var dark = localStorage.getItem('sciencefolio.dark') === '1';
      } catch (error) {
        var dark = false;
      }
      if (dark) {
        document.body.classList.add('dark');
        themeToggle.textContent = 'Light mode';
      } else {
        themeToggle.textContent = 'Dark mode';
      }
    }

    var currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
      var links = document.querySelectorAll('[data-nav]');
      links.forEach(function (link) {
        if (link.getAttribute('data-nav') === currentPage) {
          link.classList.add('current');
        }
      });
    }

    var filterButtons = document.querySelectorAll('[data-filter]');
    var entries = document.querySelectorAll('[data-type]');
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-filter');
        entries.forEach(function (entry) {
          var keep = value === 'all' || entry.getAttribute('data-type') === value;
          entry.classList.toggle('is-hidden', !keep);
        });
        filterButtons.forEach(function (btn) {
          btn.setAttribute('aria-pressed', String(btn === button));
        });
      });
    });
  });
})();
