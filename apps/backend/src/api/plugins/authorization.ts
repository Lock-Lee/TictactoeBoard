import { Effect, ManagedRuntime } from 'effect'
import { Elysia } from 'elysia'
import { logger } from '../../libs/logger'
import { TokenProvider, TokenProviderDefault } from '../providers/token'

// Create runtime for token verification
const TOKEN_RUNTIME = ManagedRuntime.make(TokenProviderDefault())

/**
 * Authorization plugin for Elysia
 * Extracts and verifies JWT Bearer token from Authorization header
 * Stores tokenPayload in Elysia store for access in handlers
 *
 * @example
 * ```typescript
 * const handler = new Elysia()
 *   .use(authorizationPlugin)
 *   .get('/protected', ({ store }: any) => {
 *     return { userId: store.tokenPayload.userId }
 *   })
 * ```
 */
export const authorizationPlugin = new Elysia({ name: 'authorization' })
  // biome-ignore lint/suspicious/noExplicitAny: Elysia typing workaround
  .derive({ as: 'scoped' }, async ({ headers, set }: any) => {
    const auth = headers.authorization

    if (!auth || !auth.startsWith('Bearer ')) {
      set.status = 401
      throw new Error('Unauthorized: Missing or invalid authorization header')
    }

    const token = auth.slice(7)

    try {
      const tokenPayload = await Effect.gen(function* () {
        const tokenProvider = yield* TokenProvider
        return yield* tokenProvider.verifyToken(token)
      }).pipe(
        Effect.catchAll((err) => {
          return Effect.fail({ message: err.msg ?? 'Invalid or expired token' })
        }),
        TOKEN_RUNTIME.runPromise
      )

      return { tokenPayload }
    } catch (err: unknown) {
      const e = err as Error
      logger.warn('Token verification failed', { error: e.message })
      set.status = 401
      throw new Error(e.message ?? 'Unauthorized: Invalid token')
    }
  })
