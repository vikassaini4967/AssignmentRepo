import { expect, type FrameLocator, type Page } from '@playwright/test';

const CLAUDE_ARTIFACT_HOST = 'claude.ai';

/**
 * Returns a locator scope for the challenge app.
 * The assignment hosts the app inside a Claude artifact iframe; a local copy
 * is served from / when running against localhost (see playwright.config.ts).
 */
export function appScope(page: Page): Page | FrameLocator {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? process.env.BASE_URL ?? '';
  const usesClaudeArtifact =
    baseURL.includes(CLAUDE_ARTIFACT_HOST) ||
    (!baseURL && page.url().includes(CLAUDE_ARTIFACT_HOST));

  if (usesClaudeArtifact) {
    return page.frameLocator('iframe[title="Claude content"]');
  }

  return page;
}

export async function openApp(page: Page): Promise<Page | FrameLocator> {
  await page.goto('/');

  const acceptCookies = page.getByRole('button', { name: /accept all cookies/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  const notFound = page.getByRole('heading', { name: /page not found/i });
  await expect(notFound).not.toBeVisible({ timeout: 5_000 }).catch(() => {});

  const scope = appScope(page);

  if (scope !== page) {
    await expect(scope.getByRole('heading', { name: /playwright automation challenge/i })).toBeVisible({
      timeout: 60_000,
    });
  } else {
    await expect(page.getByRole('heading', { name: /playwright automation challenge/i })).toBeVisible();
  }

  return scope;
}

export async function goToTab(
  scope: Page | FrameLocator,
  tabName: RegExp
): Promise<void> {
  const tab = scope.getByRole('button', { name: tabName });
  await expect(tab).toBeVisible();
  await tab.click();
}
