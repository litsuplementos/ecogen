// js/main.js

// Supabase config
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// Lazy-load Supabase only when needed
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}

// i18n
const DEFAULT_LANG = 'es';
let currentLang = localStorage.getItem('ecogen_lang') || DEFAULT_LANG;

function t(key) {
  const dict = window.TRANSLATIONS?.[currentLang] || {};
  return dict[key] || window.TRANSLATIONS?.[DEFAULT_LANG]?.[key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('ecogen_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  applyTranslations();
}

window.setLang = setLang;


// Navbar
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll state
  const homeHero = document.getElementById('home-hero');
  const updateNavStyle = () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    navbar.classList.toggle('transparent', !scrolled && !!homeHero);
  };
  updateNavStyle();
  window.addEventListener('scroll', updateNavStyle, { passive: true });

  // Active panel from URL
  const path = window.location.pathname;
  document.querySelectorAll('.nav-panel').forEach(p => {
    const href = p.dataset.page || '';
    p.classList.toggle('active', path.includes(href) && href !== '');
  });

  // Mobile menu
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  burger?.addEventListener('click', () => {
    mobileMenu?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  const closeMobile = () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  };
  mobileClose?.addEventListener('click', closeMobile);
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobile();
  });
}


// Scroll Reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}


// Counter animation
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = target * ease;
    el.textContent = isDecimal
      ? val.toFixed(1)
      : Math.floor(val).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseFloat(e.target.dataset.count);
        animateCounter(e.target, target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}


// Supabase data loaders

// Load featured projects for home preview
async function loadProjectsPreview() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const sb = await getSupabase();
    const { data, error } = await sb
      .from('proyectos')
      .select('id, titulo, descripcion, tipo, estado, imagen_url, fecha_inicio')
      .eq('estado', 'activo')
      .limit(3);

    if (error || !data?.length) {
      renderProjectsPlaceholder(container);
      return;
    }
    container.innerHTML = data.map(p => renderProjectCard(p)).join('');
  } catch {
    renderProjectsPlaceholder(container);
  }
}

function renderProjectCard(p) {
  const typeColors = {
    reforestacion: '#3d9e60', carbono: '#0d7377',
    nutricion: '#b38a28', educacion: '#5dba7e', biotech: '#14a8a0'
  };
  const color = typeColors[p.tipo] || '#3d9e60';
  return `
  <article class="project-card" data-reveal>
    <div class="project-card-img" style="background:${color}22">
      ${p.imagen_url
        ? `<img src="${p.imagen_url}" alt="${p.titulo}" style="width:100%;height:100%;object-fit:cover">`
        : `<span style="color:${color};font-family:var(--font-mono);font-size:.75rem">[imagen del proyecto]</span>`}
      <div class="project-card-img-bar" style="background:${color}"></div>
    </div>
    <div class="project-card-body">
      <span class="badge badge-green" style="margin-bottom:.75rem">${p.tipo}</span>
      <h4>${p.titulo}</h4>
      <p>${p.descripcion?.slice(0, 100)}...</p>
      <div class="project-card-meta">
        <span>●&nbsp;${p.estado}</span>
        <span>${p.fecha_inicio ? new Date(p.fecha_inicio).getFullYear() : ''}</span>
      </div>
    </div>
  </article>`;
}

function renderProjectsPlaceholder(container) {
  const items = [
    { tipo: 'biotech',       titulo: 'Banco Genético Chiquitano',      desc: 'Conservación in vitro de especies endémicas de la Chiquitanía con valor medicinal y alimenticio.',      color: '#14a8a0' },
    { tipo: 'reforestacion', titulo: 'Reforestación Cuenca Piraí',     desc: 'Restauración de 500 hectáreas degradadas mediante técnicas de bioingeniería y manejo forestal sostenible.', color: '#3d9e60' },
    { tipo: 'carbono',       titulo: 'Certificación Bonos de Carbono', desc: 'Gestión y certificación bajo estándares VCS de proyectos de captura de CO₂ en bosques bolivianos.',       color: '#0d7377' },
  ];
  container.innerHTML = items.map((p, i) => `
  <article class="project-card" data-reveal data-reveal-delay="${i+1}">
    <div class="project-card-img" style="background:${p.color}18">
      <span style="color:${p.color};font-family:var(--font-mono);font-size:.75rem">[imagen]</span>
      <div class="project-card-img-bar" style="background:${p.color}"></div>
    </div>
    <div class="project-card-body">
      <span class="badge badge-green" style="margin-bottom:.75rem">${p.tipo}</span>
      <h4>${p.titulo}</h4>
      <p>${p.desc}</p>
      <div class="project-card-meta"><span>● activo</span><span>2025</span></div>
    </div>
  </article>`).join('');
}

// Load latest news for home preview
async function loadNewsPreview() {
  const featured = document.getElementById('news-featured');
  const list     = document.getElementById('news-list');
  if (!featured || !list) return;

  try {
    const sb = await getSupabase();
    const { data } = await sb
      .from('noticias')
      .select('id, titulo, slug, contenido, categoria, fecha_publicacion, imagen_url')
      .eq('publicado', true)
      .order('fecha_publicacion', { ascending: false })
      .limit(4);

    if (!data?.length) throw new Error('No data');

    const [first, ...rest] = data;
    featured.innerHTML = `
      <div class="news-featured-img" style="${first.imagen_url ? `background:url(${first.imagen_url}) center/cover` : ''}">
        ${!first.imagen_url ? '[imagen destacada]' : ''}
      </div>
      <div class="news-featured-body">
        <span class="badge badge-teal">${first.categoria}</span>
        <h3>${first.titulo}</h3>
        <p>${first.contenido?.slice(0, 140)}...</p>
        <a href="pages/noticias.html?slug=${first.slug}" class="btn btn-secondary mt-2">Leer más →</a>
      </div>`;

    list.innerHTML = rest.map(n => `
      <article class="news-item" onclick="location.href='pages/noticias.html?slug=${n.slug}'">
        <span class="badge badge-green">${n.categoria}</span>
        <h4>${n.titulo}</h4>
        <p>${n.contenido?.slice(0, 80)}...</p>
        <small style="color:var(--ink-40)">${new Date(n.fecha_publicacion).toLocaleDateString(currentLang)}</small>
      </article>`).join('');
  } catch {
    // Placeholder data
    featured.innerHTML = `
      <div class="news-featured-img">Cargando noticias desde Supabase...</div>
      <div class="news-featured-body">
        <span class="badge badge-teal">divulgación</span>
        <h3>ECOGEN inicia primer banco genético del oriente boliviano</h3>
        <p>El laboratorio de biotecnología verde albergará más de 200 especies vegetales endémicas de la Chiquitanía...</p>
        <a href="pages/noticias.html" class="btn btn-secondary mt-2">Leer más →</a>
      </div>`;
    list.innerHTML = [
      { cat: 'asamblea',    title: 'Convocatoria Asamblea Ordinaria 2025',            desc: 'El Directorio convoca a todos los asociados para la sesión anual de rendición de cuentas.' },
      { cat: 'proyecto',    title: 'Firma de convenio con municipio de Concepción',   desc: 'Alianza para restauración ecológica en 300 hectáreas de la Chiquitanía.' },
      { cat: 'divulgación', title: 'Nutracéuticos bolivianos con potencial exportador',desc: 'Investigadores de ECOGEN documentan propiedades terapéuticas del majo y el copoazú.' },
    ].map(n => `
      <article class="news-item">
        <span class="badge badge-green">${n.cat}</span>
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
      </article>`).join('');
  }
}


// Page router (SPA-lite)
// Each "page" section is toggled; only home renders everything inline
function initRouter() {
  // Handle smooth navigation clicks
  document.querySelectorAll('[data-page-link]').forEach(link => {
    link.addEventListener('click', e => {
      const page = link.dataset.pageLink;
      if (page) {
        e.preventDefault();
        window.location.href = page;
      }
    });
  });
}


// Mobile accordion for sub-links
function initMobileAccordion() {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    const trigger = item.querySelector('.mobile-nav-trigger');
    const sub = item.querySelector('.mobile-sub-links');
    trigger?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      if (sub) sub.style.display = open ? 'flex' : 'none';
    });
  });
}


// Init
document.addEventListener('DOMContentLoaded', () => {
  // Language
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
    b.addEventListener('click', () => setLang(b.dataset.lang));
  });
  applyTranslations();

  // Components
  initNavbar();
  initScrollReveal();
  initCounters();
  initRouter();
  initMobileAccordion();

  // Data
  loadProjectsPreview();
  loadNewsPreview();
});
