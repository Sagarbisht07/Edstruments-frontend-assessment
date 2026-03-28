import React from 'react';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface DateRangeInputProps {
  value: { start?: string; end?: string } | null;
  onChange: (value: { start?: string; end?: string }) => void;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({ value, onChange }) => {
  const start = value?.start ? dayjs(value.start) : null;
  const end = value?.end ? dayjs(value.end) : null;

  const handleStartChange = (newValue: Dayjs | null) => {
    onChange({ ...value, start: newValue ? newValue.toISOString() : undefined });
  };

  const handleEndChange = (newValue: Dayjs | null) => {
    onChange({ ...value, end: newValue ? newValue.toISOString() : undefined });
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <DatePicker
        value={start}
        onChange={handleStartChange}
        slotProps={{ 
          textField: { 
            size: 'small',
            placeholder: 'Start Date'
          } 
        }}
      />
      <span>to</span>
      <DatePicker
        value={end}
        onChange={handleEndChange}
        slotProps={{ 
          textField: { 
            size: 'small',
            placeholder: 'End Date'
          } 
        }}
      />
    </Box>
  );
};

export default DateRangeInput;
