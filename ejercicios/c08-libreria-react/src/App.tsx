import { useState } from 'react';
import Navbar from './componentes/Navbar';
import BookCard from './componentes/BookCard';
import MoodFilter from './componentes/Moodfilter';

export default function App() {
  const [filtro, setFiltro] = useState('Todos');

  //datos de ejemplo
  const libros = [
    { id: 1, titulo: "El Aleph", autor: "Borges", mood: "Mágico", imagen: "https://picsum.photos/300/400" },
    { id: 2, titulo: "Rayuela", autor: "Cortázar", mood: "Drama", imagen: "https://picsum.photos/301/400" },
    { id: 3, titulo: "1984", autor: "Orwell", mood: "Misterio", imagen: "https://picsum.photos/302/400" },
    { id: 4, titulo: "La Metamorfosis", autor: "Kafka", mood: "Drama", imagen: "https://picsum.photos/303/400" },
  ];

  // Filtramos la lista dependiendo de lo que el usuario selecciono
  const librosFiltrados = filtro === 'Todos' 
    ? libros 
    : libros.filter((libro) => libro.mood === filtro);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
    </div>
  );
}