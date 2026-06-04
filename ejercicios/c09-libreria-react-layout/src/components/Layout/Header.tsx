export default function Header() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <a href="/" className="font-bold text-xl">Librería</a>
        <ul className="flex gap-4">
          <li><a href="/" className="hover:text-blue-200">Inicio</a></li>
          <li><a href="/catalogo" className="hover:text-blue-200">Catálogo</a></li>
          <li><a href="/contacto" className="hover:text-blue-200">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
}