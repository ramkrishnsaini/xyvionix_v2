/**
 * Hub filtering. Enhancement only: every item is a normal link in the static
 * HTML, and filtering changes visibility without creating or changing URLs,
 * so no crawlable parameter pages exist.
 *
 * Markup contract:
 *   [data-filter-group]            container of buttons, hidden until script runs
 *   button[data-filter="<key>"]    "" means show everything
 *   [data-filter-section="<key>"]  a block shown only when its key is selected
 *   [data-filter-item="<key>"]     an item shown only when its key is selected
 */

function initFilters(): void {
  const group = document.querySelector<HTMLElement>('[data-filter-group]');
  if (!group) return;

  const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[data-filter]')];
  const sections = [...document.querySelectorAll<HTMLElement>('[data-filter-section]')];
  const items = sections.length === 0 ? [...document.querySelectorAll<HTMLElement>('[data-filter-item]')] : [];
  const status = document.querySelector<HTMLElement>('[data-filter-status]');

  if (buttons.length === 0 || (sections.length === 0 && items.length === 0)) return;

  group.hidden = false;

  const apply = (key: string) => {
    let shown = 0;

    for (const section of sections) {
      const match = key === '' || section.dataset.filterSection === key;
      section.hidden = !match;
      if (match) shown += section.querySelectorAll('a[href]').length;
    }

    for (const item of items) {
      const match = key === '' || item.dataset.filterItem === key;
      item.hidden = !match;
      if (match) shown += 1;
      // Reveal animation must not leave a filtered-in item invisible.
      if (match) item.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
      if (match && item.classList.contains('rv')) item.classList.add('in');
    }

    for (const button of buttons) {
      button.setAttribute('aria-pressed', String((button.dataset.filter ?? '') === key));
    }

    if (status) status.textContent = `${shown} ${shown === 1 ? 'item' : 'items'} shown`;
  };

  for (const button of buttons) {
    button.addEventListener('click', () => apply(button.dataset.filter ?? ''));
  }
}

initFilters();
