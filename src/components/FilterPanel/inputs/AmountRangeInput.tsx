import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';

interface AmountRangeInputProps {
  value: { min?: number; max?: number } | null;
  onChange: (value: { min?: number; max?: number }) => void;
}

const AmountRangeInput: React.FC<AmountRangeInputProps> = ({ value, onChange }) => {
  const min = value?.min === undefined ? '' : value.min;
  const max = value?.max === undefined ? '' : value.max;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange({ ...value, min: v === '' ? undefined : Number(v) });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange({ ...value, max: v === '' ? undefined : Number(v) });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        size="small"
        type="number"
        placeholder="Min"
        value={min}
        onChange={handleMinChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        sx={{ width: 140 }}
      />
      <span>to</span>
      <TextField
        size="small"
        type="number"
        placeholder="Max"
        value={max}
        onChange={handleMaxChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        sx={{ width: 140 }}
      />
    </Box>
  );
};

export default AmountRangeInput;
