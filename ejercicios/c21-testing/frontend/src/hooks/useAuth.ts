import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import type { AuthContextType } from '../context/authContext';

export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (contexto === null) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return contexto;
}
