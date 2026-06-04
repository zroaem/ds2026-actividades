import { useState } from 'react';
import BookCard from '../components/BookCard';
import MoodFilter from '../components/MoodFilter';
import type { Libro } from '../types/libro';

const libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Borges", mood: "Mágico", imagen: "https://picsum.photos/300/400" },
  { id: 2, titulo: "Rayuela", autor: "Cortázar", mood: "Drama", imagen: "https://picsum.photos/301/400" },
  { id: 3, titulo: "1984", autor: "Orwell", mood: "Misterio", imagen: "https://picsum.photos/302/400" },
  { id: 4, titulo: "La Metamorfosis", autor: "Kafka", mood: "Drama", imagen: "https://picsum.photos/303/400" },
];

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