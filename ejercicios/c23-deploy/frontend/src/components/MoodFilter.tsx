import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

interface MoodFilterProps {
  filtroActual: string;
  setFiltro: (mood: string) => void;
}

const ICONOS: Record<string, string> = {
  reflexivo: '🎭',
  experimental: '🔬',
  distópico: '🤖',
  inquietante: '🌫️',
};

export default function MoodFilter({ filtroActual, setFiltro }: MoodFilterProps) {
  const { data: libros } = useFetch<Libro[]>('/libros');

  const moods = [...new Set(
    (libros ?? [])
      .map((libro) => libro.mood)
      .filter((mood) => mood.trim() !== '' && mood.toLowerCase() !== 'test')
  )];

  const opciones = ['Todos', ...moods];

  return (
    <div className="px-6 py-4">
      <h2 className="text-sm font-semibold text-gray-500 mb-3">Humor</h2>
      <div className="flex flex-wrap gap-3">
        {opciones.map((mood) => (
          <button
            key={mood}
            onClick={() => setFiltro(mood)}
            className={`px-4 py-2 rounded-full border ${
              filtroActual === mood
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {mood !== 'Todos' && ICONOS[mood] ? ICONOS[mood] : '📚'} {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
