import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
