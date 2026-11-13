import { createContext } from 'react';
import type { Credenciales, Rol, Usuario } from '../types/auth.types';

export type AuthContextType = {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
  tieneRol: (rol: Rol) => boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
