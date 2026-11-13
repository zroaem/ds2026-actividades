import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { AuthContext } from '../../context/authContext';
import type { AuthContextType } from '../../context/authContext';
import type { Usuario } from '../../types/auth.types';

function renderHeader(usuario: Usuario | null) {
  const auth: AuthContextType = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    login: vi.fn(async () => {}),
    logout: vi.fn(),
    tieneRol: (rol) => usuario?.rol === rol,
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('sin sesión muestra el link Ingresar y no muestra Nuevo libro', () => {
    renderHeader(null);

    expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });

  it('con un CLIENTE saluda por nombre y no muestra Nuevo libro', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });

    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });

  it('con un ADMIN muestra el link Nuevo libro', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });

    expect(screen.getByRole('link', { name: 'Nuevo libro' })).toBeInTheDocument();
  });
});
