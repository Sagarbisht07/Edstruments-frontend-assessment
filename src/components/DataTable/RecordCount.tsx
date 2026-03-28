import React from 'react';
import { Box, Typography } from '@mui/material';

interface RecordCountProps {
  total: number;
  filtered: number;
}

const RecordCount: React.FC<RecordCountProps> = ({ total, filtered }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      px: 2,
      py: 1,
      borderRadius: 2,
      background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
      border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
    }}>
      <Typography variant="body2" color="text.secondary">
        Found <strong>{filtered}</strong> matching records (from {total} total)
      </Typography>
    </Box>
  );
};

export default RecordCount;
