/* ==========================================================================
   carousel.js — carrossel dos grupos de atividades.

   Você NÃO precisa editar este arquivo para adicionar atividades.
   Ele lê os slides que existem no HTML ([data-slide]) e monta sozinho:
   os botões "01 Grupo 1…", o contador "01 / 04", o texto "Grupo 1 de 4",
   as bolinhas e as setas.

   O nome do grupo vem do texto do elemento [data-slide-label] de cada slide.
   ========================================================================== */
(() => {
  'use strict';

  const pad = (n) => String(n).padStart(2, '0');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function createButton(className, attributes = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    Object.entries(attributes).forEach(([name, value]) => button.setAttribute(name, value));
    return button;
  }

  function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('[data-slide]'));
    if (slides.length === 0) return;

    const total = slides.length;
    const tabsBox = root.querySelector('[data-carousel-tabs]');
    const dotsBox = root.querySelector('[data-carousel-dots]');
    const counter = root.querySelector('[data-carousel-counter]');
    const status = root.querySelector('[data-carousel-status]');
    const prevButton = root.querySelector('[data-carousel-prev]');
    const nextButton = root.querySelector('[data-carousel-next]');

    let current = 0;
    const tabs = [];
    const dots = [];

    /* ---------- Monta seletores e bolinhas a partir dos slides ---------- */
    slides.forEach((slide, index) => {
      const label = (slide.querySelector('[data-slide-label]')?.textContent || `Grupo ${index + 1}`).trim();
      const slideId = slide.id || `slide-${index + 1}`;
      slide.id = slideId;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${label} (${index + 1} de ${total})`);

      if (tabsBox) {
        const tab = createButton('carousel__tab', { 'aria-controls': slideId });
        tab.textContent = `${pad(index + 1)}   ${label}`;
        tab.addEventListener('click', () => goTo(index));
        tabsBox.appendChild(tab);
        tabs.push(tab);
      }

      if (dotsBox) {
        const dot = createButton('carousel__dot', {
          'aria-label': `Ir para ${label}`,
          'aria-controls': slideId,
        });
        dot.addEventListener('click', () => goTo(index));
        dotsBox.appendChild(dot);
        dots.push(dot);
      }
    });

    /* ---------- Navegação ---------- */
    function slideOffset(index) {
      const paddingLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      return slides[index].offsetLeft - paddingLeft;
    }

    function goTo(index, instant = false) {
      const target = Math.max(0, Math.min(total - 1, index));
      const behavior = instant || prefersReducedMotion.matches ? 'auto' : 'smooth';
      track.scrollTo({ left: slideOffset(target), behavior });
      setActive(target);
    }

    function setActive(index) {
      current = index;
      const label = slides[index].querySelector('[data-slide-label]')?.textContent.trim() || `Grupo ${index + 1}`;

      tabs.forEach((tab, i) => {
        tab.classList.toggle('is-active', i === index);
        if (i === index) tab.setAttribute('aria-current', 'true');
        else tab.removeAttribute('aria-current');
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));

      if (counter) counter.textContent = `${pad(index + 1)} / ${pad(total)}`;
      if (status) status.textContent = `${label} de ${total}`;
      if (prevButton) prevButton.disabled = index === 0;
      if (nextButton) nextButton.disabled = index === total - 1;
    }

    /* Atualiza o estado quando a pessoa arrasta/rola o carrossel */
    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        let closest = 0;
        let smallestDistance = Infinity;
        slides.forEach((_, i) => {
          const distance = Math.abs(slideOffset(i) - track.scrollLeft);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closest = i;
          }
        });
        if (closest !== current) setActive(closest);
      });
    }, { passive: true });

    prevButton?.addEventListener('click', () => goTo(current - 1));
    nextButton?.addEventListener('click', () => goTo(current + 1));
    window.addEventListener('resize', () => goTo(current, true));

    setActive(0);
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();
