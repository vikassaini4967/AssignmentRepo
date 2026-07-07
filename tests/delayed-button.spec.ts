import { test, expect } from '@playwright/test';
import { goToTab, openApp } from './helpers/app';

test.describe('Delayed Button Flow', () => {
  test('enables the confirm button after processing and shows success', async ({ page }) => {
    const app = await openApp(page);
    await goToTab(app, /timing challenges/i);

    await app.getByRole('button', { name: /start process/i }).click();

    const confirmButton = app.getByRole('button', { name: /confirm action/i });
    await expect(confirmButton).toBeVisible();
    await expect(confirmButton).toBeEnabled({ timeout: 5_000 });

    await confirmButton.click();

    await expect(app.getByText(/success/i)).toBeVisible();
  });
});
