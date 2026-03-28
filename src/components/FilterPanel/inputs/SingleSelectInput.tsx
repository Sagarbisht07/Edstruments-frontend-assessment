import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

interface SingleSelectInputProps {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

const SingleSelectInput: React.FC<SingleSelectInputProps> = ({ options, value, onChange }) => (
  <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
    <Select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
      }}
    >
      <MenuItem disabled value="">
        <em style={{ fontStyle: 'normal', opacity: 0.5 }}>Select Option</em>
      </MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SingleSelectInput;
