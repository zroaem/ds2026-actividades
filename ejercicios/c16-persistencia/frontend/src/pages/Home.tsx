import { useState } from 'react';
import BookCard from '../components/BookCard';
import MoodFilter from '../components/MoodFilter';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

export default function Home() {
  const [filtro, setFiltro] = useState('Todos');
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

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

  const librosFiltrados = filtro === 'Todos'
    ? (libros ?? [])
    : (libros ?? []).filter((libro) => libro.mood === filtro);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <MoodFilter filtroActual={filtro} setFiltro={setFiltro} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {librosFiltrados.map((libro) => (
          <BookCard
            key={libro.id}
            titulo={libro.titulo}
            autor={libro.autor}
            imagen={libro.imagen}
            mood={libro.mood}
          />
        ))}
      </div>
    </div>
  );
}