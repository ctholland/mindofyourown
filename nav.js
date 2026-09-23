(function () {
  'use strict';

  var root = './';

  // ── NAV CONTENT (single source, desktop bar + mobile drawer both read this) ──
  var nav = [
    { label: 'Home', href: root + 'index.html' },
    { label: 'Consulting', href: '#', children: [
        { label: 'AI Consulting', href: root + 'ai-consulting.html' },
        { label: 'Digital Nomad', href: root + 'digital-nomad.html' },
        { label: 'Coaching + Conversation', href: root + 'coaching-conversation.html' }
    ]},
    { label: 'Podcast', href: root + 'podcast.html' },
    { label: 'Interviews', href: root + 'index.html#work' },
    { label: 'Publications', href: '#', children: [
        { label: 'Mind Of Your Own', href: root + 'book.html' },
        { label: 'Survival Guide for Democracy', href: root + 'guide.html' },
        { label: 'Writing', href: root + 'writing.html' }
    ]},
    { label: 'NLP & Influences', href: root + 'about.html' },
    { label: 'About', href: root + 'about.html' }
  ];

  function buildDesktopLinks() {
    return nav.map(function (item) {
      if (item.children) {
        return '<div class="dn-item dn-has-dd">' +
          '<a href="' + item.href + '" class="dn-link dn-parent">' + item.label + ' <span class="dn-chevron">&#9662;</span></a>' +
          '<div class="dn-dd">' +
          item.children.map(function (child) {
            return '<a href="' + child.href + '" class="dn-dd-link">' + child.label + '</a>';
          }).join('') +
          '</div>' +
        '</div>';
      }
      return '<a href="' + item.href + '" class="dn-link">' + item.label + '</a>';
    }).join('\n');
  }

  function buildMobileLinks() {
    var links = [];
    nav.forEach(function (item) {
      var parentClass = item.children ? 'ch-link ch-parent-link' : 'ch-link';
      links.push('<a href="' + item.href + '" class="' + parentClass + '">' + item.label + (item.children ? ' <span class="ch-chevron">&#9662;</span>' : '') + '</a>');
      if (item.children) {
        item.children.forEach(function (child) {
          links.push('<a href="' + child.href + '" class="ch-link ch-sub-link">' + child.label + '</a>');
        });
      }
    });
    return links.join('\n');
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

    /* Dropdown — "The Work" */
    .dn-item { position: relative; display: flex; align-items: center; }
    .dn-has-dd .dn-dd {
      display: none; position: absolute; top: 100%; left: 0;
      background: #000; border: 1px solid rgba(255,255,255,0.12);
      border-top: 2px solid #4169E1;
      min-width: 240px; z-index: 9100; padding: 6px 0;
    }
    .dn-has-dd:hover .dn-dd { display: block; }
    .ch-parent-link { font-weight: 600; }
    .ch-chevron { font-size: 0.65em; opacity: 0.55; margin-left: 3px; }
    .ch-link.ch-sub-link {
      padding-left: 0;
      padding-top: 4px;
      padding-bottom: 4px;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.52);
      font-weight: 400;
    }
    .ch-link.ch-sub-link::before {
      content: '•';
      margin-right: 8px;
      color: #fff;
    }
    .ch-link.ch-sub-link:hover { color: #8fa3e6; }
    .dn-chevron { font-size: 0.6em; opacity: 0.6; margin-left: 2px; vertical-align: middle; }
    /* Desktop dropdown bullets */
    .dn-dd-link {
      display: block; padding: 6px 18px 6px 4px;
      color: rgba(255,255,255,0.75); text-decoration: none;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 13px; font-weight: 500;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: color 0.15s, background 0.15s;
      white-space: nowrap;
    }
    .dn-dd-link::before {
      content: '•';
      margin-right: 8px;
      color: #fff;
    }
    .dn-dd-link:last-child { border-bottom: none; }
    .dn-dd-link:hover { color: #4169E1; background: rgba(65,105,225,0.08); }
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
      width: min(320px, 82vw);
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
      display: block; width: 100%; padding: 13px 0;
      color: #fff; text-decoration: none;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.86rem; font-weight: 500;
      transition: color .15s;
    }
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

    /* ============ SHARED FOOTER — compact ============ */
    .site-footer {
      padding: 32px 40px 24px;
      background: #000;
    }
    .sf-grid {
      max-width: 1300px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap;
    }
    .sf-brand { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .sf-brand img { height: 20px; width: auto; filter: brightness(1.12); }
    .sf-tagline { font-family: var(--font-body, 'Inter', sans-serif); font-size: 12.5px; color: rgba(255,255,255,0.45); }
    .sf-links { display: flex; flex-wrap: wrap; gap: 8px 20px; }
    .sf-links a {
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 13px; font-weight: 500;
      color: rgba(255,255,255,0.65); text-decoration: none; white-space: nowrap;
    }
    .sf-links a:hover { color: #4169E1; }
    .sf-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; max-width: 340px; }
    .sf-loop-label { font-family: var(--font-body, 'Inter', sans-serif); font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.7); white-space: nowrap; }
    .sf-form { display: flex; gap: 6px; }
    .sf-form input {
      width: 160px; padding: 8px 12px; background: #0c0d10; border: 1px solid rgba(255,255,255,0.15);
      color: #fff; border-radius: 4px; font-size: 12.5px; font-family: var(--font-body, 'Inter', sans-serif);
    }
    .sf-form button {
      padding: 8px 16px; background: #4169E1; color: #fff; border: none; border-radius: 4px;
      font-weight: 600; font-size: 12.5px; cursor: pointer; font-family: var(--font-body, 'Inter', sans-serif); white-space: nowrap;
    }
    .sf-bottom {
      max-width: 1300px; margin: 20px auto 0; padding-top: 16px;
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 11px; color: rgba(255,255,255,0.3);
    }
    .sf-ai-disclosure { color: rgba(255,255,255,0.48); font-style: italic; }

    @media (max-width: 900px) {
      .sf-grid { flex-direction: column; align-items: flex-start; gap: 22px; }
      .sf-links { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; width: 100%; }
      .sf-right { width: 100%; flex-direction: column; align-items: flex-start; gap: 10px; }
      .sf-form { width: 100%; }
      .sf-form input { flex: 1; width: auto; }
      .site-footer { padding: 28px 24px 20px; }
    }

    /* ============ NEWSLETTER: inline footer form states ============ */
    .sf-form input:disabled, .sf-form button:disabled { opacity: 0.55; cursor: default; }
    .sf-form-message {
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 12px; margin-top: 6px; width: 100%;
    }
    .sf-form-message.is-error { color: #ff8a8a; }
    .sf-success {
      font-family: var(--font-body, 'Inter', sans-serif); font-size: 13px; font-weight: 600; color: #8fa3e6;
      line-height: 1.5;
    }

    /* ============ NEWSLETTER: modal ============ */
    .nl-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.72); z-index: 10000;
      display: flex; align-items: center; justify-content: center; padding: 20px;
      opacity: 0; pointer-events: none; transition: opacity .2s ease;
    }
    .nl-overlay.is-open { opacity: 1; pointer-events: auto; }
    .nl-modal {
      background: #000; border: 1px solid rgba(255,255,255,0.14); border-radius: 8px;
      max-width: 420px; width: 100%; padding: 40px 32px 32px; position: relative;
      box-shadow: 0 30px 90px rgba(0,0,0,0.7);
      transform: translateY(14px); transition: transform .22s ease;
    }
    .nl-overlay.is-open .nl-modal { transform: translateY(0); }
    .nl-modal-close {
      position: absolute; top: 12px; right: 12px; width: 34px; height: 34px;
      background: transparent; border: none; color: rgba(255,255,255,0.55);
      font-size: 22px; line-height: 1; cursor: pointer; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
    }
    .nl-modal-close:hover { color: #fff; background: rgba(255,255,255,0.08); }
    .nl-modal-close:focus-visible { outline: 2px solid #4169E1; outline-offset: 2px; }
    .nl-modal h3 {
      font-family: var(--font-display, 'Playfair Display', serif); font-weight: 700;
      font-size: 24px; color: #fff; margin: 0 0 22px;
    }
    .nl-modal-form { display: flex; flex-direction: column; gap: 12px; }
    .nl-modal-form input {
      padding: 13px 14px; background: #0c0d10; border: 1px solid rgba(255,255,255,0.16);
      color: #fff; border-radius: 4px; font-size: 14.5px; font-family: var(--font-body, 'Inter', sans-serif);
    }
    .nl-modal-form input:focus-visible { outline: 2px solid #4169E1; outline-offset: 1px; }
    .nl-modal-form button {
      padding: 13px; background: #4169E1; color: #fff; border: none; border-radius: 4px;
      font-weight: 600; font-size: 14.5px; cursor: pointer; font-family: var(--font-body, 'Inter', sans-serif);
    }
    .nl-modal-form button:hover { background: #5a7fff; }
    .nl-modal-form button:focus-visible { outline: 2px solid #8fa3e6; outline-offset: 2px; }
    .nl-modal-form button:disabled { opacity: 0.6; cursor: default; }
    .nl-modal-privacy { font-size: 12px; color: rgba(255,255,255,0.45); margin: 16px 0 0; font-family: var(--font-body, 'Inter', sans-serif); }
    .nl-modal-message { font-size: 13.5px; margin-top: 16px; font-family: var(--font-body, 'Inter', sans-serif); }
    .nl-modal-message.is-error { color: #ff8a8a; }
    .nl-modal-message.is-success { color: #8fa3e6; font-weight: 600; }
    .nl-modal h3 sup, .sf-success sup, .nl-modal-message sup { font-size: 0.6em; }

    @media (max-width: 480px) {
      .nl-modal { padding: 34px 22px 26px; }
    }

    /* ============ CONTACT MODAL ============ */
    .cm-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.88);
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.22s ease;
    }
    .cm-overlay.is-open { opacity: 1; pointer-events: all; }
    .cm-box {
      position: relative; width: 100%; max-width: 540px;
      background: #0b0b10; border: 1px solid rgba(255,255,255,0.10);
      border-radius: 4px; padding: 48px 44px 40px;
      max-height: 90vh; overflow-y: auto;
      transform: translateY(12px);
      transition: transform 0.22s ease;
    }
    .cm-overlay.is-open .cm-box { transform: translateY(0); }
    .cm-accent-bar {
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      border-radius: 4px 4px 0 0;
    }
    .cm-accent-blue { background: #4169E1; }
    .cm-accent-teal { background: #3ecdc4; }
    .cm-close {
      position: absolute; top: 16px; right: 18px;
      background: none; border: none; color: rgba(255,255,255,0.4);
      font-size: 22px; cursor: pointer; line-height: 1; padding: 4px 8px;
      font-family: var(--font-body,'Inter',sans-serif);
      transition: color 0.15s;
    }
    .cm-close:hover { color: #fff; }
    .cm-eyebrow {
      font-family: var(--font-label,'Oswald',sans-serif);
      font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
      text-transform: uppercase; color: #8fa3e6; margin: 0 0 10px;
    }
    .cm-eyebrow-teal { color: #3ecdc4; }
    .cm-hed {
      font-family: var(--font-display,'Playfair Display',serif);
      font-size: 26px; font-weight: 700; color: #fff;
      margin: 0 0 28px; line-height: 1.2;
    }
    .cm-sub { font-size: 14px; color: rgba(255,255,255,0.55); margin: -18px 0 24px; }
    .cm-form-inner { display: none; }
    .cm-form-inner.is-active { display: block; }
    .cm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .cm-field { margin-bottom: 16px; }
    .cm-field label {
      display: block; font-family: var(--font-label,'Oswald',sans-serif);
      font-size: 9.5px; font-weight: 600; letter-spacing: 0.18em;
      text-transform: uppercase; color: rgba(255,255,255,0.45);
      margin-bottom: 7px;
    }
    .cm-field input[type="text"],
    .cm-field input[type="email"],
    .cm-field textarea {
      width: 100%; padding: 10px 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 3px; color: #fff; font-size: 14px;
      font-family: var(--font-body,'Inter',sans-serif);
      transition: border-color 0.15s;
    }
    .cm-field input:focus, .cm-field textarea:focus {
      outline: none; border-color: rgba(65,105,225,0.55);
    }
    .cm-field textarea { resize: vertical; min-height: 80px; }
    .cm-radio-row { display: flex; gap: 20px; flex-wrap: wrap; padding-top: 4px; }
    .cm-radio, .cm-check {
      display: flex; align-items: center; gap: 8px;
      font-size: 13.5px; color: rgba(255,255,255,0.75);
      font-family: var(--font-body,'Inter',sans-serif); cursor: pointer;
    }
    .cm-radio input, .cm-check input { accent-color: #4169E1; width: 15px; height: 15px; cursor: pointer; }
    .cm-check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; padding-top: 4px; }
    .cm-hidden { display: none; }
    .cm-submit {
      display: block; width: 100%; padding: 14px;
      background: #4169E1; color: #fff; border: none; border-radius: 3px;
      font-family: var(--font-body,'Inter',sans-serif);
      font-size: 13px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; cursor: pointer; margin-top: 8px;
      transition: background 0.2s;
    }
    .cm-submit:hover { background: #5a7fff; }
    .cm-submit:disabled { opacity: 0.55; cursor: default; }
    .cm-submit-teal { background: #3ecdc4; color: #000; }
    .cm-submit-teal:hover { background: #52ddd4; }
    .cm-status { font-size: 13px; margin-top: 14px; text-align: center; min-height: 20px; font-family: var(--font-body,'Inter',sans-serif); }
    .cm-status.is-success { color: #8fa3e6; font-weight: 600; }
    .cm-status.is-error { color: #ff8a8a; }

    @media (max-width: 560px) {
      .cm-box { padding: 40px 24px 32px; }
      .cm-row { grid-template-columns: 1fr; }
      .cm-check-grid { grid-template-columns: 1fr; }
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
        '<a href="#" class="nav-cta desktop-only" data-contact-modal="general">Get Started</a>' +
      '</div>' +
      '<button class="ch-btn" id="chBtn" aria-label="Open menu" aria-expanded="false" aria-controls="chPanel">' +
        '<span class="ch-icon" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<div class="ch-overlay" id="chOverlay"></div>' +
    '<nav class="ch-panel" id="chPanel" aria-label="Mobile navigation">' +
      buildMobileLinks() +
      '<a href="#" class="ch-cta" data-contact-modal="general">Get Started</a>' +
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
          '<span class="sf-tagline">A more conscious world is possible.</span>' +
        '</div>' +
        '<div class="sf-links">' +
          '<a href="mailto:info@mindofyourown.com">Contact</a>' +
          '<a href="#" id="footerNewsletterLink">Newsletter</a>' +
          '<a href="#" title="Not yet live">YouTube</a>' +
          '<a href="' + root + 'press.html">Press</a>' +
          '<a href="#" title="Not yet published">Privacy</a>' +
          '<a href="#" title="Not yet published">Terms</a>' +
        '</div>' +
        '<div class="sf-right" id="newsletter">' +
          '<span class="sf-loop-label">Stay in the loop.</span>' +
          '<form class="sf-form" id="sfForm" novalidate>' +
            '<input type="email" id="sfEmail" placeholder="Your email" aria-label="Email address" required>' +
            '<button type="submit" id="sfSubmit">Join</button>' +
          '</form>' +
          '<div class="sf-form-message" id="sfMessage" role="status" aria-live="polite"></div>' +
        '</div>' +
      '</div>' +
      '<div class="sf-bottom">&copy; 2026 Mind Of Your Own&reg;. Fairfield &amp; Co. LLC &nbsp;&middot;&nbsp; <span class="sf-ai-disclosure">AI-augmented imagery. Human-authored ideas.</span></div>' +
    '</footer>' +
    '<div class="nl-overlay" id="nlOverlay">' +
      '<div class="nl-modal" id="nlModal" role="dialog" aria-modal="true" aria-labelledby="nlModalTitle">' +
        '<button type="button" class="nl-modal-close" id="nlModalClose" aria-label="Close">&times;</button>' +
        '<h3 id="nlModalTitle">Join Mind Of Your Own<sup>&reg;</sup></h3>' +
        '<form class="nl-modal-form" id="nlModalForm" novalidate>' +
          '<input type="email" id="nlModalEmail" placeholder="Your email" aria-label="Email address" required>' +
          '<button type="submit" id="nlModalSubmit">Join</button>' +
        '</form>' +
        '<p class="nl-modal-privacy" id="nlModalPrivacy">Free to join. Unsubscribe anytime.</p>' +
        '<div class="nl-modal-message" id="nlModalMessage" role="status" aria-live="polite"></div>' +
      '</div>' +
    '</div>';

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

  // ── NEWSLETTER: shared helpers ────────────────────────────
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(email) {
    return EMAIL_RE.test(email);
  }

  function submitEmail(email) {
    return fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, tags: ['Newsletter'] })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        return { ok: res.ok, data: data };
      });
    });
  }

  // ── NEWSLETTER: inline footer form ────────────────────────
  var sfForm = document.getElementById('sfForm');
  var sfEmail = document.getElementById('sfEmail');
  var sfSubmit = document.getElementById('sfSubmit');
  var sfMessage = document.getElementById('sfMessage');

  if (sfForm) {
    sfForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = sfEmail.value.trim();

      sfMessage.textContent = '';
      sfMessage.className = 'sf-form-message';

      if (!isValidEmail(email)) {
        sfMessage.textContent = 'Please enter a valid email address.';
        sfMessage.className = 'sf-form-message is-error';
        return;
      }

      var originalLabel = sfSubmit.textContent;
      sfSubmit.disabled = true;
      sfEmail.disabled = true;
      sfSubmit.textContent = '...';

      submitEmail(email).then(function (result) {
        if (result.ok) {
          var loopLabel = document.querySelector('.sf-loop-label');
          if (loopLabel) loopLabel.style.display = 'none';
          sfForm.outerHTML = '<span class="sf-success">You\u2019re in. Welcome to Mind Of Your Own<sup>&reg;</sup>.</span>';
        } else {
          sfSubmit.disabled = false;
          sfEmail.disabled = false;
          sfSubmit.textContent = originalLabel;
          sfMessage.textContent = (result.data && result.data.error) || 'Something went wrong. Please try again.';
          sfMessage.className = 'sf-form-message is-error';
        }
      }).catch(function () {
        sfSubmit.disabled = false;
        sfEmail.disabled = false;
        sfSubmit.textContent = originalLabel;
        sfMessage.textContent = 'Something went wrong. Please try again.';
        sfMessage.className = 'sf-form-message is-error';
      });
    });
  }

  // ── NEWSLETTER: modal ──────────────────────────────────────
  var nlOverlay = document.getElementById('nlOverlay');
  var nlModal = document.getElementById('nlModal');
  var nlClose = document.getElementById('nlModalClose');
  var nlForm = document.getElementById('nlModalForm');
  var nlEmail = document.getElementById('nlModalEmail');
  var nlSubmit = document.getElementById('nlModalSubmit');
  var nlPrivacy = document.getElementById('nlModalPrivacy');
  var nlMessage = document.getElementById('nlModalMessage');
  var nlTrigger = document.getElementById('footerNewsletterLink');
  var nlLastFocused = null;

  function nlFocusable() {
    return Array.prototype.slice.call(
      nlModal.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  function nlKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      var f = nlFocusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openModal() {
    nlLastFocused = document.activeElement;
    nlOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    var f = nlFocusable();
    if (f.length) f[0].focus();
    document.addEventListener('keydown', nlKeydown);
  }

  function closeModal() {
    nlOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', nlKeydown);
    if (nlLastFocused && typeof nlLastFocused.focus === 'function') {
      nlLastFocused.focus();
    }
  }

  if (nlTrigger) {
    nlTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }
  if (nlClose) nlClose.addEventListener('click', closeModal);
  if (nlOverlay) {
    nlOverlay.addEventListener('click', function (e) {
      if (e.target === nlOverlay) closeModal();
    });
  }

  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = nlEmail.value.trim();

      nlMessage.textContent = '';
      nlMessage.className = 'nl-modal-message';

      if (!isValidEmail(email)) {
        nlMessage.textContent = 'Please enter a valid email address.';
        nlMessage.className = 'nl-modal-message is-error';
        return;
      }

      var originalLabel = nlSubmit.textContent;
      nlSubmit.disabled = true;
      nlEmail.disabled = true;
      nlSubmit.textContent = '...';

      submitEmail(email).then(function (result) {
        if (result.ok) {
          nlForm.style.display = 'none';
          if (nlPrivacy) nlPrivacy.style.display = 'none';
          nlMessage.innerHTML = 'You\u2019re in. Welcome to Mind Of Your Own<sup>&reg;</sup>.';
          nlMessage.className = 'nl-modal-message is-success';
        } else {
          nlSubmit.disabled = false;
          nlEmail.disabled = false;
          nlSubmit.textContent = originalLabel;
          nlMessage.textContent = (result.data && result.data.error) || 'Something went wrong. Please try again.';
          nlMessage.className = 'nl-modal-message is-error';
        }
      }).catch(function () {
        nlSubmit.disabled = false;
        nlEmail.disabled = false;
        nlSubmit.textContent = originalLabel;
        nlMessage.textContent = 'Something went wrong. Please try again.';
        nlMessage.className = 'nl-modal-message is-error';
      });
    });
  }

  // ── CONTACT MODAL ─────────────────────────────────────────
  var contactModalHTML =
    '<div class="cm-overlay" id="cmOverlay" role="dialog" aria-modal="true" aria-hidden="true">' +
      '<div class="cm-box">' +
        '<button class="cm-close" id="cmClose" aria-label="Close">&times;</button>' +

        // AI Consulting
        '<div class="cm-form-inner" id="cmf-ai-consulting">' +
          '<div class="cm-accent-bar cm-accent-blue"></div>' +
          '<p class="cm-eyebrow">AI Consulting &mdash; Work With Me</p>' +
          '<h2 class="cm-hed">Let\u2019s talk AI.</h2>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label>Name</label><input type="text" name="name" placeholder="Your name" required></div>' +
            '<div class="cm-field"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required></div>' +
          '</div>' +
          '<div class="cm-field"><label>I am a</label>' +
            '<div class="cm-radio-row">' +
              '<label class="cm-radio"><input type="radio" name="client-type" value="Individual"> Individual</label>' +
              '<label class="cm-radio"><input type="radio" name="client-type" value="Organization"> Organization</label>' +
            '</div>' +
          '</div>' +
          '<div class="cm-field"><label>What are you working on?</label><textarea name="message" rows="4" placeholder="Tell me what\u2019s going on. No need to be formal."></textarea></div>' +
          '<button class="cm-submit" type="button" data-cm-submit>Send My Inquiry \u2192</button>' +
          '<div class="cm-status" role="status"></div>' +
        '</div>' +

        // Digital Nomad
        '<div class="cm-form-inner" id="cmf-digital-nomad">' +
          '<div class="cm-accent-bar cm-accent-teal"></div>' +
          '<p class="cm-eyebrow cm-eyebrow-teal">Digital Nomad &mdash; Work With Me</p>' +
          '<h2 class="cm-hed">Let\u2019s get organized.</h2>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label>Name</label><input type="text" name="name" placeholder="Your name" required></div>' +
            '<div class="cm-field"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required></div>' +
          '</div>' +
          '<div class="cm-field"><label>Platform</label>' +
            '<div class="cm-radio-row">' +
              '<label class="cm-radio"><input type="radio" name="platform" value="Mac"> Mac</label>' +
              '<label class="cm-radio"><input type="radio" name="platform" value="Windows"> Windows</label>' +
              '<label class="cm-radio"><input type="radio" name="platform" value="Both"> Both</label>' +
            '</div>' +
          '</div>' +
          '<div class="cm-field"><label>What needs organizing?</label>' +
            '<div class="cm-check-grid">' +
              '<label class="cm-check"><input type="checkbox" value="Files & Documents"> Files &amp; Documents</label>' +
              '<label class="cm-check"><input type="checkbox" value="Email & Inbox"> Email &amp; Inbox</label>' +
              '<label class="cm-check"><input type="checkbox" value="Projects & Research"> Projects &amp; Research</label>' +
              '<label class="cm-check"><input type="checkbox" value="Creative Archive"> Creative Archive</label>' +
              '<label class="cm-check"><input type="checkbox" value="AI Workflow Setup"> AI Workflow Setup</label>' +
            '</div>' +
          '</div>' +
          '<div class="cm-field"><label>Tell me about your situation</label><textarea name="message" rows="3" placeholder="What\u2019s the biggest pain point right now?"></textarea></div>' +
          '<button class="cm-submit cm-submit-teal" type="button" data-cm-submit>Send My Inquiry \u2192</button>' +
          '<div class="cm-status" role="status"></div>' +
        '</div>' +

        // General
        '<div class="cm-form-inner" id="cmf-general">' +
          '<div class="cm-accent-bar cm-accent-blue"></div>' +
          '<p class="cm-eyebrow">Get Started</p>' +
          '<h2 class="cm-hed">Let\u2019s connect.</h2>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label>Name</label><input type="text" name="name" placeholder="Your name" required></div>' +
            '<div class="cm-field"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required></div>' +
          '</div>' +
          '<div class="cm-field"><label>What\u2019s on your mind?</label><textarea name="message" rows="3" placeholder="No need to be formal."></textarea></div>' +
          '<button class="cm-submit" type="button" data-cm-submit>Send \u2192</button>' +
          '<div class="cm-status" role="status"></div>' +
        '</div>' +

        // Book
        '<div class="cm-form-inner" id="cmf-book">' +
          '<div class="cm-accent-bar cm-accent-blue"></div>' +
          '<p class="cm-eyebrow">Mind Of Your Own\u00ae \u2014 The Book</p>' +
          '<h2 class="cm-hed">Get notified when it drops.</h2>' +
          '<p class="cm-sub">The full framework. In development now.</p>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label>Name</label><input type="text" name="name" placeholder="Your name" required></div>' +
            '<div class="cm-field"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required></div>' +
          '</div>' +
          '<button class="cm-submit" type="button" data-cm-submit>Notify Me \u2192</button>' +
          '<div class="cm-status" role="status"></div>' +
        '</div>' +

        // Coaching + Conversation
        '<div class="cm-form-inner" id="cmf-coaching">' +
          '<div class="cm-accent-bar cm-accent-blue"></div>' +
          '<p class="cm-eyebrow">C.T. Holland \u2014 Coaching + Conversation</p>' +
          '<h2 class="cm-hed">Let\u2019s talk.</h2>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label>Name</label><input type="text" name="name" placeholder="Your name" required></div>' +
            '<div class="cm-field"><label>Email</label><input type="email" name="email" placeholder="your@email.com" required></div>' +
          '</div>' +
          '<div class="cm-field"><label>I\u2019m interested in</label>' +
            '<div class="cm-radio-row">' +
              '<label class="cm-radio"><input type="radio" name="session-type" value="Coaching"> Coaching</label>' +
              '<label class="cm-radio"><input type="radio" name="session-type" value="Conversation"> Conversation</label>' +
              '<label class="cm-radio"><input type="radio" name="session-type" value="Not sure yet"> Not sure yet</label>' +
            '</div>' +
          '</div>' +
          '<div class="cm-field"><label>What\u2019s bringing you here?</label><textarea name="message" rows="4" placeholder="No agenda required. Tell me what\u2019s on your mind, or leave this blank."></textarea></div>' +
          '<button class="cm-submit" type="button" data-cm-submit>Send \u2192</button>' +
          '<div class="cm-status" role="status"></div>' +
        '</div>' +

      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', contactModalHTML);

  var cmOverlay = document.getElementById('cmOverlay');
  var cmClose = document.getElementById('cmClose');
  var cmCurrentType = null;

  // Tag map
  var CM_TAGS = {
    'ai-consulting': ['AI Consulting'],
    'digital-nomad': ['Digital Nomad'],
    'general':       ['General Inquiry'],
    'book':          ['Book Notification'],
    'coaching':      ['Coaching Inquiry']
  };

  // Netlify form names for email notification
  var CM_FORM_NAMES = {
    'ai-consulting': 'ai-consulting-inquiry',
    'digital-nomad': 'digital-nomad-inquiry',
    'general':       'general-inquiry',
    'book':          'book-notification',
    'coaching':      'coaching-inquiry'
  };

  window.openContactModal = function(type) {
    // Hide all form variants
    document.querySelectorAll('.cm-form-inner').forEach(function(f) {
      f.classList.remove('is-active');
    });
    // Show requested variant
    var target = document.getElementById('cmf-' + type);
    if (!target) return;
    target.classList.add('is-active');
    // Reset status + fields
    target.querySelector('.cm-status').textContent = '';
    target.querySelector('.cm-status').className = 'cm-status';
    var btn = target.querySelector('[data-cm-submit]');
    if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-original-text') || btn.textContent; }
    cmCurrentType = type;
    cmOverlay.classList.add('is-open');
    cmOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first input
    var firstInput = target.querySelector('input, textarea');
    if (firstInput) setTimeout(function() { firstInput.focus(); }, 60);
  };

  function closeContactModal() {
    cmOverlay.classList.remove('is-open');
    cmOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    cmCurrentType = null;
  }

  cmClose.addEventListener('click', closeContactModal);
  cmOverlay.addEventListener('click', function(e) { if (e.target === cmOverlay) closeContactModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && cmOverlay.classList.contains('is-open')) closeContactModal(); });

  // Wire data-contact-modal triggers (including Get Started nav CTA)
  document.addEventListener('click', function(e) {
    var trigger = e.target.closest('[data-contact-modal]');
    if (trigger) {
      e.preventDefault();
      window.openContactModal(trigger.getAttribute('data-contact-modal'));
    }
  });

  // Form submission handler
  document.querySelectorAll('.cm-form-inner').forEach(function(formEl) {
    var submitBtn = formEl.querySelector('[data-cm-submit]');
    if (!submitBtn) return;
    submitBtn.setAttribute('data-original-text', submitBtn.textContent);

    submitBtn.addEventListener('click', function() {
      var type = cmCurrentType;
      var nameInput = formEl.querySelector('input[name="name"]');
      var emailInput = formEl.querySelector('input[name="email"]');
      var messageInput = formEl.querySelector('textarea[name="message"]');
      var statusEl = formEl.querySelector('.cm-status');

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var message = messageInput ? messageInput.value.trim() : '';

      // Basic validation
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusEl.textContent = 'Please enter a valid email address.';
        statusEl.className = 'cm-status is-error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';
      statusEl.textContent = '';
      statusEl.className = 'cm-status';

      // Collect checked interests/tracks
      var extras = [];
      formEl.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
        extras.push(cb.value);
      });
      var radioVals = [];
      formEl.querySelectorAll('input[type="radio"]:checked').forEach(function(r) {
        radioVals.push(r.value);
      });

      var tags = (CM_TAGS[type] || []).concat(extras);

      // Build message with extras
      var fullMessage = message;
      if (radioVals.length) fullMessage += '\n\nPlatform/Type: ' + radioVals.join(', ');
      if (extras.length) fullMessage += '\nInterests: ' + extras.join(', ');

      // Submit to Netlify Forms (email notification)
      var formName = CM_FORM_NAMES[type] || 'general-inquiry';
      var netlifyBody = 'form-name=' + encodeURIComponent(formName) +
        '&name=' + encodeURIComponent(name) +
        '&email=' + encodeURIComponent(email) +
        '&message=' + encodeURIComponent(fullMessage);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyBody
      }).catch(function() {}); // fire and forget — email notification

      // Submit to Mailchimp via function
      fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, name: name, tags: tags })
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          formEl.querySelectorAll('input:not([type="hidden"]), textarea').forEach(function(i) { i.value = ''; });
          formEl.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(function(i) { i.checked = false; });
          statusEl.innerHTML = 'Got it \u2014 I\u2019ll be in touch soon.';
          statusEl.className = 'cm-status is-success';
          submitBtn.textContent = 'Sent \u2713';
        } else {
          statusEl.textContent = 'Something went wrong. Email info@mindofyourown.com directly.';
          statusEl.className = 'cm-status is-error';
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.getAttribute('data-original-text');
        }
      })
      .catch(function() {
        statusEl.textContent = 'Something went wrong. Email info@mindofyourown.com directly.';
        statusEl.className = 'cm-status is-error';
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.getAttribute('data-original-text');
      });
    });
  });

})();
