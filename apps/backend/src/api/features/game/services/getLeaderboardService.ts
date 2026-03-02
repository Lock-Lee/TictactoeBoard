import { Effect } from 'effect'
import {
  type GetLeaderboardError,
  getLeaderboardRepository,
} from '../repositories/getLeaderboardRepository'

interface GetLeaderboardServiceProps {
  page: number
  limit: number
}

export const getLeaderboardService = (props: GetLeaderboardServiceProps) => {
  return Effect.gen(function* () {
    const { data, total } = yield* getLeaderboardRepository(props)

    const totalPages = Math.ceil(total / props.limit)

    return {
      data: data.map((player) => ({
        id: player.id,
        name: player.name,
        email: player.email,
        image: player.image,
        score: player.score,
        totalGames: player.totalGames,
        totalWins: player.totalWins,
        totalLosses: player.totalLosses,
        totalDraws: player.totalDraws,
        winStreak: player.winStreak,
      })),
      pagination: {
        page: props.page,
        limit: props.limit,
        total,
        totalPages,
        hasNext: props.page < totalPages,
        hasPrev: props.page > 1,
      },
    }
  })
}

export type GetLeaderboardServiceError = GetLeaderboardError
