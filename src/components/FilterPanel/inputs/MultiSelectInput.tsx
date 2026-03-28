import React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

interface MultiSelectInputProps {
  options: string[];
  value: string[] | null;
  onChange: (value: string[]) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ options, value, onChange }) => {
  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
      <Select
        multiple
        displayEmpty
        value={selectedValues}
        onChange={(e) => onChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value as string[])}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em style={{ fontStyle: 'normal', opacity: 0.5 }}>Select Options</em>;
          }
          return selected.join(', ');
        }}
        sx={{ 
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        }}
      >
        <MenuItem disabled value="">
          <em>Select Options</em>
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            <Checkbox checked={selectedValues.indexOf(opt) > -1} />
            <ListItemText primary={opt} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectInput;
