import { Elysia } from 'elysia'
import { getLeaderboardHandler } from './handlers/getLeaderboardHandler'
import { getPlayerStatsHandler } from './handlers/getPlayerStatsHandler'
import { recordGameResultHandler } from './handlers/recordGameResultHandler'

export const gameRouter = new Elysia({ name: 'game.router' })
  .use(recordGameResultHandler)
  .use(getLeaderboardHandler)
  .use(getPlayerStatsHandler)
