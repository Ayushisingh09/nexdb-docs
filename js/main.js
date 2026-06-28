document.addEventListener('DOMContentLoaded', function () {
  /* ── Tab switcher ── */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = this.dataset.tab;
      var parent = this.closest('.tabs-wrap, .tabs');
      if (!parent) return;
      parent.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      parent.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
      var el = parent.querySelector('#' + target);
      if (el) el.classList.add('active');
    });
  });

  /* ── Sidebar active tracking ── */
  var sidebarLinks = document.querySelectorAll('.docs-sidebar a');
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      sidebarLinks.forEach(function (l) { l.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  var sections = document.querySelectorAll('section[id]');
  if (sections.length && sidebarLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          sidebarLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) link.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ── Scroll reveal animation ── */
  var animEls = document.querySelectorAll('.animate-in');
  if (animEls.length) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animEls.forEach(function (el) { animObserver.observe(el); });
  }
});
