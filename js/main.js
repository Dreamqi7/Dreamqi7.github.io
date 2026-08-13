/* ============================================================
   主页交互脚本：主题切换 / 目录高亮 / 入场动画
   一般不需要改这个文件
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. 明暗主题 ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}

  var prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- 2. 元素滚动进入视口时淡入 ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 3. 侧边目录跟随滚动高亮 ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.sidenav a')
  );
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function syncNav() {
    var pos = window.scrollY + window.innerHeight * 0.28;
    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec.offsetTop <= pos) current = i;
    });
    navLinks.forEach(function (a, i) {
      a.classList.toggle('active', i === current);
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { syncNav(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  syncNav();

  /* ---------- 4. 论文按主题筛选 ---------- */
  var fbtns = Array.prototype.slice.call(document.querySelectorAll('.fbtn'));
  var pubs = Array.prototype.slice.call(document.querySelectorAll('#publist .pub'));
  var countEl = document.getElementById('filterCount');

  function applyFilter(topic) {
    var shown = 0;
    pubs.forEach(function (p) {
      var match = topic === 'all' || p.getAttribute('data-topic') === topic;
      p.hidden = !match;
      if (match) shown++;
    });
    if (countEl) {
      countEl.textContent = shown === pubs.length
        ? 'Showing all ' + pubs.length + ' publications.'
        : 'Showing ' + shown + ' of ' + pubs.length + ' publications.';
    }
  }

  fbtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      fbtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });
  if (pubs.length) applyFilter('all');

  /* ---------- 5. 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
