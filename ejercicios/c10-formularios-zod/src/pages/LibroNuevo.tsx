import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { libroSchema } from '../schemas/libroSchema';
import type { Libro } from '../types/libro';

const MOODS = ['Mágico', 'Drama', 'Misterio', 'Aventura', 'Romance'];
const IMG_PLACEHOLDER = 'https://picsum.photos/300/400';

interface LibroNuevoProps {
  onAgregar: (libro: Libro) => void;
}

export default function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    mood: '',
    precio: '',
  });

  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
      const err: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);
        if (!err[campo]) err[campo] = issue.message;
      }
      setErrores(err);
      return; 
    }

    const nuevoLibro: Libro = {
      id: Date.now(), 
      titulo: resultado.data.titulo,
      autor: resultado.data.autor,
      mood: resultado.data.mood,
      imagen: IMG_PLACEHOLDER,
    };

    onAgregar(nuevoLibro);       
    navigate('/catalogo');        
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agregar nuevo libro</h1>
        <Link to="/catalogo" className="text-blue-500 hover:underline text-sm">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-4">

        {/* Campo título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.titulo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: El Aleph"
          />
          {errores.titulo && (
            <p className="text-red-500 text-xs mt-1">{errores.titulo}</p>
          )}
        </div>

        {/* Campo autor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autor
          </label>
          <input
            name="autor"
            value={form.autor}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.autor ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: Jorge Luis Borges"
          />
          {errores.autor && (
            <p className="text-red-500 text-xs mt-1">{errores.autor}</p>
          )}
        </div>

        {/* Campo mood */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mood
          </label>
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.mood ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Elegí un mood...</option>
            {MOODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errores.mood && (
            <p className="text-red-500 text-xs mt-1">{errores.mood}</p>
          )}
        </div>

        {/* Campo precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errores.precio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: 1500"
          />
          {errores.precio && (
            <p className="text-red-500 text-xs mt-1">{errores.precio}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium mt-2"
        >
          Agregar libro
        </button>

      </form>
    </div>
  );
}