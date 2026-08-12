import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Aleph",
    autorId: 1,
    mood: "Mágico",
    imagen: "https://picsum.photos/300/400",
    sinopsis: "Un hombre descubre en el sótano de una casa un punto del espacio que contiene todos los puntos del universo. Una exploración infinita de la memoria, el tiempo y la percepción."
  },
  {
    id: 2,
    titulo: "Rayuela",
    autorId: 2,
    mood: "Drama",
    imagen: "https://picsum.photos/301/400",
    sinopsis: "Horacio Oliveira busca a la Maga por las calles de París. Una novela que puede leerse en múltiples órdenes, desafiando la forma misma de contar historias."
  },
  {
    id: 3,
    titulo: "1984",
    autorId: 3,
    mood: "Misterio",
    imagen: "https://picsum.photos/302/400",
    sinopsis: "En un mundo donde el Gran Hermano todo lo ve, Winston Smith se atreve a pensar por su cuenta. Una advertencia sobre el totalitarismo que sigue siendo urgente hoy."
  },
  {
    id: 4,
    titulo: "La Metamorfosis",
    autorId: 4,
    mood: "Drama",
    imagen: "https://picsum.photos/303/400",
    sinopsis: "Gregor Samsa amanece convertido en un insecto gigante. Una alegoría sobre la alienación, la familia y lo que significa dejar de ser útil para los demás."
  }
];

let proximoId = 5;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const libro = libros.find(l => l.id === id);
  if (!libro) return undefined;
  Object.assign(libro, datos);
  return libro;
}

export function remove(id: number): boolean {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}