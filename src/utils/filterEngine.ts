import type { FilterCondition } from '../types';

export function getNestedValue(obj: any, path: string): any {
  if (!obj) return undefined;
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function groupBy<T>(array: T[], keyGetter: (item: T) => string): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const key = keyGetter(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

function isValidCondition(condition: FilterCondition): boolean {
  if (!condition.field || !condition.operator) return false;
  
  const val = condition.value;
  if (val === null || val === undefined) return false;
  
  if (typeof val === 'string' && val.trim() === '') return false;
  
  if (Array.isArray(val) && val.length === 0) return false;
  
  // For range values
  if (typeof val === 'object' && !Array.isArray(val)) {
    const range = val as any;
    // Between numbers/amounts
    if ('min' in range || 'max' in range) {
      return range.min !== undefined || range.max !== undefined;
    }
    // Between dates
    if ('start' in range || 'end' in range) {
      return range.start !== undefined && range.end !== undefined;
    }
  }
  
  return true;
}

export function applyFilters<T>(data: T[], conditions: FilterCondition[]): T[] {
  const activeConditions = conditions.filter(isValidCondition);
  if (activeConditions.length === 0) return data;

  // Group conditions by field for OR logic within same field
  const grouped = groupBy(activeConditions, (c) => c.field);

  return data.filter((record) => {
    // AND between different fields (all field groups must pass)
    return Object.values(grouped).every((fieldConditions) => {
      // OR within same field (any condition for that field group must pass)
      return fieldConditions.some((condition) =>
        evaluateCondition(record, condition)
      );
    });
  });
}

function evaluateCondition(record: any, condition: FilterCondition): boolean {
  const value = getNestedValue(record, condition.field);
  const { operator, value: filterValue } = condition;

  // Handle null/undefined values in record gracefully
  if (value === null || value === undefined) {
    // Some operators might explicitly handle nulls, but for now we skip
    return false;
  }

  const stringValue = String(value).toLowerCase();
  const stringFilterValue = typeof filterValue === 'string' ? filterValue.toLowerCase() : String(filterValue).toLowerCase();

  switch (operator) {
    case 'equals': 
      return stringValue === stringFilterValue;
    case 'not_equals':
      return stringValue !== stringFilterValue;
    case 'contains': 
      return stringValue.includes(stringFilterValue);
    case 'not_contains': 
      return !stringValue.includes(stringFilterValue);
    case 'starts_with': 
      return stringValue.startsWith(stringFilterValue);
    case 'ends_with': 
      return stringValue.endsWith(stringFilterValue);
    
    case 'greater_than': 
      return Number(value) > Number(filterValue);
    case 'less_than': 
      return Number(value) < Number(filterValue);
    case 'gte': 
      return Number(value) >= Number(filterValue);
    case 'lte': 
      return Number(value) <= Number(filterValue);
    
    case 'between': {
      // Works for both date ranges and number/amount ranges
      const range = filterValue as any;
      if (range.start && range.end) {
        const recordDate = new Date(value);
        return recordDate >= new Date(range.start) && recordDate <= new Date(range.end);
      }
      const min = range.min !== undefined ? Number(range.min) : -Infinity;
      const max = range.max !== undefined ? Number(range.max) : Infinity;
      const numValue = Number(value);
      return numValue >= min && numValue <= max;
    }
    
    case 'is': 
      return value === filterValue;
    case 'is_not': 
      return value !== filterValue;
    
    case 'in': {
      const arrValue = Array.isArray(value) ? value : [value];
      const filterArr = filterValue as any[];
      return filterArr.some(v => arrValue.includes(v));
    }
    case 'not_in': {
      const arrValue = Array.isArray(value) ? value : [value];
      const filterArr = filterValue as any[];
      return !filterArr.some(v => arrValue.includes(v));
    }
    
    case 'regex': {
      try {
        const regex = new RegExp(String(filterValue), 'i');
        return regex.test(String(value));
      } catch (e) {
        return false;
      }
    }
    
    default: 
      return true;
  }
}
