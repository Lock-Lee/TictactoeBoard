'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import LeaderboardTable from '@/components/game/LeaderboardTable'
import { API_BASE_URL } from '@/hooks/api/config'
import { useLocalizedRouter } from '@/hooks/useLocalizedRouter'
import { useAuthStore } from '@/stores/authStore'

interface LeaderboardEntry {
  id: string
  name: string | null
  email: string
  image: string | null
  score: number
  totalGames: number
  totalWins: number
  totalLosses: number
  totalDraws: number
  winStreak: number
}

interface LeaderboardResponse {
  data: LeaderboardEntry[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export default function LeaderboardPage() {
  const router = useLocalizedRouter()
  const { player, initAuth } = useAuthStore()
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  const fetchLeaderboard = useCallback(async (pageNum: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/game/leaderboard?page=${pageNum}&limit=20`)
      if (!res.ok) throw new Error('Failed to fetch leaderboard')

      const result: LeaderboardResponse = await res.json()
      setData(result.data)
      setTotalPages(result.pagination.totalPages)
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaderboard(page)
  }, [page, fetchLeaderboard])

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/')}
            sx={{ color: 'white' }}
          >
            Home
          </Button>
          <Button
            startIcon={<SportsEsportsIcon />}
            onClick={() => router.push('/game')}
            sx={{ color: 'white' }}
          >
            Play Game
          </Button>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              mb: 1,
            }}
          >
            Leaderboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            Top players ranked by score
          </Typography>
        </Box>

        <LeaderboardTable data={data} isLoading={isLoading} currentPlayerId={player?.id} />

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '& .Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.2) !important',
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}
