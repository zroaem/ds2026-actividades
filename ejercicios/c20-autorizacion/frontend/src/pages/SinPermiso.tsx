import { Link } from 'react-router-dom';

export default function SinPermiso() {
  return (
    <div className="max-w-lg mx-auto p-6 text-center">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">No tenés permiso</h1>
        <p className="text-gray-600">
          Tu usuario no tiene acceso a esta sección. Si creés que es un error, hablá con
          un administrador.
        </p>
        <Link
          to="/catalogo"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
