import { expect, type Page, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.describe.configure({ mode: 'serial' })
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.afterAll(async () => {
    await page.close()
  })

  // --- Unauthenticated ---

  test('should display app title and subtitle', async () => {
    await expect(page.getByText('Tic-Tac-Toe')).toBeVisible()
    await expect(page.getByText('Player vs Bot - Can you beat the AI?')).toBeVisible()
  })

  test('should show sign in prompt when not logged in', async () => {
    await expect(page.getByText('Sign in to Play')).toBeVisible()
    await expect(
      page.getByText('Sign in with your Google account to start playing and track your scores')
    ).toBeVisible()
  })

  test('should show OAuth 2.0 branding', async () => {
    await expect(page.getByText('OAuth 2.0 powered by Google')).toBeVisible()
  })

  test('should not show Play Game or Leaderboard buttons when not logged in', async () => {
    await expect(page.getByRole('button', { name: 'Play Game' })).not.toBeVisible()
    await expect(page.getByRole('button', { name: 'Leaderboard' })).not.toBeVisible()
  })

  // --- Authenticated ---

  test('should display player info after login', async () => {
    await page.evaluate(() => {
      const player = {
        id: 'test-player-id',
        email: 'test@example.com',
        name: 'Test Player',
        image: null,
        score: 5,
      }
      localStorage.setItem('accessToken', 'test-jwt-token')
      localStorage.setItem('player', JSON.stringify(player))
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Test Player')).toBeVisible()
    await expect(page.getByText('test@example.com')).toBeVisible()
  })

  test('should display player score', async () => {
    await expect(page.getByText('Score: 5')).toBeVisible()
  })

  test('should show Play Game button', async () => {
    await expect(page.getByRole('button', { name: 'Play Game' })).toBeVisible()
  })

  test('should show Leaderboard button', async () => {
    await expect(page.getByRole('button', { name: 'Leaderboard' })).toBeVisible()
  })

  test('should show Logout button', async () => {
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
  })

  test('should navigate to game page when Play Game is clicked', async () => {
    await page.getByRole('button', { name: 'Play Game' }).click()
    await expect(page).toHaveURL(/\/game/)
    await page.goBack()
    await page.waitForLoadState('networkidle')
  })

  test('should navigate to leaderboard when Leaderboard is clicked', async () => {
    await page.getByRole('button', { name: 'Leaderboard' }).click()
    await expect(page).toHaveURL(/\/leaderboard/)
    await page.goBack()
    await page.waitForLoadState('networkidle')
  })

  test('should logout and show sign in when Logout is clicked', async () => {
    await page.getByRole('button', { name: 'Logout' }).click()
    await expect(page.getByText('Sign in to Play')).toBeVisible()
  })
})
