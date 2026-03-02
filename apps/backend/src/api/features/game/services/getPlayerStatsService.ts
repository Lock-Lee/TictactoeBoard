import { Effect } from 'effect'
import {
  type GetPlayerStatsError,
  getPlayerStatsRepository,
} from '../repositories/getPlayerStatsRepository'

interface GetPlayerStatsServiceProps {
  playerId: string
}

export const getPlayerStatsService = (props: GetPlayerStatsServiceProps) => {
  return Effect.gen(function* () {
    const player = yield* getPlayerStatsRepository(props)

    const winRate =
      player.totalGames > 0 ? Math.round((player.totalWins / player.totalGames) * 100) : 0

    return {
      id: player.id,
      name: player.name,
      email: player.email,
      image: player.image,
      score: player.score,
      winStreak: player.winStreak,
      totalGames: player.totalGames,
      totalWins: player.totalWins,
      totalLosses: player.totalLosses,
      totalDraws: player.totalDraws,
      winRate,
      recentGames: player.games.map((game) => ({
        id: game.id,
        result: game.result,
        createdAt: game.createdAt.toISOString(),
      })),
    }
  })
}

export type GetPlayerStatsServiceError = GetPlayerStatsError
