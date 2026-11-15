import { describe, expect, it } from "vitest";
import { loginSchema } from "../validations/auth.validation";
import { libroCreateSchema } from "../validations/libro.validation";

describe("libroCreateSchema", () => {
  it("rechaza un autorId negativo", () => {
    const resultado = libroCreateSchema.safeParse({
      titulo: "Rayuela",
      autorId: -1,
      mood: "experimental",
      imagen: "https://example.com/rayuela.jpg",
    });

    expect(resultado.success).toBe(false);
  });

  it("normaliza el título recortando espacios", () => {
    const resultado = libroCreateSchema.safeParse({
      titulo: "  Rayuela  ",
      autorId: 1,
      mood: "experimental",
      imagen: "https://example.com/rayuela.jpg",
    });

    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.titulo).toBe("Rayuela");
    }
  });

  it("rechaza un título vacío", () => {
    const resultado = libroCreateSchema.safeParse({
      titulo: "   ",
      autorId: 1,
      mood: "experimental",
      imagen: "https://example.com/rayuela.jpg",
    });

    expect(resultado.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("rechaza un email inválido", () => {
    const resultado = loginSchema.safeParse({
      email: "no-es-un-email",
      password: "secreto",
    });

    expect(resultado.success).toBe(false);
  });

  it("acepta credenciales válidas", () => {
    const resultado = loginSchema.safeParse({
      email: "admin@libreria.test",
      password: "admin1234",
    });

    expect(resultado.success).toBe(true);
  });
});
