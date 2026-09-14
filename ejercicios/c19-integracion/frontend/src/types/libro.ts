export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string | null;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Libro {
  id: number;
  titulo: string;
  autorId: number;
  mood: string;
  imagen: string;
  sinopsis: string | null;
  disponible: boolean;
  autor: Autor;
  categorias?: Categoria[];
}