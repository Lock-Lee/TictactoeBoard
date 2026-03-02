import { Effect } from 'effect'
import { Elysia } from 'elysia'
import z from 'zod'
import { getLeaderboardResponseSchema, getLeaderboardSchema } from '../schemas/gameSchemas'
import { getLeaderboardService } from '../services/getLeaderboardService'
import { GAME_RUNTIME } from '../utils/runtime'

export const getLeaderboardHandler = new Elysia({ name: 'game.leaderboard.handler' }).get(
  '/game/leaderboard',
  async ({ query, set }) => {
    const serviceResult = getLeaderboardService({
      page: query.page,
      limit: query.limit,
    })

    return await Effect.match(serviceResult, {
      onFailure: (error) => {
        set.status = 500
        return { message: error.msg ?? 'Failed to get leaderboard' }
      },
      onSuccess: (data) => {
        set.status = 200
        return data
      },
    }).pipe(GAME_RUNTIME.runPromise)
  },
  {
    query: getLeaderboardSchema,
    response: {
      200: getLeaderboardResponseSchema,
      500: z.object({ message: z.string() }),
    },
    detail: {
      tags: ['Game'],
      summary: 'Get leaderboard',
      description: 'Get the game leaderboard with player rankings',
    },
  }
)
