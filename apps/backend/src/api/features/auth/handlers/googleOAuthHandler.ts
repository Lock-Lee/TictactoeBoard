import { Effect, ManagedRuntime } from 'effect'
import { Elysia } from 'elysia'
import z from 'zod'
import { TokenProviderDefault } from '../../../providers/token'
import { googleOAuthService } from '../services/googleOAuthService'

const AUTH_RUNTIME = ManagedRuntime.make(TokenProviderDefault())

const googleOAuthSchema = z.object({
  credential: z.string().min(1, 'Google credential is required'),
})

const googleOAuthResponseSchema = z.object({
  token: z.string(),
  player: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    image: z.string().nullable(),
    score: z.number(),
  }),
})

export const googleOAuthHandler = new Elysia({ name: 'auth.google.handler' }).post(
  '/auth/google',
  async ({ body, set }) => {
    const serviceResult = googleOAuthService({
      credential: body.credential,
    })

    return await Effect.match(serviceResult, {
      onFailure: (error) => {
        set.status = 401
        return { message: error.msg ?? 'Authentication failed' }
      },
      onSuccess: (data) => {
        set.status = 200
        return data
      },
    }).pipe(AUTH_RUNTIME.runPromise)
  },
  {
    body: googleOAuthSchema,
    response: {
      200: googleOAuthResponseSchema,
      401: z.object({ message: z.string() }),
    },
    detail: {
      tags: ['Authentication'],
      summary: 'Google OAuth 2.0 Login',
      description: 'Authenticate user via Google OAuth 2.0 ID token',
    },
  }
)
