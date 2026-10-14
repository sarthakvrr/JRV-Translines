(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var preloader = document.getElementById('preloader');
  var totop = document.getElementById('totop');
  var burger = document.getElementById('burger');
  var links = document.getElementById('links');
  var lightbox = document.getElementById('lightbox');
  var lbimg = document.getElementById('lbimg');
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
  setTimeout(function () { if (preloader) preloader.classList.add('done'); }, reduce ? 0 : 800);
  setTimeout(function () { if (preloader) preloader.classList.add('done'); }, 2600);
  var ticking = false;
  function onScroll() {
    var top = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('solid', top > 60);
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? top / max : 0) + ')';
    if (totop) totop.classList.toggle('show', top > 800);
    if (!reduce && top < window.innerHeight * 1.4) {
      var bg = document.querySelector('.hero-bg');
      var road = document.querySelector('.road');
      if (bg) bg.style.transform = 'translate3d(0,' + (top * 0.28) + 'px,0)';
      if (road) road.style.transform = 'translateX(-50%) perspective(320px) rotateX(64deg) translateY(' + (top * 0.14) + 'px)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  var rvs = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (parseFloat(e.target.getAttribute('data-rv')) || 0) + 's';
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    rvs.forEach(function (el) { io.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add('in'); });
  }
  var rio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.rule').forEach(function (r) { rio.observe(r); });
  function countUp(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    var suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = end.toLocaleString() + suf; return; }
    var s = null;
    requestAnimationFrame(function step(t) {
      if (s === null) s = t;
      var p = Math.min((t - s) / 1700, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + suf;
      if (p < 1) requestAnimationFrame(step);
    });
  }
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (c) { cio.observe(c); });
  var bio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      setTimeout(function () { el.style.width = el.getAttribute('data-bar') + '%'; }, 220);
      bio.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-bar]').forEach(function (b) { bio.observe(b); });
  if (burger) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('on');
      if (links) links.classList.toggle('open');
    });
    if (links) links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { burger.classList.remove('on'); links.classList.remove('open'); }
    });
  }
  if (totop) totop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  function closeLb() { if (lightbox) lightbox.classList.remove('on'); }
  document.querySelectorAll('.ph').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var src = fig.getAttribute('data-full');
      if (!src || !lightbox) return;
      lbimg.src = src;
      lightbox.classList.add('on');
    });
  });
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target !== lbimg) closeLb(); });
  var lbc = document.getElementById('lbclose');
  if (lbc) lbc.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
})();