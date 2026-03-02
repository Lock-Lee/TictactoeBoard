'use client'

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { memo } from 'react'

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

interface LeaderboardTableProps {
  data: LeaderboardEntry[]
  isLoading: boolean
  currentPlayerId?: string
}

function getRankDisplay(index: number): React.ReactNode {
  switch (index) {
    case 0:
      return <EmojiEventsIcon sx={{ color: '#FFD700', fontSize: 28 }} />
    case 1:
      return <EmojiEventsIcon sx={{ color: '#C0C0C0', fontSize: 28 }} />
    case 2:
      return <EmojiEventsIcon sx={{ color: '#CD7F32', fontSize: 28 }} />
    default:
      return (
        <Typography variant="body1" fontWeight={600}>
          {index + 1}
        </Typography>
      )
  }
}

const LeaderboardTable = memo(function LeaderboardTable({
  data,
  isLoading,
  currentPlayerId,
}: LeaderboardTableProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
          <Skeleton key={i} variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
        ))}
      </Box>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No games played yet. Be the first!
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 700, width: 70 }}>
              Rank
            </TableCell>
            <TableCell sx={{ color: 'primary.contrastText', fontWeight: 700 }}>Player</TableCell>
            <TableCell
              align="center"
              sx={{ color: 'primary.contrastText', fontWeight: 700, width: 100 }}
            >
              Score
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'primary.contrastText',
                fontWeight: 700,
                width: 80,
                display: { xs: 'none', sm: 'table-cell' },
              }}
            >
              Games
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'primary.contrastText',
                fontWeight: 700,
                width: 100,
                display: { xs: 'none', md: 'table-cell' },
              }}
            >
              W/L/D
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: 'primary.contrastText',
                fontWeight: 700,
                width: 90,
                display: { xs: 'none', sm: 'table-cell' },
              }}
            >
              Streak
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((player, index) => {
            const isCurrentPlayer = player.id === currentPlayerId
            return (
              <TableRow
                key={player.id}
                sx={{
                  bgcolor: isCurrentPlayer ? 'action.selected' : 'inherit',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getRankDisplay(index)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      src={player.image || undefined}
                      alt={player.name || player.email}
                      sx={{ width: 36, height: 36 }}
                    >
                      {(player.name || player.email).charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        component="span"
                        sx={{ display: 'block' }}
                      >
                        {player.name || 'Anonymous'}
                        {isCurrentPlayer && (
                          <Chip label="You" size="small" color="primary" sx={{ ml: 1 }} />
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {player.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    {player.score}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {player.totalGames}
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  <Typography variant="body2">
                    <Box component="span" sx={{ color: 'success.main' }}>
                      {player.totalWins}
                    </Box>
                    {' / '}
                    <Box component="span" sx={{ color: 'error.main' }}>
                      {player.totalLosses}
                    </Box>
                    {' / '}
                    <Box component="span" sx={{ color: 'warning.main' }}>
                      {player.totalDraws}
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {player.winStreak > 0 ? (
                    <Chip
                      label={`🔥 ${player.winStreak}`}
                      size="small"
                      color="warning"
                      variant="outlined"
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default LeaderboardTable
