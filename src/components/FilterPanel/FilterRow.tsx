import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Trash2 } from 'lucide-react';
import type { FieldDefinition, FilterCondition, Operator } from '../../types';
import { OPERATOR_MAP } from '../../utils/operatorMap';
import FieldSelector from './FieldSelector';
import OperatorSelector from './OperatorSelector';
import TextInput from './inputs/TextInput';
import NumberInput from './inputs/NumberInput';
import DateRangeInput from './inputs/DateRangeInput';
import AmountRangeInput from './inputs/AmountRangeInput';
import SingleSelectInput from './inputs/SingleSelectInput';
import MultiSelectInput from './inputs/MultiSelectInput';
import BooleanInput from './inputs/BooleanInput';

interface FilterRowProps {
  condition: FilterCondition;
  fields: FieldDefinition[];
  onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
}

const FilterRow: React.FC<FilterRowProps> = ({ 
  condition, 
  fields, 
  onUpdate, 
  onRemove 
}) => {
  const currentField = fields.find(f => f.key === condition.field) || fields[0];
  const operators = OPERATOR_MAP[currentField.type];

  const renderInput = () => {
    const val = condition.value;
    const handleChange = (v: any) => onUpdate(condition.id, { value: v });

    switch (currentField.type) {
      case 'text':
        return <TextInput value={val as string} onChange={handleChange} />;
      case 'number':
        return <NumberInput value={val as number} onChange={handleChange} />;
      case 'date':
        return <DateRangeInput value={val as { start?: string; end?: string }} onChange={handleChange} />;
      case 'amount':
        return <AmountRangeInput value={val as { min?: number; max?: number }} onChange={handleChange} />;
      case 'single-select':
        return <SingleSelectInput options={currentField.options || []} value={val as string} onChange={handleChange} />;
      case 'multi-select':
        return <MultiSelectInput options={currentField.options || []} value={val as string[]} onChange={handleChange} />;
      case 'boolean':
        return <BooleanInput value={val as boolean} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      alignItems: 'center', 
      p: 1,
      borderRadius: 1,
      backgroundColor: (theme) => theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.02)' 
        : '#FFFFFF',
      border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
      flexWrap: 'nowrap',
      height: 48,
      transition: 'all 0.2s ease',
      animation: 'fadeIn 0.3s ease-out',
      '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(-10px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      },
      '&:hover': {
        borderColor: 'primary.light',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      }
    }}>
      <FieldSelector 
        fields={fields} 
        value={condition.field} 
        onChange={(field) => onUpdate(condition.id, { field })} 
      />
      <OperatorSelector 
        operators={operators} 
        value={condition.operator} 
        onChange={(operator: Operator) => onUpdate(condition.id, { operator })} 
      />
      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        {renderInput()}
      </Box>
      <Tooltip title="Remove Filter">
        <IconButton 
          onClick={() => onRemove(condition.id)}
          size="small"
          sx={{ 
            color: 'text.secondary',
            opacity: 0.5,
            '&:hover': { 
              color: 'error.main', 
              opacity: 1,
              backgroundColor: 'error.lighter' 
            }
          }}
        >
          <Trash2 size={16} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FilterRow;
