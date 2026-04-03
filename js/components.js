// js/components.js

const IS_SUBPAGE = window.location.pathname.includes('/pages/');
const PREFIX = IS_SUBPAGE ? '' : 'pages/';

function renderNav(activePageId = '', accentHex = '#2d7a47') {
  const root = document.documentElement;
  root.style.setProperty('--page-accent', accentHex);

  const panels = [
    { id: 'ciencia', label: 'nav_ciencia', href: PREFIX + 'ciencia.html', sub: [
      { icon: '🧬', key: 'sub_biotech', label: 'Biotecnología', href: PREFIX + 'ciencia.html#biotech' },
      { icon: '🌿', key: 'sub_nutra', label: 'Nutracéuticos', href: PREFIX + 'ciencia.html#nutra' },
      { icon: '🔬', key: 'sub_labs', label: 'Laboratorios', href: PREFIX + 'ciencia.html#labs' },
    ]},
    { id: 'territorio', label: 'nav_territorio', href: PREFIX + 'territorio.html', sub: [
      { icon: '🌳', key: 'sub_reforest', label: 'Reforestación', href: PREFIX + 'territorio.html#reforest' },
      { icon: '♻️', key: 'sub_carbono', label: 'Bonos de Carbono', href: PREFIX + 'territorio.html#carbono' },
      { icon: '🏔️', key: 'sub_ecosistemas', label: 'Ecosistemas', href: PREFIX + 'territorio.html#ecosistemas' },
    ]},
    { id: 'comunidad', label: 'nav_comunidad', href: PREFIX + 'comunidad.html', sub: [
      { icon: '🥗', key: 'sub_nutricion', label: 'Nutrición', href: PREFIX + 'comunidad.html#nutricion' },
      { icon: '📚', key: 'sub_educacion', label: 'Educación', href: PREFIX + 'comunidad.html#educacion' },
      { icon: '🎓', key: 'sub_becas', label: 'Becas', href: PREFIX + 'comunidad.html#becas' },
    ]},
    { id: 'fundacion', label: 'nav_fundacion', href: PREFIX + 'fundacion.html', sub: [
      { icon: '🏛️', key: 'sub_quienes', label: 'Quiénes somos', href: PREFIX + 'fundacion.html#quienes' },
      { icon: '⚖️', key: 'sub_gobernanza',label: 'Gobernanza', href: PREFIX + 'fundacion.html#gobernanza' },
      { icon: '📰', key: 'sub_noticias', label: 'Noticias', href: PREFIX + 'noticias.html' },
    ]},
    { id: 'unete', label: 'nav_unete', href: PREFIX + 'unete.html', sub: [
      { icon: '🤝', key: 'sub_membresia', label: 'Membresía', href: PREFIX + 'unete.html#membresia' },
      { icon: '💪', key: 'sub_voluntario', label: 'Voluntariado', href: PREFIX + 'unete.html#voluntario' },
      { icon: '💚', key: 'sub_donaciones', label: 'Donaciones', href: PREFIX + 'unete.html#donaciones' },
    ]},
  ];

  const logoHref = IS_SUBPAGE ? '../index.html' : '/';

  const panelsHTML = panels.map(p => `
    <div class="nav-panel${p.id === activePageId ? ' active' : ''}" data-page="${p.id}" tabindex="0" role="button" aria-haspopup="true">
      <div class="nav-panel-inner" onclick="window.location.href='${p.href}'">
        <span class="nav-panel-name" data-i18n="${p.label}">${p.label}</span>
        <span class="nav-panel-dot"></span>
      </div>
      <div class="nav-dropdown">
        ${p.sub.map(s => `
          <a href="${s.href}">
            <span class="nav-dropdown-icon">${s.icon}</span>
            <span data-i18n="${s.key}">${s.label}</span>
          </a>`).join('')}
      </div>
    </div>`).join('');

  const mobileHTML = panels.map(p => `
    <div class="mobile-nav-item">
      <button class="mobile-nav-trigger" style="display:flex;justify-content:space-between;width:100%;color:white;font-family:var(--font-display);font-size:1.3rem;padding:.75rem 0;border-bottom:1px solid rgba(255,255,255,.08);background:none;border-top:none;border-left:none;border-right:none;cursor:pointer">
        <span data-i18n="${p.label}">${p.label}</span> <span style="opacity:.4">+</span>
      </button>
      <div class="mobile-sub-links" style="display:none">
        ${p.sub.map(s => `<a href="${s.href}" data-i18n="${s.key}">${s.label}</a>`).join('')}
      </div>
    </div>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
  <header id="navbar" class="scrolled">
    <nav class="nav-inner">
      <a href="${logoHref}" class="nav-logo">
        <div class="nav-logo-mark">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="6"  r="3" fill="white" opacity=".9"/>
            <circle cx="11" cy="16" r="3" fill="white" opacity=".9"/>
            <path d="M8 6 Q4 11 8 16" stroke="white" stroke-width="1.5" fill="none" opacity=".7"/>
            <path d="M14 6 Q18 11 14 16" stroke="white" stroke-width="1.5" fill="none" opacity=".7"/>
            <line x1="8" y1="8"  x2="14" y2="8"  stroke="white" stroke-width="1" opacity=".5"/>
            <line x1="8" y1="11" x2="14" y2="11" stroke="white" stroke-width="1" opacity=".5"/>
            <line x1="8" y1="14" x2="14" y2="14" stroke="white" stroke-width="1" opacity=".5"/>
          </svg>
        </div>
        <div>
          <div class="nav-logo-text">ECOGEN</div>
          <div class="nav-logo-sub">Fundación · Bolivia</div>
        </div>
      </a>
      <div class="nav-spacer"></div>
      <div class="nav-panels">${panelsHTML}</div>
      <div class="nav-lang">
        <button class="lang-btn" data-lang="es">ES</button>
        <span style="opacity:.2">|</span>
        <button class="lang-btn" data-lang="en">EN</button>
        <span style="opacity:.2">|</span>
        <button class="lang-btn" data-lang="pt">PT</button>
      </div>
      <button class="nav-burger" id="nav-burger" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </header>

  <div class="mobile-menu" id="mobile-menu">
    <div class="mobile-menu-header">
      <span style="font-family:var(--font-display);font-size:1.3rem;color:var(--green-200)">ECOGEN</span>
      <button id="mobile-close" style="color:white;font-size:1.5rem;line-height:1">✕</button>
    </div>
    <nav>${mobileHTML}</nav>
    <div style="display:flex;gap:.5rem;margin-top:2rem">
      <button class="lang-btn" data-lang="es" style="color:white">ES</button>
      <button class="lang-btn" data-lang="en" style="color:white">EN</button>
      <button class="lang-btn" data-lang="pt" style="color:white">PT</button>
    </div>
  </div>`);
}

function renderFooter() {
  const PREFIX_F = IS_SUBPAGE ? '' : 'pages/';

  document.body.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
            <div style="width:36px;height:36px;background:var(--green-600);border-radius:9px;display:flex;align-items:center;justify-content:center">
              <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="6" r="3" fill="white" opacity=".9"/>
                <circle cx="11" cy="16" r="3" fill="white" opacity=".9"/>
                <path d="M8 6 Q4 11 8 16" stroke="white" stroke-width="1.5" fill="none"/>
                <path d="M14 6 Q18 11 14 16" stroke="white" stroke-width="1.5" fill="none"/>
              </svg>
            </div>
            <span style="font-family:var(--font-display);font-size:1.2rem;color:white">ECOGEN</span>
          </div>
          <p data-i18n="footer_desc">Ecología y Genética para el Desarrollo Sostenible. Fundación sin fines de lucro registrada en Santa Cruz, Bolivia.</p>
          <div class="footer-social mt-4">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="YouTube">yt</a>
          </div>
        </div>
        <div class="footer-links">
          <h4 data-i18n="footer_links_org">Organización</h4>
          <ul>
            <li><a href="${PREFIX_F}fundacion.html#quienes" data-i18n="sub_quienes">Quiénes somos</a></li>
            <li><a href="${PREFIX_F}fundacion.html#gobernanza" data-i18n="sub_gobernanza">Gobernanza</a></li>
            <li><a href="${IS_SUBPAGE ? '../' : ''}assets/estatuto-ecogen.pdf" target="_blank">Estatuto Orgánico</a></li>
            <li><a href="${PREFIX_F}noticias.html" data-i18n="sub_noticias">Noticias</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4 data-i18n="footer_links_proj">Proyectos</h4>
          <ul>
            <li><a href="${PREFIX_F}ciencia.html#biotech" data-i18n="sub_biotech">Biotecnología</a></li>
            <li><a href="${PREFIX_F}territorio.html#carbono" data-i18n="sub_carbono">Bonos de Carbono</a></li>
            <li><a href="${PREFIX_F}comunidad.html#becas" data-i18n="sub_becas">Becas</a></li>
            <li><a href="${PREFIX_F}territorio.html#reforest" data-i18n="sub_reforest">Reforestación</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4 data-i18n="footer_links_join">Participar</h4>
          <ul>
            <li><a href="${PREFIX_F}unete.html#membresia" data-i18n="sub_membresia">Membresía</a></li>
            <li><a href="${PREFIX_F}unete.html#voluntario" data-i18n="sub_voluntario">Voluntariado</a></li>
            <li><a href="${PREFIX_F}unete.html#donaciones" data-i18n="sub_donaciones">Donaciones</a></li>
            <li><a href="mailto:info@ecogen.org.bo">info@ecogen.org.bo</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-i18n="footer_rights">© 2025 Fundación ECOGEN. Todos los derechos reservados.</span>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap">
          <a href="${PREFIX_F}fundacion.html#legal" data-i18n="footer_legal">Marco legal · Ley Departamental N° 50</a>
          <a href="#" data-i18n="footer_privacy">Política de privacidad</a>
        </div>
      </div>
    </div>
  </footer>`);
}

// Subnav active link tracking
function initSubnav() {
  const links = document.querySelectorAll('.subnav-link');
  if (!links.length) return;
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => s && obs.observe(s));
}

// Smooth accordion
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

window.renderNav = renderNav;
window.renderFooter = renderFooter;
window.initSubnav = initSubnav;
window.initAccordions = initAccordions;