import { Effect } from 'effect'
import { Elysia } from 'elysia'
import z from 'zod'
import { authorizationPlugin } from '../../../plugins/authorization'
import { getPlayerStatsResponseSchema } from '../schemas/gameSchemas'
import { getPlayerStatsService } from '../services/getPlayerStatsService'
import { GAME_RUNTIME } from '../utils/runtime'

export const getPlayerStatsHandler = new Elysia({ name: 'game.playerStats.handler' })
  .use(authorizationPlugin)
  .get(
    '/game/stats',
    async ({ tokenPayload, set }) => {
      const serviceResult = getPlayerStatsService({
        playerId: tokenPayload.userId,
      })

      return await Effect.match(serviceResult, {
        onFailure: (error) => {
          set.status = 404
          return { message: error.msg ?? 'Player not found' }
        },
        onSuccess: (data) => {
          set.status = 200
          return data
        },
      }).pipe(GAME_RUNTIME.runPromise)
    },
    {
      response: {
        200: getPlayerStatsResponseSchema,
        404: z.object({ message: z.string() }),
      },
      detail: {
        tags: ['Game'],
        summary: 'Get player stats',
        description: 'Get the current player statistics and recent games',
      },
    }
  )
