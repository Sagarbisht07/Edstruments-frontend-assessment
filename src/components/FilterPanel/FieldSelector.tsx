import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import type { FieldDefinition } from '../../types';

interface FieldSelectorProps {
  fields: FieldDefinition[];
  value: string;
  onChange: (key: string) => void;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({ fields, value, onChange }) => (
  <FormControl size="small" sx={{ minWidth: 150 }}>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      inputProps={{ 'aria-label': 'Filter Field' }}
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      }}
    >
      <MenuItem disabled value="">
        <em style={{ fontStyle: 'normal', opacity: 0.5 }}>Select Field</em>
      </MenuItem>
      {fields.map((field) => (
        <MenuItem key={field.key} value={field.key}>{field.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default FieldSelector;
