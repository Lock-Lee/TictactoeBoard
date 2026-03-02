'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import TicTacToeBoard, { type Difficulty, type GameResult } from '@/components/game/TicTacToeBoard'
import { API_BASE_URL } from '@/hooks/api/config'
import { useLocalizedRouter } from '@/hooks/useLocalizedRouter'
import { useAuthStore } from '@/stores/authStore'

interface GameResponse {
  id: string
  result: string
  scoreChange: number
  bonusAwarded: boolean
  currentScore: number
  currentWinStreak: number
}

export default function GamePage() {
  const router = useLocalizedRouter()
  const { player, isAuthenticated, accessToken, initAuth, updateScore } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning' | 'info'
  }>({ open: false, message: '', severity: 'info' })
  const [winStreak, setWinStreak] = useState(0)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleGameEnd = useCallback(
    async (result: GameResult) => {
      if (!accessToken) return

      setIsSubmitting(true)
      try {
        const resultMap: Record<string, string> = {
          win: 'WIN',
          loss: 'LOSS',
          draw: 'DRAW',
        }

        const res = await fetch(`${API_BASE_URL}/game/result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            result: resultMap[result.status],
            moves: result.moves,
          }),
        })

        if (!res.ok) {
          throw new Error('Failed to record game result')
        }

        const data: GameResponse = await res.json()
        updateScore(data.currentScore)
        setWinStreak(data.currentWinStreak)

        let message = ''
        if (result.status === 'win') {
          message = `You won! +${data.scoreChange} point${data.scoreChange > 1 ? 's' : ''}`
          if (data.bonusAwarded) {
            message += ' (includes bonus for 3 consecutive wins!)'
          }
        } else if (result.status === 'loss') {
          message = `You lost! ${data.scoreChange} point`
        } else {
          message = "It's a draw! No score change"
        }

        setNotification({
          open: true,
          message,
          severity:
            result.status === 'win' ? 'success' : result.status === 'loss' ? 'error' : 'warning',
        })
      } catch (err) {
        console.error('Failed to record result:', err)
        setNotification({
          open: true,
          message: 'Failed to save game result',
          severity: 'error',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [accessToken, updateScore]
  )

  if (!isAuthenticated || !player) {
    return null
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/')}
            sx={{ color: 'white' }}
          >
            Home
          </Button>
          <Button
            startIcon={<LeaderboardIcon />}
            onClick={() => router.push('/leaderboard')}
            sx={{ color: 'white' }}
          >
            Leaderboard
          </Button>
        </Box>

        <Card elevation={8} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Tic-Tac-Toe
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={`Score: ${player.score}`}
                  color="primary"
                  sx={{ fontSize: '1rem', py: 2 }}
                />
                {winStreak > 0 && (
                  <Chip
                    label={`Win Streak: ${winStreak}`}
                    color="warning"
                    sx={{ fontSize: '1rem', py: 2 }}
                  />
                )}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Win 3 in a row for a bonus point!
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <Chip
                  key={level}
                  label={
                    level === 'easy' ? '😊 Easy' : level === 'medium' ? '🤔 Medium' : '🤖 Hard'
                  }
                  variant={difficulty === level ? 'filled' : 'outlined'}
                  color={level === 'easy' ? 'success' : level === 'medium' ? 'warning' : 'error'}
                  onClick={() => setDifficulty(level)}
                  sx={{ cursor: 'pointer', fontWeight: difficulty === level ? 700 : 400 }}
                />
              ))}
            </Box>

            <TicTacToeBoard
              onGameEnd={handleGameEnd}
              isSubmitting={isSubmitting}
              difficulty={difficulty}
            />
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
