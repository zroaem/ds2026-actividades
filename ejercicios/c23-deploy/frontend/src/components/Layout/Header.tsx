import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { usuario, logout, tieneRol } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="font-serif font-semibold tracking-tight text-xl">La Librería</Link>
        <ul className="flex gap-4 items-center">
          <li><Link to="/" className="hover:text-blue-200">Inicio</Link></li>
          <li><Link to="/catalogo" className="hover:text-blue-200">Catálogo</Link></li>
          {tieneRol('ADMIN') && (
            <li><Link to="/libros/nuevo" className="hover:text-blue-200">Nuevo libro</Link></li>
          )}
          {usuario ? (
            <li className="flex items-center gap-2">
              <span className="text-blue-100">Hola, {usuario.nombre}</span>
              <button
                type="button"
                onClick={logout}
                className="bg-blue-700 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Salir
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:text-blue-200">Ingresar</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
