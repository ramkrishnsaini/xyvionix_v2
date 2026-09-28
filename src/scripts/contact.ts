/**
 * Contact form enhancement: inline validation and submission without reload.
 * Without this script the form still posts normally to its action URL.
 */

import { track } from './analytics.ts';

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const messages: Record<string, string> = {
  name: 'Enter your name.',
  email: 'Enter a business email address, for example name@company.com.',
  company: 'Enter your company name.',
  role: 'Select your role.',
  assurance_area: 'Select an assurance area, or choose "Not sure yet".',
  timing: 'Select the timing that applies.',
  system: 'Name the system or process to be assured.',
  must_remain_true: 'Describe the outcome that must remain true.',
  concern: 'Describe your current concern.',
  impact: 'Describe the impact on the business.',
};

function errorFor(field: Field): string | null {
  const value = field.value.trim();
  if (field.required && value === '') return messages[field.name] ?? 'This field is required.';
  if (field instanceof HTMLInputElement && field.type === 'email' && value !== '') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return messages.email ?? 'Enter a valid email address.';
  }
  return null;
}

function show(field: Field, message: string | null): void {
  const slot = document.getElementById(`${field.id}-error`);
  if (!slot) return;

  const described = (field.getAttribute('aria-describedby') ?? '').split(' ').filter((id) => id && id !== slot.id);

  if (message) {
    slot.textContent = message;
    slot.hidden = false;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', [...described, slot.id].join(' '));
  } else {
    slot.textContent = '';
    slot.hidden = true;
    field.removeAttribute('aria-invalid');
    if (described.length > 0) field.setAttribute('aria-describedby', described.join(' '));
    else field.removeAttribute('aria-describedby');
  }
}

function init(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form || !form.getAttribute('action')) return;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const fields = [...form.querySelectorAll<Field>('input[name], select[name], textarea[name]')].filter(
    (f) => f.name !== 'website',
  );

  let started = false;
  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      track('contact_start');
    }
  });

  for (const field of fields) {
    field.addEventListener('blur', () => show(field, errorFor(field)));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') show(field, errorFor(field));
    });
  }

  const say = (text: string) => {
    if (!status) return;
    status.textContent = text;
    status.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let first: Field | null = null;
    for (const field of fields) {
      const message = errorFor(field);
      show(field, message);
      if (message && !first) first = field;
    }
    if (first) {
      first.focus();
      say('Some fields need attention before the request can be sent.');
      return;
    }

    const data = new FormData(form);
    if (String(data.get('website') ?? '') !== '') return; // automated submission

    if (button) button.disabled = true;
    say('Sending.');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      track('contact_submit', { assurance_area: String(data.get('assurance_area') ?? '') });
      form.reset();
      say(form.dataset.success ?? 'Your request has been received.');
      status?.focus?.();
    } catch {
      say(form.dataset.failure ?? 'The request could not be sent. Please try again.');
    } finally {
      if (button) button.disabled = false;
    }
  });
}

init();
