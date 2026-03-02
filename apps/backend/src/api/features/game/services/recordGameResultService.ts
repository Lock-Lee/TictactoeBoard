import { Effect } from 'effect'
import type { GAME_RESULT } from '../../../../libs/prisma/generated'
import {
  type RecordGameResultError,
  recordGameResultRepository,
} from '../repositories/recordGameResultRepository'

interface RecordGameResultServiceProps {
  playerId: string
  result: GAME_RESULT
  moves: Array<{ position: number; player: 'X' | 'O' }>
}

export const recordGameResultService = (props: RecordGameResultServiceProps) => {
  return Effect.gen(function* () {
    const result = yield* recordGameResultRepository(props)

    return {
      id: result.game.id,
      result: result.game.result,
      scoreChange: result.scoreChange,
      bonusAwarded: result.bonusAwarded,
      currentScore: result.player.score,
      currentWinStreak: result.player.winStreak,
    }
  })
}

export type RecordGameResultServiceError = RecordGameResultError
