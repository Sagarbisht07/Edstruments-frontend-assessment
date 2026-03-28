import { createTheme } from '@mui/material';
import type { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#7C3AED', // Violet
    },
    background: {
      default: mode === 'dark' ? '#0B0F1A' : '#F8F9FC', // Deeper blue-slate for body
      paper: mode === 'dark' ? '#1E293B' : '#FFFFFF',  // Slate 800 for components
    },
    text: {
      primary: mode === 'dark' ? '#F8FAFc' : '#111827',
      secondary: mode === 'dark' ? '#94A3B8' : '#6B7280',
    },
    divider: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#10B981',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", "system-ui", sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.95rem',
    },
    body1: {
      fontSize: '0.9rem',
    },
    body2: {
      fontSize: '0.825rem',
      color: mode === 'dark' ? '#94A3B8' : '#6B7280',
    },
    button: {
      fontSize: '0.85rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '6px 12px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.875rem',
          backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'transparent',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F46E5',
          },
        },
        notchedOutline: {
          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 26,
          fontSize: '0.75rem',
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.4)' : '#F3F4F6',
          '& .MuiTableCell-root': {
            color: mode === 'dark' ? '#94A3B8' : '#6B7280',
            fontWeight: 600,
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.02) !important' : '#F9FAFB !important',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#FFFFFF',
          backdropFilter: mode === 'dark' ? 'blur(12px)' : 'none',
          boxShadow: mode === 'dark' 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          color: mode === 'dark' ? '#94A3B8' : '#6B7280',
        },
        select: {
          fontFamily: '"JetBrains Mono", monospace',
        },
      },
    },
  },
});
