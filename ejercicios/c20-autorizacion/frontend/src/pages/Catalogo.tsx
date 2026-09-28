import { useState } from 'react';
import { Link } from 'react-router-dom';
import MoodFilter from '../components/MoodFilter';
import LibroCardDetallada from '../components/LibroCardDetallada';
import { useFetch } from '../hooks/useFetch';
import type { Categoria, Libro } from '../types/libro';

export default function Catalogo() {
  const [filtroMood, setFiltroMood] = useState('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');
  const { data: categorias } = useFetch<Categoria[]>('/categorias');

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

  const librosFiltrados = (libros ?? []).filter((libro) => {
    const cumpleMood = filtroMood === 'Todos' || libro.mood === filtroMood;
    const cumpleCategoria = filtroCategoria === 'Todos'
      || (libro.categorias ?? []).some((categoria) => categoria.nombre === filtroCategoria);
    return cumpleMood && cumpleCategoria;
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catálogo completo</h1>
        <Link to="/libros/nuevo" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Agregar libro
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
        <MoodFilter filtroActual={filtroMood} setFiltro={setFiltroMood} />
        <div className="border-t border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Categoría</h2>
          <div className="flex flex-wrap gap-3">
            {['Todos', ...(categorias ?? []).map((categoria) => categoria.nombre)].map((categoria) => (
              <button
                key={categoria}
                onClick={() => setFiltroCategoria(categoria)}
                className={`px-4 py-2 rounded-full border ${
                  filtroCategoria === categoria
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {librosFiltrados.map((libro) => (
          <LibroCardDetallada key={libro.id} libro={libro} />
        ))}
      </div>

      {librosFiltrados.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No hay libros que coincidan con los filtros.</p>
      )}
    </div>
  );
}
