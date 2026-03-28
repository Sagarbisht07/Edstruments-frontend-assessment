import React, { useState, useMemo, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableSortLabel, 
  Box, 
  Typography, 
  Chip,
  TablePagination,
  Paper
} from '@mui/material';
import type { Employee } from '../../types';
import { getNestedValue } from '../../utils/filterEngine';
import { ArrowUpDown, SearchX } from 'lucide-react';

interface ColumnDef {
  header: string;
  accessorKey: string;
  type?: 'boolean' | 'array' | 'date' | 'amount' | 'number' | 'text';
}

interface DataTableProps {
  data: Employee[];
}

const columns: ColumnDef[] = [
  { header: 'ID', accessorKey: 'id', type: 'number' },
  { header: 'Name', accessorKey: 'name', type: 'text' },
  { header: 'Department', accessorKey: 'department', type: 'text' },
  { header: 'Role', accessorKey: 'role', type: 'text' },
  { header: 'Salary', accessorKey: 'salary', type: 'amount' },
  { header: 'City', accessorKey: 'address.city', type: 'text' },
  { header: 'Country', accessorKey: 'address.country', type: 'text' },
  { header: 'Skills', accessorKey: 'skills', type: 'array' },
  { header: 'Join Date', accessorKey: 'joinDate', type: 'date' },
  { header: 'Active', accessorKey: 'isActive', type: 'boolean' },
];

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [orderBy, setOrderBy] = useState<string>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const handleSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = getNestedValue(a, orderBy);
      const valB = getNestedValue(b, orderBy);
      
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, orderBy, order]);

  const pagedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderCellContent = (record: Employee, col: ColumnDef) => {
    const value = getNestedValue(record, col.accessorKey);
    
    if (value === null || value === undefined) return '-';
    
    switch (col.type) {
      case 'boolean':
        return <Chip 
          label={value ? 'Active' : 'Inactive'} 
          color={value ? 'success' : 'default'} 
          size="small" 
          variant={value ? 'filled' : 'outlined'} 
          sx={{ fontWeight: 600 }}
        />;
      case 'array':
        const visibleItems = value.slice(0, 2);
        const remaining = value.length - visibleItems.length;
        return (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {visibleItems.map((v: string) => (
              <Chip 
                key={v} 
                label={v} 
                size="small" 
                variant="outlined" 
                sx={{ fontSize: '0.7rem' }} 
              />
            ))}
            {remaining > 0 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                +{remaining} more
              </Typography>
            )}
          </Box>
        );
      case 'amount':
        return `₹${Number(value).toLocaleString()}`;
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return String(value);
    }
  };

  return (
    <TableContainer component={Paper} variant="elevation" elevation={0} sx={{ mt: 2 }}>
      <Table stickyHeader sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell 
                key={col.accessorKey} 
                sx={{ 
                  py: 1.5,
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1E2130' : '#F3F4F6',
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  whiteSpace: 'nowrap'
                }}
              >
                <TableSortLabel
                  active={orderBy === col.accessorKey}
                  direction={orderBy === col.accessorKey ? order : 'asc'}
                  onClick={() => handleSort(col.accessorKey)}
                  IconComponent={ArrowUpDown}
                  sx={{ 
                    '& .MuiTableSortLabel-icon': {
                      fontSize: 14,
                      opacity: 0.5,
                      marginLeft: 0.5,
                    },
                    '&.Mui-active': {
                      color: 'primary.main',
                      '& .MuiTableSortLabel-icon': {
                        color: 'primary.main',
                        opacity: 1
                      }
                    }
                  }}
                >
                  {col.header}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pagedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 10, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
                  <SearchX size={48} strokeWidth={1} />
                  <Typography variant="h6" sx={{ mt: 2, fontSize: '1rem' }}>
                    No results match your filters
                  </Typography>
                  <Typography variant="body2">
                    Try adjusting or clearing your active filters to see more results.
                   </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            pagedData.map((row, index) => (
              <TableRow 
                key={`${row.id}-${data.length}`} // Retrigger animation on count change
                hover 
                sx={{ 
                  backgroundColor: (theme) => 
                    index % 2 === 1 
                      ? theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.01)' : '#FAFAFA' 
                      : 'transparent',
                  cursor: 'pointer',
                  animation: 'rowPulse 0.4s ease-out',
                  '@keyframes rowPulse': {
                    '0%': { backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(79, 70, 229, 0.1)' : '#EEF2FF' },
                    '100%': { backgroundColor: 'transparent' }
                  },
                  '&:hover': { 
                    backgroundColor: (theme) => 
                      theme.palette.mode === 'dark' ? '#1E2233 !important' : '#F0F4FF !important' 
                  },
                  '& .MuiTableCell-root': { 
                    height: 48,
                    py: 1,
                    fontSize: '0.85rem',
                    borderColor: (theme) => 
                      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#F3F4F6' 
                  }
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.accessorKey}>
                    {renderCellContent(row, col)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#0F1117' : '#F8F9FC',
          borderTop: '1px solid',
          borderColor: 'divider',
          '& .MuiTablePagination-toolbar': {
            minHeight: 48
          }
        }}
      />
    </TableContainer>
  );
};

export default DataTable;
