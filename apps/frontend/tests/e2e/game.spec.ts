import { expect, type Page, test } from '@playwright/test'

test.describe('Game Page', () => {
  test.describe.configure({ mode: 'serial' })
  let page: Page

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterAll(async () => {
    await page.close()
  })

  // --- Auth Guard ---

  test('should redirect to home if not authenticated', async () => {
    await page.goto('/game')
    // i18n redirects to /{locale}/game, then auth guard redirects to home
    await expect(page).toHaveURL(/\/(?:en|th)\/?$/)
  })

  // --- Set up auth & navigate via client-side routing ---

  test('should load game page when authenticated', async () => {
    // We're on the home page after redirect — set auth in localStorage
    await page.evaluate(() => {
      const player = {
        id: 'test-player-id',
        email: 'test@example.com',
        name: 'Test Player',
        image: null,
        score: 10,
      }
      localStorage.setItem('accessToken', 'test-jwt-token')
      localStorage.setItem('player', JSON.stringify(player))
    })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Use client-side navigation to avoid auth guard race condition
    await page.getByRole('button', { name: 'Play Game' }).click()
    await expect(page).toHaveURL(/\/game/)

    // Verify game page loaded
    await expect(page.getByRole('heading', { name: 'Tic-Tac-Toe' })).toBeVisible()
  })

  // --- UI Element Tests ---

  test('should display player score', async () => {
    await expect(page.getByText('Score: 10')).toBeVisible()
  })

  test('should display bonus hint text', async () => {
    await expect(page.getByText('Win 3 in a row for a bonus point!')).toBeVisible()
  })

  test('should display difficulty selector chips', async () => {
    await expect(page.getByText('😊 Easy')).toBeVisible()
    await expect(page.getByText('🤔 Medium')).toBeVisible()
    await expect(page.getByText('🤖 Hard')).toBeVisible()
  })

  test('should have Medium difficulty selected by default', async () => {
    const mediumChip = page.locator('.MuiChip-filled', { hasText: '🤔 Medium' })
    await expect(mediumChip).toBeVisible()
  })

  test('should allow switching difficulty', async () => {
    await page.getByText('😊 Easy').click()
    const easyChip = page.locator('.MuiChip-filled', { hasText: '😊 Easy' })
    await expect(easyChip).toBeVisible()
    // Reset to medium
    await page.getByText('🤔 Medium').click()
  })

  test('should display 3x3 game board with 9 cells', async () => {
    const cells = page.locator('.MuiPaper-root:not(.MuiCard-root)')
    await expect(cells).toHaveCount(9)
  })

  test('should show status chip with Your Turn initially', async () => {
    await expect(page.getByText('🎮 Your Turn (X)')).toBeVisible()
  })

  test('should display Home navigation button', async () => {
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible()
  })

  test('should display Leaderboard navigation button', async () => {
    await expect(page.getByRole('button', { name: 'Leaderboard' })).toBeVisible()
  })

  // --- Navigation Tests ---

  test('should navigate to leaderboard and back', async () => {
    await page.getByRole('button', { name: 'Leaderboard' }).click()
    await expect(page).toHaveURL(/\/leaderboard/)
    await page.goBack()
    await expect(page).toHaveURL(/\/game/)
    await page.waitForLoadState('networkidle')
  })

  test('should navigate to home and back to game', async () => {
    await page.getByRole('button', { name: 'Home' }).click()
    await expect(page).toHaveURL(/\/(?:en|th)\/?$/)
    // Return to game via client-side navigation
    await page.getByRole('button', { name: 'Play Game' }).click()
    await expect(page).toHaveURL(/\/game/)
    await page.waitForLoadState('networkidle')
  })

  // --- Gameplay Tests ---

  test('should place X when player clicks an empty cell', async () => {
    // Use Easy difficulty for testing
    await page.getByText('😊 Easy').click()

    const cells = page.locator('.MuiPaper-root:not(.MuiCard-root)')
    await cells.nth(4).click() // Click center cell

    await expect(cells.nth(4).getByText('X')).toBeVisible()
  })

  test('should show Bot Thinking then bot places O', async () => {
    // After player clicks, status changes to Bot Thinking
    await expect(page.getByText('🤖 Bot Thinking...')).toBeVisible()

    // Wait for bot to finish (400ms delay + processing)
    const turnOrEnd = page.getByText('🎮 Your Turn (X)').or(page.getByText(/You Win|Bot Wins|Draw/))
    await expect(turnOrEnd).toBeVisible({ timeout: 3000 })

    // Bot should have placed an O somewhere
    const cells = page.locator('.MuiPaper-root:not(.MuiCard-root)')
    await expect(cells.getByText('O').first()).toBeVisible()
  })

  test('should not allow clicking on occupied cells', async () => {
    const cells = page.locator('.MuiPaper-root:not(.MuiCard-root)')
    // Cell 4 has X from previous test
    const before = await cells.nth(4).textContent()
    await cells.nth(4).click()
    const after = await cells.nth(4).textContent()
    expect(before).toBe(after)
  })

  test('should complete game and show Play Again button', async () => {
    // Mock the API for game result
    await page.route('**/game/result', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'game-123',
          result: 'DRAW',
          scoreChange: 0,
          bonusAwarded: false,
          currentScore: 10,
          currentWinStreak: 0,
        }),
      })
    )

    const cells = page.locator('.MuiPaper-root:not(.MuiCard-root)')
    const playAgainBtn = page.getByRole('button', { name: /Play Again/i })

    // Keep playing until game ends (max 5 player turns)
    for (let attempt = 0; attempt < 5; attempt++) {
      if (await playAgainBtn.isVisible().catch(() => false)) break

      // Wait for player's turn or game over
      const turnOrEnd = page.getByText('🎮 Your Turn (X)').or(playAgainBtn)
      await expect(turnOrEnd).toBeVisible({ timeout: 3000 })

      if (await playAgainBtn.isVisible().catch(() => false)) break

      // Click first available empty cell
      let clicked = false
      for (let i = 0; i < 9; i++) {
        const text = (await cells.nth(i).textContent())?.trim()
        if (!text) {
          await cells.nth(i).click()
          clicked = true
          break
        }
      }
      if (!clicked) break

      // Wait for bot response or game end
      await expect(
        page.getByText('🎮 Your Turn (X)').or(page.getByText(/You Win|Bot Wins|Draw/))
      ).toBeVisible({ timeout: 3000 })
    }

    // Game should end with a result
    await expect(page.getByText(/You Win|Bot Wins|Draw/)).toBeVisible({ timeout: 5000 })

    // Play Again button should appear
    await expect(playAgainBtn).toBeVisible()
  })
})
