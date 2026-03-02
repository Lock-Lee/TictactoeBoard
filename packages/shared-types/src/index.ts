// Shared types for Tic-Tac-Toe game

// Game Player
export interface GamePlayer {
  id: string
  email: string
  name: string
  image: string | null
  score: number
  winStreak: number
  totalGames: number
  totalWins: number
  totalLosses: number
  totalDraws: number
  createdAt: string
  updatedAt: string
}

// Game Result
export type GameResult = 'WIN' | 'LOSS' | 'DRAW'

// Game Record
export interface Game {
  id: string
  playerId: string
  result: GameResult
  moves: unknown
  createdAt: string
}

// API Response Types
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ListResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface MessageResponse {
  message: string
}

export interface ErrorResponse {
  message: string
}

// Auth Types
export interface GoogleAuthRequest {
  credential: string
}

export interface AuthResponse {
  token: string
  player: GamePlayer
}

export interface TokenPayload {
  userId: string
  username: string
  roleId: string
  tenantId: string
  sessionId: string
}
