import type { FieldType, Operator } from '../types';

export const OPERATOR_MAP: Record<FieldType, { value: Operator; label: string }[]> = {
  text: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Does Not Equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'regex', label: 'Regex (Pattern)' },
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'gte', label: 'Greater Than or Equal' },
    { value: 'lte', label: 'Less Than or Equal' },
  ],
  date: [{ value: 'between', label: 'Between' }],
  amount: [{ value: 'between', label: 'Between' }],
  'single-select': [
    { value: 'is', label: 'Is' },
    { value: 'is_not', label: 'Is Not' },
  ],
  'multi-select': [
    { value: 'in', label: 'In' },
    { value: 'not_in', label: 'Not In' },
  ],
  boolean: [{ value: 'is', label: 'Is' }],
};
