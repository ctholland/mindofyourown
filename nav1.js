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
    { label: 'NLP & Influences', href: root + 'about.html' },
    { label: 'About', href: root + 'about.html' }
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
      display: block; width: 100%; padding: 15px 0;
      color: #fff; text-decoration: none;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.92rem; font-weight: 500;
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
      '<div class="sf-bottom">&copy; 2026 Mind Of Your Own&reg;. Fairfield &amp; Co. LLC</div>' +
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
      body: JSON.stringify({ email: email })
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

})();
