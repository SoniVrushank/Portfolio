/* =========================================================================
   Vrushank Soni — portfolio interactions
   Progressive enhancement: everything degrades gracefully if a CDN
   (GSAP / Lenis) fails to load, and all motion respects reduced-motion.
   ========================================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- theme toggle ---------- */
  try { if (localStorage.getItem('theme') === 'light') document.documentElement.setAttribute('data-theme', 'light'); } catch (e) {}
  var themeBtn = document.querySelector('.theme-toggle');
  function syncIcon() {
    if (!themeBtn) return;
    themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '☀' : '☽';
  }
  syncIcon();
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    if (light) { document.documentElement.removeAttribute('data-theme'); try { localStorage.setItem('theme', 'dark'); } catch (e) {} }
    else { document.documentElement.setAttribute('data-theme', 'light'); try { localStorage.setItem('theme', 'light'); } catch (e) {} }
    syncIcon();
  });

  /* ---------- live IST clock ---------- */
  var clockEl = document.getElementById('ist-clock');
  if (clockEl) {
    var tick = function () { clockEl.textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }); };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('#year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- inert placeholder links ---------- */
  document.querySelectorAll('a[aria-disabled="true"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* ---------- cursor-reactive glass highlight ---------- */
  document.querySelectorAll('.glass').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ---------- scroll progress bar ---------- */
  var bar = document.querySelector('.scroll-progress');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- custom cursor ---------- */
  if (finePointer && !reduce) {
    var dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      document.body.classList.add('cursor-on');
      var mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      });
      (function ring_raf() {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
        requestAnimationFrame(ring_raf);
      })();
      document.querySelectorAll('a, button, .project-card, .brand-slide, [data-magnetic]').forEach(function (el) {
        el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
      });
    }
  }

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + x * 0.28 + 'px,' + y * 0.4 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- Lenis smooth scroll (optional) ---------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    try {
      lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      var rafLoop = function (t) { lenis.raf(t); requestAnimationFrame(rafLoop); };
      requestAnimationFrame(rafLoop);
      /* smooth in-page anchor jumps */
      document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var id = a.getAttribute('href');
          if (id.length > 1) { var t = document.querySelector(id); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -20 }); } }
        });
      });
    } catch (e) { lenis = null; }
  }

  /* ---------- GSAP-driven motion ---------- */
  if (window.gsap) {
    gsap.registerPlugin(window.ScrollTrigger);
    if (lenis && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    if (!reduce) {
      /* hero entrance */
      var htl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (document.querySelector('.hero .eyebrow')) htl.from('.hero .eyebrow', { y: 18, opacity: 0, duration: .6 });
      if (document.querySelector('.hero h1'))       htl.from('.hero h1',       { y: 30, opacity: 0, duration: .9 }, '-=.3');
      if (document.querySelector('.hero .tagline')) htl.from('.hero .tagline', { y: 18, opacity: 0, duration: .7 }, '-=.55');
      if (document.querySelector('.hero-cta'))      htl.from('.hero-cta',      { y: 16, opacity: 0, duration: .6 }, '-=.5');
      if (document.querySelector('.hero-meta'))     htl.from('.hero-meta',     { y: 12, opacity: 0, duration: .6 }, '-=.45');
      if (document.querySelector('.hero-panel'))    htl.from('.hero-panel',    { y: 36, opacity: 0, duration: 1 }, '-=.7');

      /* section reveals with subtle stagger */
      gsap.utils.toArray('.reveal').forEach(function (el) {
        gsap.from(el, { y: 34, opacity: 0, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' } });
      });

      /* stagger children in grids/sliders */
      gsap.utils.toArray('.skills-grid, .exp-row, .metrics-grid, .ach-grid, .cert-grid, .slider').forEach(function (grp) {
        gsap.from(grp.children, { y: 26, opacity: 0, duration: .7, ease: 'power3.out', stagger: .08,
          scrollTrigger: { trigger: grp, start: 'top 84%' } });
      });

      /* hero panel parallax */
      var panel = document.querySelector('.hero-panel');
      if (panel) gsap.to(panel, { yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });

      /* code lines type-in */
      document.querySelectorAll('.code-panel .code-line').forEach(function (line, i) {
        gsap.from(line, { opacity: 0, x: -8, duration: .35, delay: i * .05,
          scrollTrigger: { trigger: line.closest('.code-panel'), start: 'top 82%' } });
      });
    }

    /* number counters */
    document.querySelectorAll('.metric-num').forEach(function (el) {
      var target = +el.dataset.count;
      if (reduce) { el.textContent = target; return; }
      gsap.to(el, { textContent: target, duration: 1.6, ease: 'power2.out', snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  }
})();
