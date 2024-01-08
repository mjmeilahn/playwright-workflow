import { test, expect, request } from '@playwright/test'

/*
FOR CUSTOM ERRORS USE: await expect(0, 'Test failed for reason X.').toBeTruthy()
FOR CUSTOM PASSED USE: await expect(1).toBeTruthy()
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

// test('GET Request returns a 200 HTTP Response', async ({ request }) => {
//   const response = await request.get('http-address-here')
//   expect(response.ok()).toBeTruthy()
// })
