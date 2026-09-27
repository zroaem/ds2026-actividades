import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion';
import { AuthContext } from './authContext';
import type { Credenciales, Usuario } from '../types/auth.types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(() => obtenerToken() !== null);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  const login = useCallback(async (credenciales: Credenciales) => {
    const { token } = await apiFetch<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(token);
    setUsuario(await apiFetch<Usuario>('/auth/yo'));
  }, []);

  const tieneRol = useCallback(
    (rol: Usuario['rol']) => usuario?.rol === rol,
    [usuario]
  );

  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: usuario !== null,
        login,
        logout,
        tieneRol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
