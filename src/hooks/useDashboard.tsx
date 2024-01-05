import { DashboardContext } from '@/contexts/DashboardContext';
import { useContext } from 'react';

export function useDashboard() {
  const context = useContext(DashboardContext);
  return context;
}
