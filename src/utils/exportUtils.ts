import { getNestedValue } from './filterEngine';

/**
 * Converts an array of objects to a CSV string.
 * Supports nested objects using dot notation in column accessors.
 */
export function convertToCSV(data: any[], columns: { header: string; accessorKey: string }[]): string {
  const headers = columns.map(col => col.header).join(',');
  const rows = data.map(record => {
    return columns.map(col => {
      let val = getNestedValue(record, col.accessorKey);
      if (val === null || val === undefined) val = '';
      if (Array.isArray(val)) val = val.join('; ');
      
      // Escape quotes and wrap in quotes if contains comma
      const stringVal = String(val).replace(/"/g, '""');
      return stringVal.includes(',') ? `"${stringVal}"` : stringVal;
    }).join(',');
  });
  
  return [headers, ...rows].join('\n');
}

/**
 * Triggers a browser download for a given string content.
 */
export function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
