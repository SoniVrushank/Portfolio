(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* cursor-reactive glass highlight */
  document.querySelectorAll('.glass').forEach(function(el){
    el.addEventListener('mousemove', function(e){
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ambient leaf parallax */
  var leaves = document.querySelectorAll('.leaf');
  if (leaves.length && !reduce) {
    var ticking = false;
    function updateLeaves(){
      var y = window.scrollY;
      leaves.forEach(function(leaf){
        var speed = parseFloat(leaf.dataset.speed || '0.12');
        var rot = leaf.dataset.rot || '0';
        leaf.style.transform = 'translateY(' + (y * speed) + 'px) rotate(' + rot + 'deg)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) { requestAnimationFrame(updateLeaves); ticking = true; }
    }, { passive: true });
    updateLeaves();
  }

  /* FAQ analytics-free toggle icon is handled purely by CSS (details/summary) */

  /* live IST clock */
  var clockEl = document.getElementById('ist-clock');
  if (clockEl) {
    function updateClock(){
      clockEl.textContent = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* dark/light theme toggle */
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    function syncThemeIcon(){
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.textContent = isLight ? '\u2600' : '\u263D';
    }
    syncThemeIcon();
    themeBtn.addEventListener('click', function(){
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme','dark'); }
      else { document.documentElement.setAttribute('data-theme','light'); localStorage.setItem('theme','light'); }
      syncThemeIcon();
    });
  }

  /* spider companion — travels from ~5% to ~75% down the viewport as the page scrolls */
  var spider = document.querySelector('.spider-companion');
  if (spider) {
    function updateSpider(){
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      spider.style.top = (5 + progress * 70) + '%';
    }
    window.addEventListener('scroll', function(){ requestAnimationFrame(updateSpider); }, { passive: true });
    updateSpider();
  }

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    if (!reduce) {
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (document.querySelector('.eyebrow')) heroTl.from('.eyebrow', { y: 14, opacity: 0, duration: .6 });
      if (document.querySelector('.hero h1')) heroTl.from('.hero h1', { y: 24, opacity: 0, duration: .8 }, '-=.35');
      if (document.querySelector('.hero .tagline')) heroTl.from('.hero .tagline', { y: 16, opacity: 0, duration: .7 }, '-=.5');
      if (document.querySelector('.hero-panel')) heroTl.from('.hero-panel', { y: 24, opacity: 0, duration: .9 }, '-=.5');
    }

    var path = document.querySelector('.vine-path');
    if (path) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = reduce ? 0 : len;
      if (!reduce) {
        gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', delay: 1.1 });
        gsap.to('.node', { opacity: 1, stagger: .15, duration: .4, delay: 2.4 });
      } else {
        gsap.set('.node', { opacity: 1 });
      }
    }

    if (!reduce) {
      gsap.utils.toArray('.reveal').forEach(function(el){
        gsap.from(el, { y: 26, opacity: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      document.querySelectorAll('.marquee-wrap').forEach(function(el){
        gsap.from(el, { opacity: 0, duration: 1, scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
      document.querySelectorAll('.code-panel .code-line').forEach(function(line, i){
        gsap.from(line, { opacity: 0, x: -8, duration: .4, delay: i * .12,
          scrollTrigger: { trigger: line.closest('.code-panel'), start: 'top 80%' } });
      });
    } else {
      document.querySelectorAll('.code-panel .code-line').forEach(function(line){ line.style.opacity = 1; });
    }

    /* root/branch background motif — each path grows as its region scrolls through view */
    document.querySelectorAll('.roots-svg').forEach(function(svg){
      var paths = svg.querySelectorAll('path');
      paths.forEach(function(path){
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = reduce ? 0 : len;
      });
      if (!reduce) {
        gsap.to(paths, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: svg, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        });
      }
    });

    document.querySelectorAll('.metric-num').forEach(function(el){
      var target = +el.dataset.count;
      if (reduce) { el.textContent = target; return; }
      gsap.to(el, {
        textContent: target, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }
})();
