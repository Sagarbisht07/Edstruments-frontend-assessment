import React from 'react';
import { TextField } from '@mui/material';

interface NumberInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange }) => (
  <TextField
    type="number"
    size="small"
    fullWidth
    placeholder="0"
    value={value === null ? '' : value}
    onChange={(e) => {
      const v = e.target.value;
      onChange(v === '' ? null : Number(v));
    }}
    sx={{ minWidth: 200 }}
    inputProps={{ 'aria-label': 'Filter Number Value' }}
  />
);

export default NumberInput;
