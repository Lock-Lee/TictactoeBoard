import { Elysia } from 'elysia'
import { googleOAuthHandler } from './handlers/googleOAuthHandler'

export const authRouter = new Elysia({ name: 'auth.router' }).use(googleOAuthHandler)
