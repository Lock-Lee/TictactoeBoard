import { Effect } from 'effect'
import { Elysia } from 'elysia'
import z from 'zod'
import { authorizationPlugin } from '../../../plugins/authorization'
import { recordGameResultResponseSchema, recordGameResultSchema } from '../schemas/gameSchemas'
import { recordGameResultService } from '../services/recordGameResultService'
import { GAME_RUNTIME } from '../utils/runtime'

export const recordGameResultHandler = new Elysia({ name: 'game.recordResult.handler' })
  .use(authorizationPlugin)
  .post(
    '/game/result',
    async ({ body, tokenPayload, set }) => {
      const serviceResult = recordGameResultService({
        playerId: tokenPayload.userId,
        result: body.result as 'WIN' | 'LOSS' | 'DRAW',
        moves: body.moves,
      })

      return await Effect.match(serviceResult, {
        onFailure: (error) => {
          set.status = 500
          return { message: error.msg ?? 'Failed to record game result' }
        },
        onSuccess: (data) => {
          set.status = 201
          return data
        },
      }).pipe(GAME_RUNTIME.runPromise)
    },
    {
      body: recordGameResultSchema,
      response: {
        201: recordGameResultResponseSchema,
        500: z.object({ message: z.string() }),
      },
      detail: {
        tags: ['Game'],
        summary: 'Record game result',
        description: 'Record a completed game result and update player score',
      },
    }
  )
