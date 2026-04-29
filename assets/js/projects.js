(function () {
  const section = document.querySelector('.projects-section');
  if (!section) return;

  const cards = Array.from(section.querySelectorAll('.carousel-card'));
  const dots = Array.from(section.querySelectorAll('.carousel-dot'));
  const prevBtn = section.querySelector('.carousel-prev');
  const nextBtn = section.querySelector('.carousel-next');
  const total = cards.length;
  let current = 0;

  function classFor(diff) {
    if (total < 2) return 'is-active';
    const half = Math.floor(total / 2);
    if (diff === 0) return 'is-active';
    if (diff === 1) return 'is-next';
    if (diff === total - 1) return 'is-prev';
    if (diff === 2 && total > 4) return 'is-far-next';
    if (diff === total - 2 && total > 4) return 'is-far-prev';
    return 'is-hidden';
  }

  function render() {
    cards.forEach((card, i) => {
      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next', 'is-hidden');
      const diff = ((i - current) + total) % total;
      card.classList.add(classFor(diff));
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function go(delta) {
    if (total < 2) return;
    current = ((current + delta) % total + total) % total;
    render();
  }

  function jumpTo(idx) {
    if (idx < 0 || idx >= total) return;
    current = idx;
    render();
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); go(-1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); go(1); });

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('is-prev') || card.classList.contains('is-far-prev')) {
        e.preventDefault();
        const idx = parseInt(card.dataset.idx, 10);
        if (!isNaN(idx)) jumpTo(idx);
      } else if (card.classList.contains('is-next') || card.classList.contains('is-far-next')) {
        e.preventDefault();
        const idx = parseInt(card.dataset.idx, 10);
        if (!isNaN(idx)) jumpTo(idx);
      }
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(dot.dataset.idx, 10);
      if (!isNaN(idx)) jumpTo(idx);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (section.dataset.view !== 'cards') return;
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  let touchStartX = null;
  const stage = section.querySelector('.carousel-stage');
  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchStartX = null;
    });
  }

  const toggleBtns = section.querySelectorAll('.view-toggle button');
  function setView(view) {
    if (view !== 'cards' && view !== 'list') return;
    section.dataset.view = view;
    toggleBtns.forEach((btn) => {
      const active = btn.dataset.view === view;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try { localStorage.setItem('projects-view', view); } catch (err) {}
  }
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  try {
    const saved = localStorage.getItem('projects-view');
    if (saved) setView(saved);
  } catch (err) {}

  render();
})();
