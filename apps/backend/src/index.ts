import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
// Import feature routers
import { authRouter } from './api/features/auth/router'
import { gameRouter } from './api/features/game/router'
// Import plugins
import { requestIdPlugin } from './api/plugins/requestId'
import { logger } from './libs/logger'

// Validate CORS origin in production
const corsOrigin = process.env.CORS_ORIGIN
if (process.env.NODE_ENV === 'production' && !corsOrigin) {
  throw new Error('CORS_ORIGIN must be set in production environment')
}

const app = new Elysia()
  .use(requestIdPlugin)
  .onAfterHandle({ as: 'global' }, ({ set }) => {
    // Security headers
    set.headers['X-Content-Type-Options'] = 'nosniff'
    set.headers['X-Frame-Options'] = 'DENY'
    set.headers['X-XSS-Protection'] = '1; mode=block'
    set.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    if (process.env.NODE_ENV === 'production') {
      set.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    }
  })
  .use(
    cors({
      origin: corsOrigin || 'http://localhost:3001',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
      exposeHeaders: ['x-request-id'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Tic-Tac-Toe Game API',
          version: '1.0.0',
          description: 'API for Tic-Tac-Toe game with OAuth 2.0 authentication and scoring system',
        },
        tags: [
          { name: 'Authentication', description: 'OAuth 2.0 authentication endpoints' },
          { name: 'Game', description: 'Game and leaderboard endpoints' },
        ],
      },
    })
  )
  .get('/', () => ({
    message: 'Tic-Tac-Toe Game API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  }))
  .get('/health', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))
  // Mount API routes
  .use(authRouter)
  .use(gameRouter)
  .listen(process.env.PORT || 3000)

logger.info(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`)

export type App = typeof app
