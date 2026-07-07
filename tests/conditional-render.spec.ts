import { test, expect } from '@playwright/test';
import { goToTab, openApp } from './helpers/app';

test.describe('Conditional Login Flow', () => {
  test('shows the correct panel for each role and hides the other', async ({ page }) => {
    const app = await openApp(page);
    await goToTab(app, /flaky selectors/i);

    const adminPanel = app.getByTestId('admin-panel');
    const standardPanel = app.getByTestId('standard-panel');
    const loadingIndicator = app.getByText('Loading dashboard...');

    await app.getByRole('button', { name: /admin user/i }).click();
    await expect(loadingIndicator).toBeVisible();
    await expect(loadingIndicator).toBeHidden({ timeout: 5_000 });

    await expect(adminPanel).toBeVisible();
    await expect(standardPanel).not.toBeVisible();

    await app.getByRole('button', { name: /^logout$/i }).click();

    await app.getByRole('button', { name: /standard user/i }).click();
    await expect(loadingIndicator).toBeVisible();
    await expect(loadingIndicator).toBeHidden({ timeout: 5_000 });

    await expect(standardPanel).toBeVisible();
    await expect(adminPanel).not.toBeVisible();
  });
});
