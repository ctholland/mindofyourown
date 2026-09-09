(function () {
  'use strict';

  var root = './';

  // ── NAV CONTENT (single source, desktop bar + mobile drawer both read this) ──
  var nav = [
    { label: 'Home', href: root + 'index.html' },
    { label: 'The Work', href: root + 'index.html#work' },
    { label: 'AI Consulting', href: root + 'ai-consulting.html' },
    { label: 'Interviews', href: root + 'index.html#work' },
    { label: 'Books', href: root + 'book.html' },
    { label: 'Guide', href: root + 'guide.html' },
    { label: 'NLP & Influences', href: root + 'bio.html' },
    { label: 'About', href: root + 'bio.html' }
  ];

  function buildDesktopLinks() {
    return nav.map(function (item) {
      return '<a href="' + item.href + '" class="dn-link">' + item.label + '</a>';
    }).join('\n');
  }

  function buildMobileLinks() {
    return nav.map(function (item) {
      return '<a href="' + item.href + '" class="ch-link">' + item.label + '</a>';
    }).join('\n');
  }

  // ── CSS ───────────────────────────────────────────────────
  var css = `
    .site-nav {
      position: sticky; top: 0; z-index: 9000;
      background: #000000;
      padding: 0 40px; min-height: 84px;
      display: flex; align-items: center; justify-content: space-between;
      gap: 24px;
    }
    .site-nav .nav-logo img { height: 30px; width: auto; display:block; filter:brightness(1.12); flex-shrink:0; }

    /* Desktop horizontal bar */
    .desktop-nav { display: flex; align-items: center; gap: 30px; flex: 1; justify-content: center; }
    .dn-link {
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.82);
      text-decoration: none; white-space: nowrap;
    }
    .dn-link:hover { color: #4169E1; }
    .nav-right { display: flex; align-items: center; gap: 18px; flex-shrink: 0; }
    .nav-search-btn {
      background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer;
      width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
    }
    .nav-search-btn:hover { color: #fff; }
    .nav-cta {
      display: inline-block; padding: 11px 22px; background: #4169E1; color: #fff;
      text-decoration: none; font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 14px; font-weight: 600; border-radius: 4px; white-space: nowrap;
    }
    .nav-cta:hover { background: #5a7fff; }

    /* Hamburger (mobile only) */
    .ch-btn {
      display: none;
      width: 44px; height: 44px;
      background: transparent; border: 0; cursor: pointer;
      color: #fff;
      align-items: center; justify-content: center;
      padding: 0; flex-shrink: 0;
    }
    .ch-icon { display: block; width: 24px; height: 2px; background: currentColor; position: relative; transition: background .2s; }
    .ch-icon::before, .ch-icon::after { content: ''; position: absolute; left: 0; width: 24px; height: 2px; background: currentColor; transition: transform .25s; }
    .ch-icon::before { top: -7px; }
    .ch-icon::after  { top: 7px; }
    .ch-btn[aria-expanded="true"] .ch-icon { background: transparent; }
    .ch-btn[aria-expanded="true"] .ch-icon::before { transform: rotate(45deg) translate(5px,5px); }
    .ch-btn[aria-expanded="true"] .ch-icon::after  { transform: rotate(-45deg) translate(5px,-5px); }

    .ch-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 9998;
      opacity: 0; pointer-events: none; transition: opacity .25s;
    }
    .ch-overlay.is-open { opacity: 1; pointer-events: auto; }
    .ch-panel {
      position: fixed; top: 0; right: 0; height: 100%;
      width: min(360px, 88vw);
      background: #000000; border-left: 1px solid rgba(255,255,255,0.1);
      color: #fff; z-index: 9999;
      transform: translateX(100%);
      transition: transform .28s cubic-bezier(.4,0,.2,1);
      padding: 90px 30px 30px;
      overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,.4);
      display: none; flex-direction: column;
    }
    .ch-panel.is-open { transform: translateX(0); }
    .ch-link {
      display: block; width: 100%; padding: 15px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      color: #fff; text-decoration: none;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.92rem; font-weight: 500;
      transition: color .15s;
    }
    .ch-link:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
    .ch-link:hover { color: #4169E1; }
    .ch-cta {
      margin-top: 24px; text-align: center;
      display: block; padding: 14px; background: #4169E1; color: #fff;
      text-decoration: none; font-weight: 600; font-size: 0.92rem; border-radius: 4px;
    }

    @media (max-width: 1080px) {
      .desktop-nav, .nav-search-btn, .nav-cta.desktop-only { display: none; }
      .ch-btn { display: flex; }
      .ch-panel { display: flex; }
      .site-nav { padding: 0 20px; min-height: 68px; }
      .site-nav .nav-logo img { height: 24px; }
    }

    /* ============ SHARED FOOTER ============ */
    .site-footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 56px 40px 40px;
      background: #000;
    }
    .sf-grid {
      max-width: 1300px; margin: 0 auto;
      display: grid; grid-template-columns: 1.1fr 1fr 1.1fr; gap: 40px;
      align-items: start;
    }
    .sf-brand img { height: 24px; width: auto; margin-bottom: 12px; filter: brightness(1.12); }
    .sf-tagline { font-family: var(--font-body, 'Inter', sans-serif); font-size: 13.5px; color: rgba(255,255,255,0.5); }
    .sf-links { display: flex; flex-direction: column; gap: 11px; }
    .sf-links a {
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 14px; font-weight: 500;
      color: rgba(255,255,255,0.7); text-decoration: none;
    }
    .sf-links a:hover { color: #4169E1; }
    .sf-loop-label { font-family: var(--font-body, 'Inter', sans-serif); font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 12px; }
    .sf-form { display: flex; gap: 8px; }
    .sf-form input {
      flex: 1; min-width: 0; padding: 11px 14px; background: #0c0d10; border: 1px solid rgba(255,255,255,0.15);
      color: #fff; border-radius: 4px; font-size: 13.5px; font-family: var(--font-body, 'Inter', sans-serif);
    }
    .sf-form button {
      padding: 11px 20px; background: #4169E1; color: #fff; border: none; border-radius: 4px;
      font-weight: 600; font-size: 13.5px; cursor: pointer; font-family: var(--font-body, 'Inter', sans-serif); white-space: nowrap;
    }
    .sf-bottom {
      max-width: 1300px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 12px; color: rgba(255,255,255,0.35);
    }

    @media (max-width: 900px) {
      .sf-grid { grid-template-columns: 1fr; gap: 32px; }
      .site-footer { padding: 44px 24px 32px; }
    }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── BUILD NAV HTML ────────────────────────────────────────
  var navHTML =
    '<div class="site-nav">' +
      '<div class="nav-logo"><a href="' + root + 'index.html"><img src="' + root + 'images/moyo-wordmark-white.png" alt="MOYO - Mind Of Your Own"></a></div>' +
      '<nav class="desktop-nav" aria-label="Primary">' + buildDesktopLinks() + '</nav>' +
      '<div class="nav-right">' +
        '<button class="nav-search-btn" type="button" aria-label="Search" title="Search (coming soon)">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '</button>' +
        '<a href="' + root + 'index.html#newsletter" class="nav-cta desktop-only">Get Started</a>' +
      '</div>' +
      '<button class="ch-btn" id="chBtn" aria-label="Open menu" aria-expanded="false" aria-controls="chPanel">' +
        '<span class="ch-icon" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<div class="ch-overlay" id="chOverlay"></div>' +
    '<nav class="ch-panel" id="chPanel" aria-label="Mobile navigation">' +
      buildMobileLinks() +
      '<a href="' + root + 'index.html#newsletter" class="ch-cta">Get Started</a>' +
    '</nav>';

  var navWrapper = document.createElement('div');
  navWrapper.innerHTML = navHTML;
  var firstChild = document.body.firstChild;
  while (navWrapper.firstChild) {
    document.body.insertBefore(navWrapper.firstChild, firstChild);
  }

  // ── BUILD FOOTER HTML ─────────────────────────────────────
  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="sf-grid">' +
        '<div class="sf-brand">' +
          '<img src="' + root + 'images/moyo-wordmark-white.png" alt="Mind Of Your Own">' +
          '<div class="sf-tagline">A more conscious world is possible.</div>' +
        '</div>' +
        '<div class="sf-links">' +
          '<a href="mailto:info@mindofyourown.com">Contact</a>' +
          '<a href="' + root + 'index.html#newsletter">Newsletter</a>' +
          '<a href="#" title="Not yet live">YouTube</a>' +
          '<a href="' + root + 'press.html">Press</a>' +
          '<a href="#" title="Not yet published">Privacy</a>' +
          '<a href="#" title="Not yet published">Terms</a>' +
        '</div>' +
        '<div>' +
          '<div class="sf-loop-label">Stay in the loop.</div>' +
          '<div class="sf-form">' +
            '<input type="email" placeholder="Your email">' +
            '<button type="button">Join</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="sf-bottom">&copy; 2026 Mind Of Your Own&reg;. Fairfield &amp; Co. LLC</div>' +
    '</footer>';

  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── WIRE UP MOBILE DRAWER ─────────────────────────────────
  var btn = document.getElementById('chBtn');
  var panel = document.getElementById('chPanel');
  var overlay = document.getElementById('chOverlay');

  function openNav() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
  }
  function closeNav() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    btn.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
  });
  overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
  panel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

})();
