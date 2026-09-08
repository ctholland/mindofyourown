(function () {
  'use strict';

  var root = './';

  // ── NAV CONTENT ───────────────────────────────────────────
  var nav = [
    { label: 'Home', href: root + 'index.html' },
    { label: 'Bio',  href: root + 'bio.html' },
    { label: 'Mind Of Your Own\u00AE \u2014 The Book', href: root + 'book.html' },
    { label: 'A Survival Guide for Democracy', href: root + 'guide.html' },
    {
      label: 'AI Consulting & Training',
      children: [
        { label: 'AI Fluency', href: root + 'ai-consulting.html#ai-fluency' },
        { label: 'Human Agency in the Age of AI', href: root + 'ai-consulting.html#human-agency' }
      ]
    },
    { label: 'Newsletter', href: root + 'index.html#newsletter' }
  ];

  function buildLinks() {
    return nav.map(function (item) {
      if (item.children) {
        var childHTML = item.children.map(function (c) {
          return '<a href="' + c.href + '" class="ch-sublink">' + c.label + '</a>';
        }).join('\n');
        return (
          '<div class="ch-group">' +
            '<button class="ch-link ch-parent" type="button" aria-expanded="false">' +
              item.label + ' <span class="ch-chev" aria-hidden="true"></span>' +
            '</button>' +
            '<div class="ch-submenu">' + childHTML + '</div>' +
          '</div>'
        );
      }
      return '<a href="' + item.href + '" class="ch-link">' + item.label + '</a>';
    }).join('\n');
  }

  // ── CSS ───────────────────────────────────────────────────
  var css = `
    .site-nav {
      position: sticky; top: 0; z-index: 9000;
      background: #000000;
      padding: 0 40px; height: 84px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .site-nav .nav-logo img { height: 35px; width: auto; display:block; filter:brightness(1.12); }
    .ch-btn {
      width: 44px; height: 44px;
      background: transparent; border: 0; cursor: pointer;
      color: #fff;
      display: flex; align-items: center; justify-content: center;
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
      width: min(380px, 88vw);
      background: #000000; border-left: 1px solid rgba(255,255,255,0.1);
      color: #fff; z-index: 9999;
      transform: translateX(100%);
      transition: transform .28s cubic-bezier(.4,0,.2,1);
      padding: 100px 32px 32px;
      overflow-y: auto; box-shadow: 0 24px 60px rgba(0,0,0,.4);
      display: flex; flex-direction: column;
    }
    .ch-panel.is-open { transform: translateX(0); }
    .ch-link {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; padding: 16px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      color: #fff; text-decoration: none; background: none; border-left: none; border-right: none; border-top: none;
      font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 0.09em;
      font-size: 0.8rem; font-weight: 500; cursor: pointer; text-align: left;
      transition: color .15s, transform .15s;
    }
    .ch-group:first-child > .ch-link,
    .ch-panel > .ch-link:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
    .ch-link:hover { color: #4169E1; transform: translateX(4px); }
    .ch-chev {
      width: 7px; height: 7px;
      border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor;
      transform: rotate(45deg); transition: transform .2s; margin-left: 8px; flex-shrink:0;
    }
    .ch-group.is-open .ch-chev { transform: rotate(-135deg); }
    .ch-group { border-bottom: 1px solid rgba(255,255,255,0.1); }
    .ch-group .ch-link { border-bottom: none; }
    .ch-submenu { max-height: 0; overflow: hidden; transition: max-height .25s ease; }
    .ch-group.is-open .ch-submenu { max-height: 160px; }
    .ch-sublink {
      display: block; padding: 11px 0 11px 16px;
      color: rgba(255,255,255,0.7); text-decoration: none;
      font-family: 'Inter', sans-serif; font-size: 0.78rem; font-weight: 400;
      letter-spacing: 0.04em;
      border-left: 2px solid rgba(255,255,255,0.15);
    }
    .ch-sublink:hover { color: #4169E1; border-left-color: #4169E1; }
    .ch-panel-footer { margin-top: auto; padding-top: 28px; }
    .ch-panel-footer img { height: 20px; width: auto; margin-bottom: 14px; filter: brightness(1.12); }
    .ch-panel-footer a {
      display: block; font-family: 'Inter', sans-serif; font-size: 0.68rem;
      letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.55);
      text-decoration: none; margin-bottom: 8px; font-weight: 500;
    }
    .ch-panel-footer a:hover { color: #4169E1; }
    .ch-panel-footer .copy { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 10px; }

    @media (max-width: 700px) {
      .site-nav { padding: 0 20px; height: 68px; }
      .site-nav .nav-logo img { height: 26px; }
      .ch-panel { padding: 90px 24px 24px; }
    }

    .site-footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 40px 40px 32px;
      text-align: center;
    }
    .site-footer .sf-logo img { height: 24px; width: auto; margin-bottom: 22px; filter: brightness(1.12); }
    .site-footer .sf-links {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 28px;
      margin-bottom: 18px;
    }
    .site-footer .sf-links a {
      font-family: 'Oswald', sans-serif; font-size: 0.72rem; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(255,255,255,0.6); text-decoration: none;
    }
    .site-footer .sf-links a:hover { color: #4169E1; }
    .site-footer .sf-copy { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: rgba(255,255,255,0.35); }

    @media (max-width: 700px) {
      .site-footer { padding: 32px 20px 26px; }
    }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── BUILD HTML ────────────────────────────────────────────
  var navHTML =
    '<div class="site-nav">' +
      '<div class="nav-logo"><a href="' + root + 'index.html"><img src="' + root + 'images/moyo-wordmark-white.png" alt="MOYO - Mind Of Your Own"></a></div>' +
      '<button class="ch-btn" id="chBtn" aria-label="Open menu" aria-expanded="false" aria-controls="chPanel">' +
        '<span class="ch-icon" aria-hidden="true"></span>' +
      '</button>' +
    '</div>' +
    '<div class="ch-overlay" id="chOverlay"></div>' +
    '<nav class="ch-panel" id="chPanel" aria-label="Site navigation">' +
      buildLinks() +
      '<div class="ch-panel-footer">' +
        '<img src="' + root + 'images/moyo-wordmark-white.png" alt="Mind Of Your Own">' +
        '<a href="https://mindofyourownofficial.substack.com" target="_blank" rel="noopener">Substack</a>' +
        '<div class="copy">&copy; 2026 Mind Of Your Own&reg;. Fairfield &amp; Co. LLC</div>' +
      '</div>' +
    '</nav>';

  var wrapper = document.createElement('div');
  wrapper.innerHTML = navHTML;
  var firstChild = document.body.firstChild;
  while (wrapper.firstChild) {
    document.body.insertBefore(wrapper.firstChild, firstChild);
  }

  // ── FOOTER CONTENT ────────────────────────────────────────
  var footerLinks = [
    { label: 'Home', href: root + 'index.html' },
    { label: 'Bio', href: root + 'bio.html' },
    { label: 'The Book', href: root + 'book.html' },
    { label: 'Guide', href: root + 'guide.html' },
    { label: 'AI Consulting & Training', href: root + 'ai-consulting.html' },
    { label: 'Press & Media', href: root + 'press.html' },
    { label: 'Newsletter', href: root + 'index.html#newsletter' }
  ];

  function buildFooterLinks() {
    return footerLinks.map(function (item) {
      return '<a href="' + item.href + '">' + item.label + '</a>';
    }).join('\n');
  }

  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="sf-logo"><img src="' + root + 'images/moyo-wordmark-white.png" alt="Mind Of Your Own"></div>' +
      '<div class="sf-links">' + buildFooterLinks() + '</div>' +
      '<div class="sf-copy">&copy; 2026 Mind Of Your Own&reg;. Fairfield &amp; Co. LLC</div>' +
    '</footer>';

  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── WIRE UP ───────────────────────────────────────────────
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

  panel.querySelectorAll('.ch-link:not(.ch-parent), .ch-sublink').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  panel.querySelectorAll('.ch-parent').forEach(function (parentBtn) {
    parentBtn.addEventListener('click', function () {
      var group = parentBtn.closest('.ch-group');
      var isOpen = group.classList.toggle('is-open');
      parentBtn.setAttribute('aria-expanded', isOpen);
    });
  });

})();
