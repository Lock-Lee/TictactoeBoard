'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useLocalizedRouter } from '@/hooks/useLocalizedRouter'
import { useTranslation } from '@/lib/i18n/client'

export default function NotFound() {
  const router = useLocalizedRouter()
  const { t } = useTranslation('common')

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 800,
              lineHeight: 1,
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              mb: 1,
              fontWeight: 600,
            }}
          >
            {t('errors.notFound')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              opacity: 0.9,
            }}
          >
            {t('errors.notFoundDescription')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.back()}
              sx={{
                bgcolor: 'white',
                color: '#764ba2',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              {t('actions.back')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {t('actions.home')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
