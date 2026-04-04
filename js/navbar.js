/** js/navbar.js — ECOGEN Navbar Component */

(function () {
  'use strict';

  /* Detectar ruta base */
  const IS_SUBPAGE = window.location.pathname.includes('/pages/');
  const PFX = IS_SUBPAGE ? '' : 'pages/';

  /* Leer atributos del propio <script> */
  const currentScript = document.currentScript;
  const ACTIVE_ID = currentScript?.dataset?.active || '';
  const ACCENT    = currentScript?.dataset?.accent  || '#2d7a47';

  /* Traducciones (ES / EN) */
  const T = {
    es: {
      nav_ciencia:'Ciencia', nav_territorio:'Territorio', nav_comunidad:'Comunidad',
      nav_fundacion:'Fundación', nav_unete:'Únete',
      sub_biotech:'Biotecnología', sub_nutra:'Nutracéuticos', sub_labs:'Laboratorios',
      sub_reforest:'Reforestación', sub_carbono:'Bonos de Carbono', sub_ecosistemas:'Ecosistemas',
      sub_nutricion:'Nutrición', sub_educacion:'Educación', sub_becas:'Becas',
      sub_quienes:'Quiénes somos', sub_gobernanza:'Gobernanza', sub_noticias:'Noticias',
      sub_membresia:'Membresía', sub_voluntario:'Voluntariado', sub_donaciones:'Donaciones',
      aria_menu:'Abrir menú', aria_close:'Cerrar',
    },
    en: {
      nav_ciencia:'Science', nav_territorio:'Territory', nav_comunidad:'Community',
      nav_fundacion:'Foundation', nav_unete:'Join Us',
      sub_biotech:'Biotechnology', sub_nutra:'Nutraceuticals', sub_labs:'Laboratories',
      sub_reforest:'Reforestation', sub_carbono:'Carbon Credits', sub_ecosistemas:'Ecosystems',
      sub_nutricion:'Nutrition', sub_educacion:'Education', sub_becas:'Scholarships',
      sub_quienes:'About Us', sub_gobernanza:'Governance', sub_noticias:'News',
      sub_membresia:'Membership', sub_voluntario:'Volunteering', sub_donaciones:'Donations',
      aria_menu:'Open menu', aria_close:'Close',
    },
  };

  /* Definición de paneles */
  const PANELS = [
    { id: 'ciencia', labelKey: 'nav_ciencia', href: `${PFX}ciencia.html`, sub: [
      { icon: '🧬', key: 'sub_biotech', href: `${PFX}ciencia.html#biotech` },
      { icon: '🌿', key: 'sub_nutra', href: `${PFX}ciencia.html#nutra` },
      { icon: '🔬', key: 'sub_labs', href: `${PFX}ciencia.html#labs` },
    ]},
    { id: 'territorio', labelKey: 'nav_territorio', href: `${PFX}territorio.html`, sub: [
      { icon: '🌳', key: 'sub_reforest', href: `${PFX}territorio.html#reforest` },
      { icon: '♻️', key: 'sub_carbono', href: `${PFX}territorio.html#carbono` },
      { icon: '🏔️', key: 'sub_ecosistemas', href: `${PFX}territorio.html#ecosistemas` },
    ]},
    { id: 'comunidad', labelKey: 'nav_comunidad',  href: `${PFX}comunidad.html`,  sub: [
      { icon: '🥗', key: 'sub_nutricion', href: `${PFX}comunidad.html#nutricion` },
      { icon: '📚', key: 'sub_educacion', href: `${PFX}comunidad.html#educacion` },
      { icon: '🎓', key: 'sub_becas', href: `${PFX}comunidad.html#becas` },
    ]},
    { id: 'fundacion', labelKey: 'nav_fundacion', href: `${PFX}fundacion.html`,  sub: [
      { icon: '🏛️', key: 'sub_quienes', href: `${PFX}fundacion.html#quienes` },
      { icon: '⚖️', key: 'sub_gobernanza', href: `${PFX}fundacion.html#gobernanza`},
      { icon: '📰', key: 'sub_noticias', href: `${PFX}noticias.html` },
    ]},
    { id: 'unete', labelKey: 'nav_unete', href: `${PFX}unete.html`, sub: [
      { icon: '🤝', key: 'sub_membresia', href: `${PFX}unete.html#membresia`  },
      { icon: '💪', key: 'sub_voluntario', href: `${PFX}unete.html#voluntario` },
      { icon: '💚', key: 'sub_donaciones', href: `${PFX}unete.html#donaciones` },
    ]},
  ];

  /* Estado de idioma */
  let lang = localStorage.getItem('ecogen_lang') || 'es';
  const t = key => T[lang]?.[key] || T.es[key] || key;

  /* Logo SVG */
  const LOGO_SVG = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="6"  r="3" fill="white" opacity=".9"/>
    <circle cx="11" cy="16" r="3" fill="white" opacity=".9"/>
    <path d="M8 6 Q4 11 8 16" stroke="white" stroke-width="1.5" fill="none" opacity=".7"/>
    <path d="M14 6 Q18 11 14 16" stroke="white" stroke-width="1.5" fill="none" opacity=".7"/>
    <line x1="8" y1="8"  x2="14" y2="8"  stroke="white" stroke-width="1" opacity=".5"/>
    <line x1="8" y1="11" x2="14" y2="11" stroke="white" stroke-width="1" opacity=".5"/>
    <line x1="8" y1="14" x2="14" y2="14" stroke="white" stroke-width="1" opacity=".5"/>
  </svg>`;

  /* Generar HTML */
  function buildPanelsHTML() {
    return PANELS.map(p => {
      const isActive = p.id === ACTIVE_ID;
      const subsHTML = p.sub.map(s => `
        <a href="${s.href}">
          <span class="nav-dropdown-icon">${s.icon}</span>
          <span class="eco-i18n" data-key="${s.key}">${t(s.key)}</span>
        </a>`).join('');

      return `
        <div class="nav-panel${isActive ? ' active' : ''}" data-panel="${p.id}" tabindex="0" role="button" aria-haspopup="true">
          <div class="nav-panel-inner" data-href="${p.href}">
            <span class="nav-panel-name eco-i18n" data-key="${p.labelKey}">${t(p.labelKey)}</span>
            <span class="nav-panel-dot"></span>
          </div>
          <div class="nav-dropdown">${subsHTML}</div>
        </div>`;
    }).join('');
  }

  function buildMobileHTML() {
    return PANELS.map(p => {
      const subsHTML = p.sub.map(s =>
        `<a href="${s.href}" class="eco-i18n" data-key="${s.key}">${t(s.key)}</a>`
      ).join('');
      return `
        <div class="mobile-nav-item">
          <button class="mobile-nav-trigger" style="display:flex;justify-content:space-between;width:100%;color:white;font-family:var(--font-display);font-size:1.3rem;padding:.75rem 0;border-bottom:1px solid rgba(255,255,255,.08);background:none;border-top:none;border-left:none;border-right:none;cursor:pointer">
            <span class="eco-i18n" data-key="${p.labelKey}">${t(p.labelKey)}</span>
            <span style="opacity:.4">+</span>
          </button>
          <div class="mobile-sub-links" style="display:none">${subsHTML}</div>
        </div>`;
    }).join('');
  }

  /* Montar en el DOM */
  function mount() {
    const logoHref = IS_SUBPAGE ? '../index.html' : '/';
    const hasHero = !!document.getElementById('home-hero');

    const navbar = document.createElement('header');
    navbar.id = 'navbar';
    navbar.className = hasHero ? 'transparent' : 'scrolled'; 

    navbar.innerHTML = `
      <nav class="nav-inner">

        <a href="${logoHref}" class="nav-logo">
          <div class="nav-logo-mark">${LOGO_SVG}</div>
          <div>
            <div class="nav-logo-text">ECOGEN</div>
            <div class="nav-logo-sub">Fundación · Bolivia</div>
          </div>
        </a>

        <div class="nav-spacer"></div>

        <div class="nav-panels" id="nav-panels-group">
          ${buildPanelsHTML()}
        </div>

        <div class="nav-spacer"></div>

        <div class="nav-lang">
          <button class="lang-btn${lang==='es'?' active':''}" data-lang="es">ES</button>
          <span style="opacity:.2">|</span>
          <button class="lang-btn${lang==='en'?' active':''}" data-lang="en">EN</button>
        </div>

        <button class="nav-burger" id="nav-burger" aria-label="${t('aria_menu')}">
          <span></span><span></span><span></span>
        </button>

      </nav>`;

    document.body.insertAdjacentElement('afterbegin', navbar);

    /* MOBILE MENU */
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';                
    mobileMenu.id = 'mobile-menu';
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-label', 'Menú principal');
    mobileMenu.innerHTML = `
      <div class="mobile-menu-header">
        <span style="font-family:var(--font-display);font-size:1.3rem;color:var(--green-200)">ECOGEN</span>
        <button id="mobile-close" style="color:white;font-size:1.5rem;line-height:1" aria-label="Cerrar">✕</button>
      </div>
      <nav>${buildMobileHTML()}</nav>
      <div style="display:flex;gap:.5rem;margin-top:2rem">
        <button class="lang-btn" data-lang="es" style="color:white">ES</button>
        <button class="lang-btn" data-lang="en" style="color:white">EN</button>
      </div>`;

    document.body.insertAdjacentElement('afterbegin', mobileMenu);

    /* Estilos extra solo para el centrado fijo de los paneles */
    injectCenterFix();

    bindEvents(navbar, mobileMenu, hasHero);
  }
  
  function injectCenterFix() {
    if (document.getElementById('ecogen-center-fix')) return;
    const s = document.createElement('style');
    s.id = 'ecogen-center-fix';
    s.textContent = `
      #navbar .nav-panel {
        overflow: visible !important;
      }

      #nav-panels-group {
        flex-shrink: 0;
      }

      #navbar .nav-dropdown {
        z-index: 2000;
        overflow: visible;
      }
   
      #navbar .nav-inner {
        overflow: visible;
      }
      #navbar {
        overflow: visible;
      }
    `;
    document.head.appendChild(s);
  }

  /* Eventos */
  function bindEvents(navbar, mobileMenu, hasHero) {

    if (hasHero) {
      const onScroll = () => {
        const scrolled = window.scrollY > 40;
        navbar.classList.toggle('scrolled', scrolled);
        navbar.classList.toggle('transparent', !scrolled);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    navbar.querySelectorAll('.nav-panel[data-panel]').forEach(panel => {
      const inner = panel.querySelector('.nav-panel-inner');
      panel.addEventListener('click', (e) => {
        if (e.target.closest('.nav-dropdown')) return;
        panel.blur();
        window.location.href = inner.dataset.href;
      });
    });

    navbar.querySelectorAll('.nav-panel').forEach(panel => {
      panel.addEventListener('mouseleave', () => panel.blur());
    });

    /* Burger, abrir mobile */
    document.getElementById('nav-burger')?.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    /* Cerrar mobile */
    const closeMobile = () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };
    document.getElementById('mobile-close')?.addEventListener('click', closeMobile);

    /* Acordeón mobile */
    mobileMenu.querySelectorAll('.mobile-nav-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const item      = btn.closest('.mobile-nav-item');
        const subs      = item.querySelector('.mobile-sub-links');
        const isOpen    = subs.style.display === 'flex';
        /* cerrar todos */
        mobileMenu.querySelectorAll('.mobile-sub-links').forEach(s => s.style.display = 'none');
        if (!isOpen) subs.style.display = 'flex';
      });
    });

    /* Idioma */
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
  }

  /* i18n */
  function setLanguage(newLang) {
    if (!T[newLang]) return;
    lang = newLang;
    localStorage.setItem('ecogen_lang', lang);

    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    document.querySelectorAll('.eco-i18n[data-key]').forEach(el => {
      el.textContent = t(el.dataset.key);
    });
    /* Sincronizar con sistema global de main.js si existe */
    if (typeof window.setLang === 'function') window.setLang(lang);
    document.documentElement.lang = lang;
  }

  /* Auto-init */
  function autoInit() {
    if (ACCENT !== '#2d7a47') {
      document.documentElement.style.setProperty('--page-accent', ACCENT);
    }
    mount();

    /* Sincronizar con lang guardado */
    const stored = localStorage.getItem('ecogen_lang');
    if (stored && stored !== lang) setLanguage(stored);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  /* ─── API pública ────────────────────────────────────────────── */
  window.EcoNav = { setLang: setLanguage };

})();