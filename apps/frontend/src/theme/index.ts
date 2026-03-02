import { alpha, createTheme } from '@mui/material/styles'

// Modern color palette
const primaryMain = '#6366f1' // Indigo
const secondaryMain = '#ec4899' // Pink
const successMain = '#10b981' // Emerald
const warningMain = '#f59e0b' // Amber
const errorMain = '#ef4444' // Red
const infoMain = '#3b82f6' // Blue

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryMain,
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryMain,
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    success: {
      main: successMain,
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: warningMain,
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: errorMain,
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: infoMain,
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    divider: alpha('#94a3b8', 0.2),
  },
  typography: {
    fontFamily: [
      'Sarabun',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgb(0 0 0 / 0.15)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${primaryMain} 0%, #4f46e5 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid',
          borderColor: alpha('#94a3b8', 0.1),
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          transition: 'box-shadow 0.2s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '1px 0 3px 0 rgb(0 0 0 / 0.05)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.1),
            '&:hover': {
              backgroundColor: alpha(primaryMain, 0.15),
            },
            '& .MuiListItemIcon-root': {
              color: primaryMain,
            },
            '& .MuiListItemText-primary': {
              color: primaryMain,
              fontWeight: 600,
            },
          },
          '&:hover': {
            backgroundColor: alpha('#64748b', 0.08),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryMain,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${primaryMain} 0%, ${secondaryMain} 100%)`,
        },
      },
    },
  },
})

// Export gradient utilities for use in components
export const gradients = {
  primary: `linear-gradient(135deg, ${primaryMain} 0%, #4f46e5 100%)`,
  secondary: `linear-gradient(135deg, ${secondaryMain} 0%, #db2777 100%)`,
  success: `linear-gradient(135deg, ${successMain} 0%, #059669 100%)`,
  warning: `linear-gradient(135deg, ${warningMain} 0%, #d97706 100%)`,
  info: `linear-gradient(135deg, ${infoMain} 0%, #2563eb 100%)`,
  purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  cyan: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  rose: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
}
