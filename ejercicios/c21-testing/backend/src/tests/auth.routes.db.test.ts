// Requiere Docker/DB levantada y el seed aplicado: docker compose up -d db api && docker compose exec api npx prisma db seed
// Ejecutar con: docker compose exec api npm run test:db
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

describe("GET /api/libros contra la base real", () => {
  it("devuelve los libros del seed", async () => {
    const res = await request(app).get("/api/libros");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/auth/login contra el seed", () => {
  it("devuelve un token para el ADMIN sembrado", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@libreria.test",
      password: "admin1234",
    });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });

  it("devuelve un token para el CLIENTE sembrado", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "cliente@libreria.test",
      password: "cliente1234",
    });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });
});
