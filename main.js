/* Vrushank Soni — lightweight, dependency-free interactions.
   No external animation libraries: fast first paint, nothing to "not load". */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  var themeBtn = document.querySelector('.theme-toggle');
  function syncIcon(){ if(themeBtn) themeBtn.textContent = document.documentElement.getAttribute('data-theme')==='light' ? '☀' : '☽'; }
  syncIcon();
  if (themeBtn) themeBtn.addEventListener('click', function(){
    var light = document.documentElement.getAttribute('data-theme')==='light';
    if(light){ document.documentElement.removeAttribute('data-theme'); try{localStorage.setItem('theme','dark');}catch(e){} }
    else { document.documentElement.setAttribute('data-theme','light'); try{localStorage.setItem('theme','light');}catch(e){} }
    syncIcon();
  });

  /* live IST clock */
  var clockEl = document.getElementById('ist-clock');
  if (clockEl){ var tick=function(){ clockEl.textContent=new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour12:false}); }; tick(); setInterval(tick,1000); }

  /* footer year */
  document.querySelectorAll('#year').forEach(function(el){ el.textContent=new Date().getFullYear(); });

  /* inert placeholder links */
  document.querySelectorAll('a[aria-disabled="true"]').forEach(function(a){ a.addEventListener('click',function(e){e.preventDefault();}); });

  /* cursor-reactive glass highlight */
  document.querySelectorAll('.glass').forEach(function(el){
    el.addEventListener('mousemove', function(e){ var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%'); });
  });

  /* scroll progress */
  var bar=document.querySelector('.scroll-progress');
  if(bar){ var sp=function(){ var h=document.documentElement.scrollHeight-window.innerHeight; bar.style.width=(h>0?window.scrollY/h*100:0)+'%'; };
    window.addEventListener('scroll',sp,{passive:true}); sp(); }

  /* reveal on scroll */
  var reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(ents){ ents.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },
      {rootMargin:'0px 0px -7% 0px', threshold:0.08});
    reveals.forEach(function(el){ io.observe(el); });
  } else { reveals.forEach(function(el){ el.classList.add('in'); }); }

  /* count-up metrics */
  function countUp(el){ var target=+el.dataset.count, start=null, dur=1500;
    function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1); var e=0.5-Math.cos(p*Math.PI)/2;
      el.textContent=Math.round(target*e); if(p<1)requestAnimationFrame(step); } requestAnimationFrame(step); }
  var nums=document.querySelectorAll('.metric-num');
  if('IntersectionObserver' in window && !reduce){
    var io2=new IntersectionObserver(function(ents){ ents.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); io2.unobserve(e.target); } }); },{threshold:0.5});
    nums.forEach(function(el){ io2.observe(el); });
  } else { nums.forEach(function(el){ el.textContent=el.dataset.count; }); }
})();
