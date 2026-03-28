import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, CircularProgress, Snackbar, Alert } from '@mui/material';
import { PlusCircle, XCircle, CheckCircle2 } from 'lucide-react';
import type { FieldDefinition, FilterCondition } from '../../types';
import FilterRow from './FilterRow';

interface FilterPanelProps {
  conditions: FilterCondition[];
  config: FieldDefinition[];
  onAdd: () => void;
  onUpdate: (id: string, updates: Partial<FilterCondition>) => void;
  onRemove: (id: string) => void;
  onApply: () => void;
  onClear: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  conditions,
  config,
  onAdd,
  onUpdate,
  onRemove,
  onApply,
  onClear
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConditionValid = (condition: FilterCondition) => {
    const val = condition.value;
    if (val === null || val === undefined || val === '') return false;
    if (Array.isArray(val) && val.length === 0) return false;
    if (typeof val === 'object') {
      // Check if at least one value is set in object (for range/min-max)
      return Object.values(val).some(v => v !== undefined && v !== null && v !== '');
    }
    return true;
  };

  const handleApply = async () => {
    const validCount = conditions.filter(c => isConditionValid(c)).length;
    if (validCount === 0) {
      setError('Please enter at least one value to filter.');
      return;
    }

    setIsApplying(true);
    
    // Simulate a brief delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 600));
    
    onApply();
    
    setIsApplying(false);
    setIsSuccess(true);
    
    // Reset success icon after 4 seconds
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.primary' }}>
            Filters
          </Typography>
          <Box sx={{ 
            px: 1, 
            py: 0.25, 
            borderRadius: 1, 
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.2)' : '#F3F4F6',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.3)' : 'rgba(0, 0, 0, 0.05)',
          }}>
            <Typography sx={{ 
              fontSize: '0.72rem', 
              fontWeight: 700, 
              fontFamily: 'JetBrains Mono', 
              color: (theme) => theme.palette.mode === 'dark' ? '#C7D2FE' : 'primary.main' 
            }}>
              {conditions.length}
            </Typography>
          </Box>
        </Stack>
        
        <Button 
          startIcon={<PlusCircle size={16} />} 
          onClick={onAdd}
          size="small"
          variant="outlined"
          sx={{ 
            borderRadius: 2, 
            textTransform: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            borderColor: (theme) => theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
            color: (theme) => theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(79, 70, 229, 0.04)',
              borderColor: 'primary.light',
            }
          }}
        >
          Add Filter
        </Button>
      </Box>

      <Stack spacing={1}>
        {conditions.map((condition) => (
          <FilterRow 
            key={condition.id}
            condition={condition}
            fields={config}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          startIcon={<XCircle size={16} />} 
          onClick={onClear}
          size="small"
          sx={{ 
            color: 'text.secondary',
            '&:hover': { color: 'error.main', backgroundColor: 'transparent' }
          }}
        >
          Clear All
        </Button>
        
        {conditions.length > 0 && (
          <Button 
            variant="contained" 
            onClick={handleApply}
            disabled={isApplying}
            startIcon={
              isApplying ? (
                <CircularProgress size={16} color="inherit" />
              ) : isSuccess ? (
                <CheckCircle2 size={18} />
              ) : null
            }
            sx={{ 
              px: 3,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
              ...(isSuccess && {
                backgroundColor: 'success.main !important',
              })
            }}
          >
            {isApplying ? 'Applying...' : isSuccess ? 'Applied!' : 'Apply Filters'}
          </Button>
        )}
      </Box>
      </Paper>

      <Snackbar 
        open={!!error} 
        autoHideDuration={4000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FilterPanel;
