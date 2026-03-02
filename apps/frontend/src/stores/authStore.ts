import { create } from 'zustand'

interface GamePlayer {
  id: string
  email: string
  name: string | null
  image: string | null
  score: number
}

interface AuthState {
  player: GamePlayer | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (player: GamePlayer, token: string) => void
  clearAuth: () => void
  initAuth: () => void
  updateScore: (score: number) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  player: null,
  accessToken: null,
  isAuthenticated: false,

  setAuth: (player, token) => {
    localStorage.setItem('accessToken', token)
    localStorage.setItem('player', JSON.stringify(player))
    set({ player, accessToken: token, isAuthenticated: true })
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('player')
    set({ player: null, accessToken: null, isAuthenticated: false })
  },

  initAuth: () => {
    try {
      const token = localStorage.getItem('accessToken')
      const playerStr = localStorage.getItem('player')

      if (token && playerStr) {
        const player = JSON.parse(playerStr) as GamePlayer
        set({ player, accessToken: token, isAuthenticated: true })
      }
    } catch {
      get().clearAuth()
    }
  },

  updateScore: (score) => {
    const currentPlayer = get().player
    if (currentPlayer) {
      const updatedPlayer = { ...currentPlayer, score }
      localStorage.setItem('player', JSON.stringify(updatedPlayer))
      set({ player: updatedPlayer })
    }
  },
}))
