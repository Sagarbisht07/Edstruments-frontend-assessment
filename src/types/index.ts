// Field types supported by the filter system
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'amount'
  | 'single-select'
  | 'multi-select'
  | 'boolean';

// Operators vary by field type
export type Operator =
  | 'equals' | 'not_equals'
  | 'contains' | 'not_contains'
  | 'starts_with' | 'ends_with'
  | 'greater_than' | 'less_than'
  | 'gte' | 'lte'
  | 'between'
  | 'is' | 'is_not'
  | 'in' | 'not_in'
  | 'regex';

// Config for a single filterable field
export interface FieldDefinition {
  key: string;                  // dot-notation supported e.g. "address.city"
  label: string;
  type: FieldType;
  options?: string[];           // for select fields
}

// A single filter condition row
export interface FilterCondition {
  id: string;                   // unique ID (use crypto.randomUUID())
  field: string;                // matches FieldDefinition.key
  operator: Operator;
  value: FilterValue;
}

// Value can be a primitive, array, or range
export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | { min?: number; max?: number }
  | { start?: string; end?: string }
  | null;

// Employee record shape
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;           // ISO date string e.g. "2021-03-15"
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}
