import { useState } from 'react';

interface BookCardProps {
  titulo: string;
  autor: string;
  imagen: string;
  mood: string;
}

export default function BookCard({ titulo, autor, imagen, mood }: BookCardProps) {
  const [meGusta, setMeGusta] = useState(false);

  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-white">
      <div className="relative mb-3">
        <img src={imagen} alt={titulo} className="w-full h-48 object-cover rounded" />
        <span className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-bold rounded border border-gray-200">
          {mood}
        </span>
      </div>

      <h3 className="font-bold text-lg text-gray-800">{titulo}</h3>
      <p className="text-gray-500 text-sm mb-4">{autor}</p>

      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
          Ver más
        </button>
        <button 
          onClick={() => setMeGusta(!meGusta)}
          className={meGusta ? 'text-red-500 text-xl' : 'text-gray-300 text-xl hover:text-gray-400'}
        >
          ♥
        </button>
      </div>
    </div>
  );
}