import React from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => (
  <TextField
    size="small"
    fullWidth
    placeholder="Value..."
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    sx={{ minWidth: 200 }}
    inputProps={{ 'aria-label': 'Filter Value' }}
  />
);

export default TextInput;
