import { FiltersContext } from '@/contexts/FiltersContext';
import { useContext } from 'react';

export function useFilters() {
  const context = useContext(FiltersContext);
  return context;
}
