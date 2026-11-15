import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { errorHandler } from "../middlewares/error.middleware";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";

const SECRET = "test-secret-c21";

function crearRequest(authorization?: string): Request {
  return {
    headers: authorization ? { authorization } : {},
  } as unknown as Request;
}

function crearResponse(): Response {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response;
}

function capturarError(fn: () => void): unknown {
  try {
    fn();
  } catch (error) {
    return error;
  }
  return undefined;
}

describe("authorize", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = SECRET;
  });

  it("rechaza con 403 a un CLIENTE cuando la ruta exige ADMIN", () => {
    const req = { usuario: { id: 2, rol: "CLIENTE" } } as unknown as Request;
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    const error = capturarError(() => authorize("ADMIN")(req, res, next));
    errorHandler(error, req, res, next);

    expect(error).toBeInstanceOf(ForbiddenError);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("deja pasar a un ADMIN cuando la ruta exige ADMIN", () => {
    const req = { usuario: { id: 1, rol: "ADMIN" } } as unknown as Request;
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    authorize("ADMIN")(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });
});

describe("authenticate", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = SECRET;
  });

  it("adjunta el usuario y llama a next con un token válido", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, SECRET, { expiresIn: "1h" });
    const req = crearRequest(`Bearer ${token}`);
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    authenticate(req, res, next);

    expect(req.usuario).toMatchObject({ id: 1, rol: "ADMIN" });
    expect(next).toHaveBeenCalledOnce();
  });

  it("rechaza un token expirado con 401", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, SECRET, { expiresIn: "-1s" });
    const req = crearRequest(`Bearer ${token}`);
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    const error = capturarError(() => authenticate(req, res, next));

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect((error as UnauthorizedError).status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rechaza un token firmado con otro secret", () => {
    const token = jwt.sign({ id: 1, rol: "ADMIN" }, "otro-secret");
    const req = crearRequest(`Bearer ${token}`);
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    const error = capturarError(() => authenticate(req, res, next));

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(next).not.toHaveBeenCalled();
  });

  it("rechaza una request sin header Authorization", () => {
    const req = crearRequest();
    const res = crearResponse();
    const next = vi.fn() as unknown as NextFunction;

    const error = capturarError(() => authenticate(req, res, next));

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(next).not.toHaveBeenCalled();
  });
});
