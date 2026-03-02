'use client'

import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import LogoutIcon from '@mui/icons-material/Logout'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE_URL } from '@/hooks/api/config'
import { useLocalizedRouter } from '@/hooks/useLocalizedRouter'
import { useAuthStore } from '@/stores/authStore'

export default function HomePage() {
  const router = useLocalizedRouter()
  const { player, isAuthenticated, setAuth, clearAuth, initAuth } = useAuthStore()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const googleBtnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initAuth()
    setInitialized(true)
  }, [initAuth])

  const handleGoogleCallback = useCallback(
    async (response: { credential: string }) => {
      setIsLoggingIn(true)
      try {
        const res = await fetch(`${API_BASE_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential: response.credential }),
        })

        if (!res.ok) {
          throw new Error('Authentication failed')
        }

        const data = await res.json()
        setAuth(data.player, data.token)
      } catch (err) {
        console.error('Login failed:', err)
      } finally {
        setIsLoggingIn(false)
      }
    },
    [setAuth]
  )

  // Load Google Identity Services script
  useEffect(() => {
    if (!initialized || isAuthenticated) return

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured')
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
        })
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          width: 300,
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [initialized, isAuthenticated, handleGoogleCallback])

  const handleLogout = useCallback(() => {
    clearAuth()
  }, [clearAuth])

  if (!initialized) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 1,
            }}
          >
            Tic-Tac-Toe
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
            Player vs Bot - Can you beat the AI?
          </Typography>
        </Box>

        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'visible',
            bgcolor: 'background.paper',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {isAuthenticated && player ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={player.image || undefined}
                    alt={player.name || player.email}
                    sx={{ width: 56, height: 56 }}
                  >
                    {(player.name || player.email).charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {player.name || 'Player'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {player.email}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={`Score: ${player.score}`}
                  color="primary"
                  sx={{ fontSize: '1.1rem', py: 2.5, px: 2 }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 300,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SportsEsportsIcon />}
                    onClick={() => router.push('/game')}
                    sx={{ py: 1.5, fontSize: '1.1rem' }}
                  >
                    Play Game
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LeaderboardIcon />}
                    onClick={() => router.push('/leaderboard')}
                    sx={{ py: 1.5 }}
                  >
                    Leaderboard
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Typography variant="h5" fontWeight={600} textAlign="center">
                  Sign in to Play
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                  Sign in with your Google account to start playing and track your scores
                </Typography>

                {isLoggingIn ? (
                  <CircularProgress />
                ) : (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
                  >
                    <div ref={googleBtnRef} />
                    <Typography variant="caption" color="text.secondary">
                      OAuth 2.0 powered by Google
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

// Google Identity Services types
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          renderButton: (
            element: HTMLElement,
            options: {
              theme?: string
              size?: string
              text?: string
              width?: number
            }
          ) => void
        }
      }
    }
  }
}
