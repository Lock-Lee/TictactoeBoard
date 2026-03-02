import { Data, Effect } from 'effect'
import { prisma } from '../../../../config/database'
import { createErrorFactory, type ErrorMsg } from '../../../../libs/effect'

export class GetLeaderboardError extends Data.TaggedError(
  'Repository/GetLeaderboard/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

interface GetLeaderboardProps {
  page: number
  limit: number
}

export const getLeaderboardRepository = (props: GetLeaderboardProps) => {
  return Effect.gen(function* () {
    const skip = (props.page - 1) * props.limit

    const [data, total] = yield* Effect.tryPromise({
      try: () =>
        prisma.$transaction([
          prisma.gamePlayer.findMany({
            where: {
              totalGames: { gt: 0 },
            },
            orderBy: [{ score: 'desc' }, { totalWins: 'desc' }, { totalGames: 'asc' }],
            skip,
            take: props.limit,
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              score: true,
              totalGames: true,
              totalWins: true,
              totalLosses: true,
              totalDraws: true,
              winStreak: true,
            },
          }),
          prisma.gamePlayer.count({
            where: {
              totalGames: { gt: 0 },
            },
          }),
        ]),
      catch: (e) => GetLeaderboardError.new('Failed to get leaderboard')(e),
    })

    return { data, total }
  })
}
