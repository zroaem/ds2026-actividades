import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

interface CatalogoProps {
  libros: Libro[];
}

export default function Catalogo({ libros }: CatalogoProps) {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catálogo completo</h1>
        <Link
          to="/libros/nuevo"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Agregar libro
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {libros.map((libro) => (
          <div key={libro.id} className="border border-gray-200 p-4 rounded-lg bg-white">
            <img src={libro.imagen} alt={libro.titulo} className="w-full h-48 object-cover rounded mb-3" />
            <h3 className="font-bold text-lg">{libro.titulo}</h3>
            <p className="text-gray-500 text-sm mb-3">{libro.autor}</p>
            <Link
              to={`/libros/${libro.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}