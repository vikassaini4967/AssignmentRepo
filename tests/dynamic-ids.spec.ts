import { test, expect } from '@playwright/test';
import { goToTab, openApp } from './helpers/app';

test.describe('Dynamic ID Handling', () => {
  test('selects an item by name after IDs are regenerated', async ({ page }) => {
    const app = await openApp(page);
    await goToTab(app, /flaky selectors/i);

    await app.getByRole('button', { name: /regenerate all ids/i }).click();

    const betaItem = app.getByText('Beta', { exact: true });
    await expect(betaItem).toBeVisible();
    await betaItem.click();

    await expect(app.getByText(/selected:\s*beta/i)).toBeVisible();

    await app.getByRole('button', { name: /regenerate all ids/i }).click();
    await expect(app.getByText(/selected:\s*beta/i)).toBeVisible();
  });
});
