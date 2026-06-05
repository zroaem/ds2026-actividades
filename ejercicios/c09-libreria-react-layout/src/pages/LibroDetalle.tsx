import { useParams, Link } from 'react-router-dom';
import { libros } from '../data/libros';

export default function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const libro = libros.find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Libro no encontrado</h1>
        <Link to="/" className="text-blue-500 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={libro.imagen}
          alt={libro.titulo}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold">{libro.titulo}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {libro.mood}
            </span>
          </div>
          <p className="text-gray-500 mb-4">{libro.autor}</p>
          <p className="text-gray-700 leading-relaxed">{libro.sinopsis}</p>
          <div className="mt-6">
            <Link to="/catalogo" className="text-blue-500 hover:underline">
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}