import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio'),
  autorId: z.coerce.number().int().positive('Elegí un autor'),
  mood: z.string().min(1, 'El mood es obligatorio'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
  sinopsis: z.string().trim().optional(),
});

export type LibroFormData = z.infer<typeof libroSchema>;