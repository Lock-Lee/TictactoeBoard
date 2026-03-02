import { expect, type Page, test } from '@playwright/test'

const MOCK_LEADERBOARD = {
  data: [
    {
      id: 'player-1',
      name: 'Alice',
      email: 'alice@example.com',
      image: null,
      score: 25,
      totalGames: 30,
      totalWins: 20,
      totalLosses: 5,
      totalDraws: 5,
      winStreak: 3,
    },
    {
      id: 'player-2',
      name: 'Bob',
      email: 'bob@example.com',
      image: null,
      score: 18,
      totalGames: 25,
      totalWins: 15,
      totalLosses: 7,
      totalDraws: 3,
      winStreak: 1,
    },
    {
      id: 'player-3',
      name: null,
      email: 'charlie@example.com',
      image: null,
      score: 10,
      totalGames: 15,
      totalWins: 10,
      totalLosses: 3,
      totalDraws: 2,
      winStreak: 0,
    },
  ],
  pagination: {
    page: 1,
    limit: 20,
    total: 3,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
}

test.describe('Leaderboard Page', () => {
  test.describe.configure({ mode: 'serial' })
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()

    // Mock leaderboard API
    await page.route('**/game/leaderboard*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(MOCK_LEADERBOARD),
      })
    )

    await page.goto('/leaderboard')
    await page.waitForLoadState('networkidle')
  })

  test.afterAll(async () => {
    await page.close()
  })

  // --- UI Elements ---

  test('should display leaderboard title', async () => {
    await expect(page.getByRole('heading', { name: /Leaderboard/i })).toBeVisible()
  })

  test('should display Home navigation button', async () => {
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible()
  })

  test('should display Play Game navigation button', async () => {
    await expect(page.getByRole('button', { name: 'Play Game' })).toBeVisible()
  })

  test('should display table headers', async () => {
    await expect(page.getByRole('columnheader', { name: 'Rank' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Player' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'Score' })).toBeVisible()
  })

  test('should display player names from leaderboard data', async () => {
    await expect(page.getByText('Alice', { exact: true })).toBeVisible()
    await expect(page.getByText('Bob', { exact: true })).toBeVisible()
  })

  test('should display player scores', async () => {
    // Score values are displayed in h6 Typography elements
    await expect(page.locator('h6', { hasText: '25' }).first()).toBeVisible()
    await expect(page.locator('h6', { hasText: '18' }).first()).toBeVisible()
  })

  // --- Navigation ---

  test('should navigate to home when Home button is clicked', async () => {
    await page.getByRole('button', { name: 'Home' }).click()
    await expect(page).toHaveURL(/\/(?:en|th)\/?$/)
    await page.goBack()
    await page.waitForLoadState('networkidle')
  })

  test('should navigate to game when Play Game is clicked (with auth)', async () => {
    // Set auth so game page doesn't redirect
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
    // Reload to populate Zustand store via initAuth
    await page.reload()
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: 'Play Game' }).click()
    await expect(page).toHaveURL(/\/game/)
    await page.goBack()
    await page.waitForLoadState('networkidle')

    // Clean up auth
    await page.evaluate(() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('player')
    })
  })

  // --- No Auth Required ---

  test('should be accessible without authentication', async () => {
    await page.evaluate(() => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('player')
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Alice', { exact: true })).toBeVisible()
    await expect(page.locator('h6', { hasText: '25' }).first()).toBeVisible()
  })

  // --- Empty State ---

  test('should show empty message when no players', async () => {
    await page.unroute('**/game/leaderboard*')
    await page.route('**/game/leaderboard*', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: [],
          pagination: {
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false,
          },
        }),
      })
    )
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('No games played yet. Be the first!')).toBeVisible()
  })

  // --- Pagination ---

  test('should display pagination when multiple pages exist', async () => {
    await page.unroute('**/game/leaderboard*')
    await page.route('**/game/leaderboard*', (route) => {
      const url = new URL(route.request().url())
      const pageNum = Number.parseInt(url.searchParams.get('page') || '1', 10)

      const players = Array.from({ length: 20 }, (_, i) => ({
        id: `player-${(pageNum - 1) * 20 + i + 1}`,
        name: `Player ${(pageNum - 1) * 20 + i + 1}`,
        email: `player${(pageNum - 1) * 20 + i + 1}@example.com`,
        image: null,
        score: 100 - (pageNum - 1) * 20 - i,
        totalGames: 50,
        totalWins: 30,
        totalLosses: 10,
        totalDraws: 10,
        winStreak: 0,
      }))

      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: players,
          pagination: {
            page: pageNum,
            limit: 20,
            total: 45,
            totalPages: 3,
            hasNext: pageNum < 3,
            hasPrev: pageNum > 1,
          },
        }),
      })
    })

    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.locator('.MuiPagination-root')).toBeVisible()
  })
})
