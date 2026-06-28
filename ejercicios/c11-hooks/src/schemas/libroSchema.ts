import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autor: z.string().trim().min(1, 'El autor es obligatorio'),
  mood: z.string().min(1, 'El mood es obligatorio'),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
});

export type LibroFormData = z.infer<typeof libroSchema>;