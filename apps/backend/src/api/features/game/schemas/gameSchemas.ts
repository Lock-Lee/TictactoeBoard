import z from 'zod'

// ==========================================
// Record Game Result
// ==========================================

export const recordGameResultSchema = z.object({
  result: z.enum(['WIN', 'LOSS', 'DRAW']),
  moves: z.array(
    z.object({
      position: z.number().min(0).max(8),
      player: z.enum(['X', 'O']),
    })
  ),
})

export type RecordGameResultInput = z.infer<typeof recordGameResultSchema>

export const recordGameResultResponseSchema = z.object({
  id: z.string(),
  result: z.enum(['WIN', 'LOSS', 'DRAW']),
  scoreChange: z.number(),
  bonusAwarded: z.boolean(),
  currentScore: z.number(),
  currentWinStreak: z.number(),
})

// ==========================================
// Get Leaderboard
// ==========================================

export const getLeaderboardSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>

export const leaderboardEntrySchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.string().nullable(),
  score: z.number(),
  totalGames: z.number(),
  totalWins: z.number(),
  totalLosses: z.number(),
  totalDraws: z.number(),
  winStreak: z.number(),
})

export const getLeaderboardResponseSchema = z.object({
  data: z.array(leaderboardEntrySchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
})

// ==========================================
// Get Player Stats
// ==========================================

export const getPlayerStatsResponseSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  image: z.string().nullable(),
  score: z.number(),
  winStreak: z.number(),
  totalGames: z.number(),
  totalWins: z.number(),
  totalLosses: z.number(),
  totalDraws: z.number(),
  winRate: z.number(),
  recentGames: z.array(
    z.object({
      id: z.string(),
      result: z.enum(['WIN', 'LOSS', 'DRAW']),
      createdAt: z.string().datetime(),
    })
  ),
})
