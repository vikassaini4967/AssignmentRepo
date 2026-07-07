import { test, expect } from '@playwright/test';
import { goToTab, openApp } from './helpers/app';

test.describe('Load and Verify List Items', () => {
  test('loads 15 items with a mix of active and pending statuses', async ({ page }) => {
    const app = await openApp(page);
    await goToTab(app, /timing challenges/i);

    const listItems = app.getByTestId('list-item');
    const loadMoreButton = app.getByRole('button', { name: /load more items/i });
    const loadingIndicator = app.getByText('Loading...');

    for (let click = 0; click < 3; click++) {
      const countBefore = await listItems.count();
      await loadMoreButton.click();

      await expect(loadingIndicator).toBeVisible();
      await expect(loadingIndicator).toBeHidden({ timeout: 5_000 });

      await expect(listItems).toHaveCount(countBefore + 5, { timeout: 5_000 });
    }

    await expect(listItems).toHaveCount(15);

    const statuses = await listItems.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('data-status'))
    );

    expect(statuses).toContain('active');
    expect(statuses).toContain('pending');
  });
});
