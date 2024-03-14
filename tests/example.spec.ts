
import { test, expect } from '@playwright/test'

/*
FOR CUSTOM ERRORS USE: await expect(0, 'Test failed for reason X.').toBeTruthy()
FOR CUSTOM PASSED USE: await expect(1).toBeTruthy()
API TESTING DOCS: https://playwright.dev/docs/api-testing
CREATE SEPARATE CONFIGS FOR API TESTING: https://www.youtube.com/watch?v=S12sspgH8es&list=PL-hNDoK1-od_HpjnFwFZnjKpIs_D-lEpn
*/

test('Has Title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page, 'Expected title to be "Playwright."').toHaveTitle(/Playwright/)
})

test('Get Started Link Is Visible', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' }), 'Expected page heading "Installation" was not visible.').toBeVisible()
})

test('Has Title 2', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page, 'Expected title to be "Playwright."').toHaveTitle(/Playwright/)
})

test('Get Started Link Is Visible 2', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' }), 'Expected page heading "Installation" was not visible.').toBeVisible()
})

test('Has Title 3', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page, 'Expected title to be "Playwright."').toHaveTitle(/Playwright/)
})

test('Get Started Link Is Visible 3', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' }), 'Expected page heading "Installation" was not visible.').toBeVisible()
})

test('Has Title 4', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page, 'Expected title to be "Playwright."').toHaveTitle(/Playwright/)
})

test('Get Started Link Is Visible 4', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' }), 'Expected page heading "Installation" was not visible.').toBeVisible()
})

test('Has Title 5', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page, 'Expected title to be "Playwright."').toHaveTitle(/Playwright/)
})

test('Get Started Link Is Visible 5', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' }), 'Expected page heading "Installation" was not visible.').toBeVisible()
})
