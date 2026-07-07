import { test, expect } from '@playwright/test';
import { goToTab, openApp } from './helpers/app';

test.describe('Modal Confirmation Flow', () => {
  test('confirms through nested modals and closes both', async ({ page }) => {
    const app = await openApp(page);
    await goToTab(app, /responsive/i);

    await app.getByRole('button', { name: /open modal/i }).click();

    const outerModal = app.getByRole('dialog').first();
    await expect(outerModal).toBeVisible();

    await outerModal.getByRole('button', { name: /show details/i }).click();

    const nestedModal = app.getByRole('dialog').last();
    await expect(nestedModal).toBeVisible();

    await nestedModal.getByRole('button', { name: /^confirm$/i }).click();

    await expect(app.getByRole('dialog')).toHaveCount(0, { timeout: 5_000 });
    await expect(app.getByText('Result: confirmed')).toBeVisible();
  });
});
