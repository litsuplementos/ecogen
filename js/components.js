// js/components.js

const IS_SUBPAGE = window.location.pathname.includes('/pages/');
const PREFIX = IS_SUBPAGE ? '' : 'pages/';

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

window.renderFooter = renderFooter;
window.initSubnav = initSubnav;
window.initAccordions = initAccordions;