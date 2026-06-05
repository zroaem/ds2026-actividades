import { useState } from 'react';
import BookCard from '../components/BookCard';
import MoodFilter from '../components/MoodFilter';
import { libros } from '../data/libros';

export default function Home() {
  const [filtro, setFiltro] = useState('Todos');

  const librosFiltrados = filtro === 'Todos'
    ? libros
    : libros.filter((libro) => libro.mood === filtro);

  return (
    <main className="max-w-5xl mx-auto p-4">
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
    </main>
  );
}