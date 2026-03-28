import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

interface BooleanInputProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

const BooleanInput: React.FC<BooleanInputProps> = ({ value, onChange }) => (
  <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
    <Select
      value={value === null ? '' : String(value)}
      onChange={(e) => onChange(e.target.value === 'true')}
      displayEmpty
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
      }}
    >
      <MenuItem disabled value="">
        <em style={{ fontStyle: 'normal', opacity: 0.5 }}>Select Status</em>
      </MenuItem>
      <MenuItem value="true">True</MenuItem>
      <MenuItem value="false">False</MenuItem>
    </Select>
  </FormControl>
);

export default BooleanInput;
