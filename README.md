# Playwright UI Automation Challenge

A suite of Playwright tests covering real-world UI automation scenarios including timing, dynamic content, flaky selectors, conditional rendering, and nested modals.

## Tests

| # | Test | File | Key Focus |
|---|------|------|-----------|
| 1 | Delayed Button Flow | `tests/delayed-button.spec.ts` | Async button enable, no hardcoded waits |
| 2 | Lazy Loaded List | `tests/lazy-list.spec.ts` | Pagination, loading states, dynamic data |
| 3 | Dynamic ID Handling | `tests/dynamic-ids.spec.ts` | Selecting by text content, regenerated DOM |
| 4 | Conditional Login Flow | `tests/conditional-render.spec.ts` | Role-based rendering, loading → dashboard |
| 5 | Modal Confirmation Flow | `tests/modal-flow.spec.ts` | Nested dialogs, z-index, DOM removal |

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

## Run Tests

```bash
# Run all 5 tests headlessly
npx playwright test

# Run with browser visible
npx playwright test --headed

# Run a single test
npx playwright test tests/delayed-button.spec.ts
```

## Project Structure

```
├── app/
│   └── index.html              # Test application
├── tests/
│   ├── delayed-button.spec.ts  # Test 1
│   ├── lazy-list.spec.ts       # Test 2
│   ├── dynamic-ids.spec.ts     # Test 3
│   ├── conditional-render.spec.ts # Test 4
│   ├── modal-flow.spec.ts      # Test 5
│   └── helpers/
│       └── app.ts              # Shared page helpers
├── playwright.config.ts        # Playwright configuration
├── package.json
└── README.md
```

## Configuration

- **Browser**: Chromium (Desktop Chrome)
- **Timeout**: 30s per test, 10s per action
- **Screenshots/Videos**: Captured on failure only
- **Web server**: Auto-started via `npx serve app/` on port 3000

## Acceptance Criteria Coverage

All tests avoid hardcoded waits (`page.waitForTimeout`), rely on Playwright's auto-waiting, and handle dynamic content without fragile selectors.
