import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';

export default function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        setLibro(await apiFetch<Libro>(`/libros/${id}`));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  if (loading) return <p className="p-4">Cargando...</p>;

  if (error) return (
    <div className="max-w-5xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{error}</h1>
      <Link to="/catalogo" className="text-blue-500 hover:underline">Volver al catálogo</Link>
    </div>
  );

  if (!libro) return (
    <div className="max-w-5xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Libro no encontrado</h1>
      <Link to="/catalogo" className="text-blue-500 hover:underline">Volver al catálogo</Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={libro.imagen} alt={libro.titulo} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{libro.titulo}</h1>
          {libro.categorias && libro.categorias.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {libro.categorias.map((categoria) => (
                <span
                  key={categoria.id}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {categoria.nombre}
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-500 mb-4">
            {libro.autor.nombre}
            {libro.autor.nacionalidad ? ` — ${libro.autor.nacionalidad}` : ''}
          </p>
          <p className="text-gray-700">{libro.sinopsis}</p>
          <div className="mt-6">
            <Link to="/catalogo" className="text-blue-500 hover:underline">← Volver al catálogo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}