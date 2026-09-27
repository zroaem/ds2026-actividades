import { z } from "zod";

export const usuarioCreateSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  rol: z.enum(["ADMIN", "CLIENTE"]).default("CLIENTE"),
});

export const usuarioUpdateSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),
  nombre: z.string().min(1, "El nombre es obligatorio").optional(),
  rol: z.enum(["ADMIN", "CLIENTE"]).optional(),
});

export type UsuarioCreate = z.infer<typeof usuarioCreateSchema>;
export type UsuarioUpdate = z.infer<typeof usuarioUpdateSchema>;