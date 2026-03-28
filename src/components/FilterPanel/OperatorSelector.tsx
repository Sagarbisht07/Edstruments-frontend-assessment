import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import type { Operator } from '../../types';

interface OperatorSelectorProps {
  operators: { value: Operator; label: string }[];
  value: Operator;
  onChange: (op: Operator) => void;
}

const OperatorSelector: React.FC<OperatorSelectorProps> = ({ operators, value, onChange }) => (
  <FormControl size="small" sx={{ minWidth: 150 }}>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as Operator)}
      displayEmpty
      inputProps={{ 'aria-label': 'Filter Operator' }}
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
        height: 52,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        color: 'text.secondary',
        fontSize: '0.85rem'
      }}
    >
      <MenuItem disabled value="">
        <em style={{ fontStyle: 'normal', opacity: 0.5 }}>Select Operator</em>
      </MenuItem>
      {operators.map((op) => (
        <MenuItem key={op.value} value={op.value}>{op.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default OperatorSelector;
