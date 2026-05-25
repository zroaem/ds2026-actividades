interface MoodFilterProps {
  filtroActual: string;
  setFiltro: (mood: string) => void;
}

export default function MoodFilter({ filtroActual, setFiltro }: MoodFilterProps) {
  const moods = [
    { id: 'Todos', icono: '📚', label: 'Todos' },
    { id: 'Misterio', icono: '🕵️', label: 'Misterio' },
    { id: 'Drama', icono: '🎭', label: 'Drama' },
    { id: 'Mágico', icono: '✨', label: 'Mágico' },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg text-center mb-8">
      <h2 className="text-xl font-bold mb-4">¿De qué humor estás hoy?</h2>
      <div className="flex justify-center gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setFiltro(mood.id)}
            className={`px-4 py-2 rounded-full border ${
              filtroActual === mood.id 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-600 border-gray-300'
            }`}
          >
            {mood.icono} {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}