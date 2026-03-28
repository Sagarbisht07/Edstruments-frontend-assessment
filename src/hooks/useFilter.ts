import { 
  useState, 
  useMemo, 
  useCallback, 
  useEffect, 
  useRef 
} from 'react';
import type { FilterCondition, FieldDefinition, Employee } from '../types';
import { applyFilters } from '../utils/filterEngine';
import { OPERATOR_MAP } from '../utils/operatorMap';

export function useFilter(data: Employee[], config: FieldDefinition[]) {
  // Use initializer function to load state on first mount
  const [conditions, setConditions] = useState<FilterCondition[]>(() => {
    const saved = localStorage.getItem('appliedConditions');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedConditions, setAppliedConditions] = useState<FilterCondition[]>(conditions);

  const filteredData = useMemo(
    () => applyFilters(data, appliedConditions),
    [data, appliedConditions]
  );

  const addFilter = useCallback(() => {
    const firstField = config[0];
    const firstOperator = OPERATOR_MAP[firstField.type][0].value;
    
    setConditions(prev => [...prev, {
      id: crypto.randomUUID(),
      field: firstField.key,
      operator: firstOperator,
      value: null
    }]);
  }, [config]);

  const updateFilter = useCallback((id: string, updates: Partial<FilterCondition>) => {
    setConditions(prev => prev.map(c => {
      if (c.id !== id) return c;
      const newCondition = { ...c, ...updates };
      
      if (updates.field) {
        const fieldDef = config.find(f => f.key === updates.field);
        if (fieldDef) {
          newCondition.operator = OPERATOR_MAP[fieldDef.type][0].value;
          newCondition.value = null;
        }
      }
      if (updates.operator) newCondition.value = null;
      
      return newCondition;
    }));
  }, [config]);

  const removeFilter = useCallback((id: string) => {
    setConditions(prev => prev.filter(c => c.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem('appliedConditions', JSON.stringify(appliedConditions));
  }, [appliedConditions]);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      setAppliedConditions([...conditions]);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [conditions]);

  const applyFiltersAction = useCallback(() => {
    setAppliedConditions([...conditions]);
  }, [conditions]);

  const clearAll = useCallback(() => {
    setConditions([]);
    setAppliedConditions([]);
  }, []);

  return { 
    conditions, 
    filteredData, 
    addFilter, 
    updateFilter, 
    removeFilter, 
    applyFiltersAction, 
    clearAll 
  };
}
