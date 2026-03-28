import type { FieldDefinition } from '../types';

export const employeeFilterConfig: FieldDefinition[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'department', label: 'Department', type: 'single-select',
    options: ['Engineering', 'Marketing', 'Finance', 'HR', 'Design', 'Operations'] },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'amount' },
  { key: 'joinDate', label: 'Join Date', type: 'date' },
  { key: 'isActive', label: 'Active', type: 'boolean' },
  { key: 'skills', label: 'Skills', type: 'multi-select',
    options: ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'AWS', 'Docker', 'SQL'] },
  { key: 'address.city', label: 'City', type: 'text' },    // nested object
  { key: 'projects', label: 'Projects', type: 'number' },
  { key: 'performanceRating', label: 'Performance Rating', type: 'number' },
];

export const transactionFilterConfig: FieldDefinition[] = [
  { key: 'amount', label: 'Amount', type: 'amount' },
  { key: 'paymentMethod', label: 'Payment Method', type: 'single-select',
    options: ['Card', 'Bank', 'UPI'] },
  { key: 'isRefunded', label: 'Refunded', type: 'boolean' },
];
