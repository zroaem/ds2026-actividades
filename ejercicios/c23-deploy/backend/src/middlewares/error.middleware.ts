import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";
import { Prisma } from "../generated/prisma/client";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues.map((i) => ({
        campo: i.path.join("."),
        mensaje: i.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002")
      return res.status(409).json({ error: "Ya existe un registro con ese valor" });
    if (err.code === "P2025")
      return res.status(404).json({ error: "No encontrado" });
    if (err.code === "P2003")
      return res.status(409).json({ error: "Hay registros relacionados" });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.status).json({ error: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
};