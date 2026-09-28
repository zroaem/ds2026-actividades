import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

const CANTIDAD_DESTACADOS = 6;

export default function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

  if (loading) return (
    <div className="flex justify-center items-center p-12">
      <p className="text-gray-500 animate-pulse">Cargando libros...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  const todosLosLibros = libros ?? [];
  const destacados = todosLosLibros.slice(0, CANTIDAD_DESTACADOS);
  const hayMasLibros = todosLosLibros.length > CANTIDAD_DESTACADOS;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <section className="bg-blue-600 text-white rounded-lg px-6 py-20 mb-12 text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a Librería
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Encontrá tu próxima lectura entre nuestros títulos destacados.
        </p>
        <Link
          to="/catalogo"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
        >
          Ver catálogo
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Libros destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destacados.map((libro) => (
            <BookCard
              key={libro.id}
              id={libro.id}
              titulo={libro.titulo}
              autor={libro.autor.nombre}
              imagen={libro.imagen}
              mood={libro.mood}
            />
          ))}
        </div>
      </section>

      {hayMasLibros && (
        <div className="mt-10 text-center">
          <Link
            to="/catalogo"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      )}
    </div>
  );
}
