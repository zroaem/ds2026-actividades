import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

type LibroCardDetalladaProps = {
  libro: Libro;
};

export default function LibroCardDetallada({ libro }: LibroCardDetalladaProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="relative sm:w-40 shrink-0">
          <img
            src={libro.imagen}
            alt={libro.titulo}
            className="w-full h-40 sm:h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-gray-800">{libro.titulo}</h3>
            <span className="shrink-0 bg-gray-100 px-2 py-1 text-xs font-semibold rounded text-gray-600">
              {libro.mood}
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-1">{libro.autor.nombre}</p>

          {libro.sinopsis && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">{libro.sinopsis}</p>
          )}

          <div className="mt-auto pt-4 flex items-center justify-between gap-3">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                libro.disponible
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {libro.disponible ? 'Disponible' : 'No disponible'}
            </span>

            <Link
              to={`/libros/${libro.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
