import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Rol } from '../types/auth.types';

interface PrivateRouteProps {
  rol?: Rol;
}

export default function PrivateRoute({ rol }: PrivateRouteProps) {
  const { usuario, cargando, tieneRol } = useAuth();

  if (cargando) {
    return (
      <div className="flex justify-center items-center p-12">
        <p className="text-gray-500 animate-pulse">Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rol && !tieneRol(rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}
