export interface Libro {
  id: number;
  titulo: string;
  autorId: number;
  mood: string;
  imagen: string;
  sinopsis: string | null;
  disponible: boolean;
}