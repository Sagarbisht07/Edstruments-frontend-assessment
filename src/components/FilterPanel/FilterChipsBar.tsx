import React from 'react';
import { Box, Chip, Typography, Button, Stack, Fade } from '@mui/material';
import { X } from 'lucide-react';
import type { FilterCondition, FieldDefinition } from '../../types';

interface FilterChipsBarProps {
  mode: string;
  conditions: FilterCondition[];
  fieldConfig: FieldDefinition[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const FilterChipsBar: React.FC<FilterChipsBarProps> = ({
  mode,
  conditions,
  fieldConfig,
  onRemove,
  onClearAll
}) => {
  if (conditions.length === 0) return null;

  const getLabel = (condition: FilterCondition) => {
    const field = fieldConfig.find(f => f.key === condition.field);
    const label = field ? field.label : condition.field;
    
    let valueDisplay: string = '';
    
    if (condition.value === true) valueDisplay = 'Yes';
    else if (condition.value === false) valueDisplay = 'No';
    else if (Array.isArray(condition.value)) valueDisplay = condition.value.join(', ');
    else if (typeof condition.value === 'object' && condition.value !== null) {
      const { min, max } = condition.value as { min?: number, max?: number };
      if (min !== undefined && max !== undefined) valueDisplay = `${min} – ${max}`;
      else if (min !== undefined) valueDisplay = `> ${min}`;
      else if (max !== undefined) valueDisplay = `< ${max}`;
    } else {
      valueDisplay = String(condition.value || '');
    }
    
    return (
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography component="span" variant="caption" sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography component="span" variant="caption" sx={{ opacity: 0.7 }}>{condition.operator.replace(/_/g, ' ')}</Typography>
        <Typography component="span" variant="caption" sx={{ fontWeight: 600 }}>{valueDisplay}</Typography>
      </Box>
    );
  };

  const getChipColor = (mode: string, type?: string) => {
    const isDark = mode === 'dark';
    switch (type) {
      case 'text': return isDark ? '#A5B4FC' : '#4F46E5';
      case 'number':
      case 'amount': return isDark ? '#FCD34D' : '#F59E0B';
      case 'date': return isDark ? '#6EE7B7' : '#10B981';
      case 'boolean': return isDark ? '#C4B5FD' : '#7C3AED';
      default: return isDark ? '#94A3B8' : '#6B7280';
    }
  };

  return (
    <Fade in={conditions.length > 0}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 2, 
        px: 1, 
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap' }}>
          Active filters:
        </Typography>
        
        <Stack direction="row" spacing={1}>
          {conditions.map((condition) => {
            const field = fieldConfig.find(f => f.key === condition.field);
            const color = getChipColor(mode, field?.type);
            
            return (
              <Chip
                key={condition.id}
                label={getLabel(condition)}
                onDelete={() => onRemove(condition.id)}
                deleteIcon={<X size={14} />}
                variant="outlined"
                sx={{
                  borderColor: (theme) => theme.palette.mode === 'dark' ? `${color}40` : `${color}80`,
                  color: color,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? `${color}15` : `${color}08`,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? `${color}25` : `${color}15`,
                    borderColor: color,
                  },
                  '& .MuiChip-deleteIcon': {
                    color: color,
                    opacity: 0.7,
                    '&:hover': { color: '#EF4444', opacity: 1 }
                  }
                }}
              />
            );
          })}
        </Stack>
        
        <Button 
          size="small" 
          onClick={onClearAll}
          sx={{ 
            color: (theme) => theme.palette.mode === 'dark' ? 'error.light' : 'error.main', 
            fontSize: '0.75rem', 
            minWidth: 'auto',
            p: 0,
            textTransform: 'none',
            ml: 1,
            '&:hover': { background: 'transparent', textDecoration: 'underline' }
          }}
        >
          Clear all
        </Button>
      </Box>
    </Fade>
  );
};

export default FilterChipsBar;
