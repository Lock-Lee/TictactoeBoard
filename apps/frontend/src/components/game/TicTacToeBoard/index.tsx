'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

type CellValue = 'X' | 'O' | null
type BoardState = CellValue[]
type GameStatus = 'playing' | 'win' | 'loss' | 'draw'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameResult {
  status: 'win' | 'loss' | 'draw'
  moves: Array<{ position: number; player: 'X' | 'O' }>
}

interface TicTacToeBoardProps {
  onGameEnd: (result: GameResult) => void
  isSubmitting: boolean
  difficulty: Difficulty
}

const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(board: BoardState): CellValue {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function getWinningLine(board: BoardState): number[] | null {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo
    }
  }
  return null
}

function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null)
}

// Minimax algorithm for bot AI
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  maxDepth: number
): number {
  const winner = checkWinner(board)
  if (winner === 'O') return 10 - depth // Bot wins
  if (winner === 'X') return depth - 10 // Player wins
  if (isBoardFull(board)) return 0 // Draw

  if (depth >= maxDepth) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        const score = minimax(board, depth + 1, false, maxDepth)
        board[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  }

  let bestScore = Infinity
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'X'
      const score = minimax(board, depth + 1, true, maxDepth)
      board[i] = null
      bestScore = Math.min(score, bestScore)
    }
  }
  return bestScore
}

function getRandomMove(board: BoardState): number {
  const emptyCells = board.reduce<number[]>((acc, cell, i) => {
    if (cell === null) acc.push(i)
    return acc
  }, [])
  if (emptyCells.length === 0) return -1
  return emptyCells[Math.floor(Math.random() * emptyCells.length)] ?? -1
}

function getSmartMove(board: BoardState, maxDepth: number): number {
  let bestScore = -Infinity
  let bestMove = -1

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O'
      const score = minimax(board, 0, false, maxDepth)
      board[i] = null
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  return bestMove
}

function getBotMove(board: BoardState, difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      // 40% smart (depth 2), 60% random
      return Math.random() < 0.4 ? getSmartMove(board, 2) : getRandomMove(board)
    case 'medium':
      // 70% smart (depth 4), 30% random
      return Math.random() < 0.7 ? getSmartMove(board, 4) : getRandomMove(board)
    case 'hard':
      // Always optimal (depth 6)
      return getSmartMove(board, 6)
  }
}

const TicTacToeBoard = memo(function TicTacToeBoard({
  onGameEnd,
  isSubmitting,
  difficulty,
}: TicTacToeBoardProps) {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [moves, setMoves] = useState<Array<{ position: number; player: 'X' | 'O' }>>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setMoves([])
    setGameStatus('playing')
    setIsPlayerTurn(true)
    setWinningLine(null)
  }, [])

  // Bot makes a move
  useEffect(() => {
    if (!isPlayerTurn && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        const botPosition = getBotMove([...board], difficulty)
        if (botPosition === -1) return

        const newBoard = [...board]
        newBoard[botPosition] = 'O'
        const newMoves = [...moves, { position: botPosition, player: 'O' as const }]

        setBoard(newBoard)
        setMoves(newMoves)

        const winner = checkWinner(newBoard)
        if (winner === 'O') {
          setGameStatus('loss')
          setWinningLine(getWinningLine(newBoard))
          onGameEnd({ status: 'loss', moves: newMoves })
        } else if (isBoardFull(newBoard)) {
          setGameStatus('draw')
          onGameEnd({ status: 'draw', moves: newMoves })
        } else {
          setIsPlayerTurn(true)
        }
      }, 400) // Small delay for natural feeling

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isPlayerTurn, gameStatus, board, moves, onGameEnd, difficulty])

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null || !isPlayerTurn || gameStatus !== 'playing') return

      const newBoard = [...board]
      newBoard[index] = 'X'
      const newMoves = [...moves, { position: index, player: 'X' as const }]

      setBoard(newBoard)
      setMoves(newMoves)

      const winner = checkWinner(newBoard)
      if (winner === 'X') {
        setGameStatus('win')
        setWinningLine(getWinningLine(newBoard))
        onGameEnd({ status: 'win', moves: newMoves })
      } else if (isBoardFull(newBoard)) {
        setGameStatus('draw')
        onGameEnd({ status: 'draw', moves: newMoves })
      } else {
        setIsPlayerTurn(false)
      }
    },
    [board, isPlayerTurn, gameStatus, moves, onGameEnd]
  )

  const statusMessage = useMemo(() => {
    switch (gameStatus) {
      case 'win':
        return '🎉 You Win!'
      case 'loss':
        return '😔 Bot Wins!'
      case 'draw':
        return '🤝 Draw!'
      default:
        return isPlayerTurn ? '🎮 Your Turn (X)' : '🤖 Bot Thinking...'
    }
  }, [gameStatus, isPlayerTurn])

  const statusColor = useMemo(() => {
    switch (gameStatus) {
      case 'win':
        return 'success'
      case 'loss':
        return 'error'
      case 'draw':
        return 'warning'
      default:
        return 'info'
    }
  }, [gameStatus])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Chip
        label={statusMessage}
        color={statusColor as 'success' | 'error' | 'warning' | 'info'}
        sx={{ fontSize: '1.1rem', py: 2.5, px: 2 }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          bgcolor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          width: 'fit-content',
        }}
      >
        {board.map((cell, index) => {
          const isWinCell = winningLine?.includes(index)
          return (
            <Paper
              key={index}
              elevation={0}
              onClick={() => handleCellClick(index)}
              sx={{
                width: { xs: 90, sm: 110 },
                height: { xs: 90, sm: 110 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: gameStatus === 'playing' && isPlayerTurn && !cell ? 'pointer' : 'default',
                bgcolor: isWinCell ? 'action.selected' : 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor:
                    gameStatus === 'playing' && isPlayerTurn && !cell
                      ? 'action.hover'
                      : isWinCell
                        ? 'action.selected'
                        : 'background.paper',
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: cell === 'X' ? 'primary.main' : 'error.main',
                  fontSize: { xs: '2.5rem', sm: '3rem' },
                  userSelect: 'none',
                  opacity: cell ? 1 : 0,
                  transform: cell ? 'scale(1)' : 'scale(0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cell}
              </Typography>
            </Paper>
          )
        })}
      </Box>

      {gameStatus !== 'playing' && (
        <Button
          variant="contained"
          size="large"
          onClick={resetGame}
          disabled={isSubmitting}
          sx={{ minWidth: 200 }}
        >
          {isSubmitting ? 'Saving...' : 'Play Again'}
        </Button>
      )}
    </Box>
  )
})

export default TicTacToeBoard
