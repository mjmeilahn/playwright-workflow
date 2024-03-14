
import { test, expect } from '@playwright/test'

/*
FOR CUSTOM ERRORS USE: await expect(0, 'Test failed for reason X.').toBeTruthy()
FOR CUSTOM PASSED USE: await expect(1).toBeTruthy()
FOR API TESTING, USE ANOTHER REPO: https://playwright.dev/docs/api-testing
*/

// test.use({
//   baseURL: 'https://swapi.dev/api',
//   extraHTTPHeaders: {
//     // 'Accept': '',
//     // Add authorization token to all requests.
//     // Assuming personal access token available in the environment.
//     // 'Authorization': `token ${process.env.API_TOKEN}`,
//   },
// })

// test('API: GET one Person', async ({ request }) => {
//   const person = await request.get('/people/1')
//   console.log(person)
// })
