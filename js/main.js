document.addEventListener('DOMContentLoaded', function () {
    // Tab switcher
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.dataset.tab;
            const parent = this.closest('.tabs-wrapper, .tabs');
            if (!parent) return;
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const el = parent.querySelector('#' + target);
            if (el) el.classList.add('active');
        });
    });

    // Sidebar active state
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Highlight current section in sidebar on scroll
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0 && sidebarLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    sidebarLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-80px 0px -60% 0px' });
        sections.forEach(s => observer.observe(s));
    }
});
