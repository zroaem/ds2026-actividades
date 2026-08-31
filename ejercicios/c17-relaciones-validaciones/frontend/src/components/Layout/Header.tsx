import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/" className="font-bold text-xl">Librería</Link>
        <ul className="flex gap-4">
          <li><Link to="/" className="hover:text-blue-200">Inicio</Link></li>
          <li><Link to="/catalogo" className="hover:text-blue-200">Catálogo</Link></li>
          <li><Link to="/libros/nuevo" className="hover:text-blue-200">Agregar</Link></li>
          <li><Link to="/contacto" className="hover:text-blue-200">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
}