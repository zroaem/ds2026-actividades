import jwt from "jsonwebtoken";
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

const SECRET = process.env.JWT_SECRET!;

function tokenConRol(rol: "ADMIN" | "CLIENTE"): string {
  return jwt.sign({ id: 1, rol }, SECRET, { expiresIn: "1h" });
}

describe("POST /api/libros - matriz de permisos", () => {
  it("responde 401 sin token", async () => {
    const res = await request(app).post("/api/libros").send({});

    expect(res.status).toBe(401);
  });

  it("responde 403 con token de CLIENTE", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenConRol("CLIENTE")}`)
      .send({
        titulo: "Rayuela",
        autorId: 1,
        mood: "experimental",
        imagen: "https://example.com/rayuela.jpg",
      });

    expect(res.status).toBe(403);
  });

  it("responde 400 con token de ADMIN y body inválido, antes de llegar a Prisma", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenConRol("ADMIN")}`)
      .send({ titulo: "", autorId: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Datos inválidos");
  });
});
