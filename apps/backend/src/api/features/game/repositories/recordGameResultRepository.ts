import { Data, Effect } from 'effect'
import { prisma } from '../../../../config/database'
import { createErrorFactory, type ErrorMsg } from '../../../../libs/effect'
import type { GAME_RESULT } from '../../../../libs/prisma/generated'

export class RecordGameResultError extends Data.TaggedError(
  'Repository/RecordGameResult/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

interface RecordGameResultProps {
  playerId: string
  result: GAME_RESULT
  moves: Array<{ position: number; player: 'X' | 'O' }>
}

export const recordGameResultRepository = (props: RecordGameResultProps) => {
  return Effect.gen(function* () {
    // Calculate score change
    let scoreChange = 0
    let bonusAwarded = false

    // Use a transaction to ensure atomicity
    const result = yield* Effect.tryPromise({
      try: () =>
        prisma.$transaction(async (tx) => {
          // Get current player stats
          const player = await tx.gamePlayer.findUniqueOrThrow({
            where: { id: props.playerId },
          })

          let newWinStreak = player.winStreak

          if (props.result === 'WIN') {
            scoreChange = 1
            newWinStreak += 1

            // Check for 3 consecutive wins bonus
            if (newWinStreak >= 3) {
              scoreChange += 1 // Bonus point
              bonusAwarded = true
              newWinStreak = 0 // Reset streak after bonus
            }
          } else if (props.result === 'LOSS') {
            scoreChange = -1
            newWinStreak = 0 // Reset streak on loss
          } else {
            // DRAW - no score change, but streak resets
            newWinStreak = 0
          }

          // Create game record
          const game = await tx.game.create({
            data: {
              playerId: props.playerId,
              result: props.result,
              moves: props.moves,
            },
          })

          // Update player stats
          const updatedPlayer = await tx.gamePlayer.update({
            where: { id: props.playerId },
            data: {
              score: { increment: scoreChange },
              winStreak: newWinStreak,
              totalGames: { increment: 1 },
              totalWins: { increment: props.result === 'WIN' ? 1 : 0 },
              totalLosses: { increment: props.result === 'LOSS' ? 1 : 0 },
              totalDraws: { increment: props.result === 'DRAW' ? 1 : 0 },
            },
          })

          return {
            game,
            player: updatedPlayer,
            scoreChange,
            bonusAwarded,
          }
        }),
      catch: (e) => RecordGameResultError.new('Failed to record game result')(e),
    })

    return result
  })
}
