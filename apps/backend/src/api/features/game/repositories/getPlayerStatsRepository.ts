import { Data, Effect } from 'effect'
import { prisma } from '../../../../config/database'
import { createErrorFactory, type ErrorMsg } from '../../../../libs/effect'

export class GetPlayerStatsError extends Data.TaggedError(
  'Repository/GetPlayerStats/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

interface GetPlayerStatsProps {
  playerId: string
}

export const getPlayerStatsRepository = (props: GetPlayerStatsProps) => {
  return Effect.gen(function* () {
    const player = yield* Effect.tryPromise({
      try: () =>
        prisma.gamePlayer.findUnique({
          where: { id: props.playerId },
          include: {
            games: {
              orderBy: { createdAt: 'desc' },
              take: 10,
              select: {
                id: true,
                result: true,
                createdAt: true,
              },
            },
          },
        }),
      catch: (e) => GetPlayerStatsError.new('Failed to get player stats')(e),
    })

    if (!player) {
      return yield* Effect.fail(GetPlayerStatsError.new('Player not found')())
    }

    return player
  })
}
