import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { useAPIClient } from './useAPIClient'

export const useRecordResult = () => {
  const apiClient = useAPIClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      result: 'WIN' | 'LOSS' | 'DRAW'
      moves: Array<{ position: number; player: 'X' | 'O' }>
    }) => {
      const { data: result, error } = await apiClient.game.result.post(data)

      if (error) {
        throw error
      }

      return result
    },
    onSuccess: (data) => {
      if ('currentScore' in data) {
        useAuthStore.getState().updateScore(data.currentScore)
      }
      queryClient.invalidateQueries({ queryKey: ['game', 'stats'], exact: false })
      queryClient.invalidateQueries({ queryKey: ['game', 'leaderboard'], exact: false })
    },
  })
}

export const useLeaderboard = (page = 1, limit = 20) => {
  const apiClient = useAPIClient()

  return useQuery({
    queryKey: ['game', 'leaderboard', { page, limit }],
    queryFn: async () => {
      const { data: result, error } = await apiClient.game.leaderboard.get({
        query: { page, limit },
      })

      if (error) {
        throw error
      }

      return result
    },
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const usePlayerStats = () => {
  const apiClient = useAPIClient()

  return useQuery({
    queryKey: ['game', 'stats'],
    queryFn: async () => {
      const { data: result, error } = await apiClient.game.stats.get()

      if (error) {
        throw error
      }

      return result
    },
    enabled: useAuthStore.getState().isAuthenticated,
    staleTime: 10 * 1000,
  })
}
