
import { test, expect } from '@playwright/test'

/*
FOR CUSTOM ERRORS USE: await expect(0, 'Test failed for reason X.').toBeTruthy()
FOR CUSTOM PASSED USE: await expect(1).toBeTruthy()
API TESTING DOCS: https://playwright.dev/docs/api-testing
CREATE SEPARATE CONFIGS FOR API TESTING: https://www.youtube.com/watch?v=S12sspgH8es&list=PL-hNDoK1-od_HpjnFwFZnjKpIs_D-lEpn
*/

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})
