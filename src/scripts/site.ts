export {};
const key = 'axia-selection-v1';
const getSelection = (): string[] => { try { const data = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(data) ? data.filter((x): x is string => typeof x === 'string') : []; } catch { return []; } };
const saveSelection = (items: string[]) => { localStorage.setItem(key, JSON.stringify(items)); refresh(); };
const refresh = () => {
  const selection = getSelection();
  document.querySelectorAll<HTMLElement>('[data-selection-count]').forEach((el) => el.textContent = String(selection.length));
  document.querySelectorAll<HTMLButtonElement>('[data-add-selection]').forEach((button) => {
    const selected = selection.includes(button.dataset.addSelection || '');
    button.textContent = selected ? 'En mi selección ✓' : 'Agregar a mi selección';
    button.setAttribute('aria-pressed', String(selected));
  });
  document.dispatchEvent(new CustomEvent('axia:selection-changed', { detail: selection }));
};
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mainNav = document.querySelector<HTMLElement>('#main-nav');
const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menú');
  mainNav?.classList.remove('open');
};
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mainNav?.classList.toggle('open', open);
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => {
  if (event.target instanceof Node && !menuButton?.contains(event.target) && !mainNav?.contains(event.target)) closeMenu();
});
document.querySelectorAll<HTMLButtonElement>('[data-add-selection]').forEach((button) => button.addEventListener('click', () => {
  const slug = button.dataset.addSelection;
  if (!slug) return;
  const items = getSelection();
  saveSelection(items.includes(slug) ? items.filter((x) => x !== slug) : [...items, slug]);
}));
document.querySelector<HTMLButtonElement>('[data-share]')?.addEventListener('click', async (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  try {
    if (navigator.share) await navigator.share({ title: document.title, url: location.href });
    else { await navigator.clipboard.writeText(location.href); button.textContent = 'Enlace copiado ✓'; }
  } catch { /* User cancelled the system share sheet. */ }
});
document.addEventListener('axia:selection-removed', refresh);
refresh();
