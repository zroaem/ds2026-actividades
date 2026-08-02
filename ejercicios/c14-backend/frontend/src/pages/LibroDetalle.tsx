import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Libro } from '../types/libro';

export default function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch('/libros.json');
        if (!res.ok) throw new Error('Error');
        setLibros(await res.json());
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) return <p className="p-4">Cargando...</p>;

  const libro = libros.find((l) => l.id === Number(id));

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
          <p className="text-gray-500 mb-4">{libro.autor}</p>
          <p className="text-gray-700">{libro.sinopsis}</p>
          <div className="mt-6">
            <Link to="/catalogo" className="text-blue-500 hover:underline">← Volver al catálogo</Link>
          </div>
        </div>
      </div>
    </div>
  );
}