import { 
  ThemeProvider, 
  CssBaseline, 
  Container, 
  Box, 
  Typography, 
  GlobalStyles,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { FileJson, Table as TableIcon, Sun, Moon } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useMemo, useEffect } from 'react';
import { employeeFilterConfig } from './config/filterConfig';
import { useFilter } from './hooks/useFilter';
import FilterPanel from './components/FilterPanel/FilterPanel';
import FilterChipsBar from './components/FilterPanel/FilterChipsBar';
import DataTable from './components/DataTable/DataTable';
import RecordCount from './components/DataTable/RecordCount';
import employeesData from './data/employees.json';
import type { Employee } from './types';
import { convertToCSV, downloadFile } from './utils/exportUtils';

import { getTheme } from './theme';

function App() {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as PaletteMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  const employees = employeesData as Employee[];
  
  const { 
    conditions, 
    filteredData, 
    addFilter, 
    updateFilter, 
    removeFilter, 
    applyFiltersAction, 
    clearAll 
  } = useFilter(employees, employeeFilterConfig);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <GlobalStyles styles={{
          body: {
            background: mode === 'dark' 
              ? 'radial-gradient(circle at top right, #1E293B, #0F172A)' 
              : 'radial-gradient(circle at top right, #F1F5F9, #F8FAFC)',
            minHeight: '100vh',
            transition: 'background 0.3s ease',
          }
        }} />
        
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom 
                sx={{ 
                  background: mode === 'dark' 
                    ? 'linear-gradient(to right, #f8fafc, #94a3b8)' 
                    : 'linear-gradient(to right, #0f172a, #475569)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                Employee Directory
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8, fontWeight: 400 }}>
                Config-driven dynamic filtering system for large datasets.
              </Typography>
            </Box>
            
            <Tooltip title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}>
              <IconButton 
                onClick={toggleMode} 
                sx={{ 
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  border: '1px solid',
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  color: mode === 'dark' ? 'primary.main' : 'warning.main',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                {mode === 'light' ? <Moon size={24} /> : <Sun size={24} />}
              </IconButton>
            </Tooltip>
          </Box>

          <FilterPanel 
            conditions={conditions}
            config={employeeFilterConfig}
            onAdd={addFilter}
            onUpdate={updateFilter}
            onRemove={removeFilter}
            onApply={applyFiltersAction}
            onClear={clearAll}
          />

          <FilterChipsBar 
            mode={mode}
            conditions={conditions}
            fieldConfig={employeeFilterConfig}
            onRemove={removeFilter}
            onClearAll={clearAll}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <RecordCount 
              total={employees.length} 
              filtered={filteredData.length} 
            />
            
            <Stack direction="row" spacing={1} sx={{ height: 'fit-content' }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<TableIcon size={16} />}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  color: 'text.secondary', 
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  height: 36
                }}
                onClick={() => {
                  const csv = convertToCSV(filteredData, [
                    { header: 'ID', accessorKey: 'id' },
                    { header: 'Name', accessorKey: 'name' },
                    { header: 'Email', accessorKey: 'email' },
                    { header: 'Department', accessorKey: 'department' },
                    { header: 'Role', accessorKey: 'role' },
                    { header: 'Salary', accessorKey: 'salary' },
                    { header: 'City', accessorKey: 'address.city' },
                    { header: 'Country', accessorKey: 'address.country' },
                  ]);
                  downloadFile(csv, 'employees_export.csv', 'text/csv');
                }}
              >
                CSV
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FileJson size={16} />}
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  color: 'text.secondary', 
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  height: 36
                }}
                onClick={() => {
                  const json = JSON.stringify(filteredData, null, 2);
                  downloadFile(json, 'employees_export.json', 'application/json');
                }}
              >
                JSON
              </Button>
            </Stack>
          </Box>

          <DataTable data={filteredData} />

          <Box sx={{ 
            mt: 8, pt: 4, mb: 4, 
            borderTop: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            textAlign: 'center', 
            opacity: 0.5 
          }}>
            <Typography variant="body2" color="text.secondary">
              Edstruments Frontend Assessment — Dynamic Filter Component System
            </Typography>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
