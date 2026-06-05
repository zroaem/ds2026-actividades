import type { Libro } from '../types/libro';

export const libros: Libro[] = [
  {
    id: 1,
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    mood: "Mágico",
    imagen: "https://picsum.photos/300/400",
    sinopsis: "Un hombre descubre en el sótano de una casa un punto del espacio que contiene todos los puntos del universo. Una exploración infinita de la memoria, el tiempo y la percepción."
  },
  {
    id: 2,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    mood: "Drama",
    imagen: "https://picsum.photos/301/400",
    sinopsis: "Horacio Oliveira busca a la Maga por las calles de París. Una novela que puede leerse en múltiples órdenes, desafiando la forma misma de contar historias."
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    mood: "Misterio",
    imagen: "https://picsum.photos/302/400",
    sinopsis: "En un mundo donde el Gran Hermano todo lo ve, Winston Smith se atreve a pensar por su cuenta. Una advertencia sobre el totalitarismo que sigue siendo urgente hoy."
  },
  {
    id: 4,
    titulo: "La Metamorfosis",
    autor: "Franz Kafka",
    mood: "Drama",
    imagen: "https://picsum.photos/303/400",
    sinopsis: "Gregor Samsa amanece convertido en un insecto gigante. Una alegoría sobre la alienación, la familia y lo que significa dejar de ser útil para los demás."
  },
];