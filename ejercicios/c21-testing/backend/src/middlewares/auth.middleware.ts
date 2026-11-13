import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token requerido");
  }

  const token = header.slice(7); // saca el "Bearer " de adelante

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; rol: string };
    req.usuario = payload;
    next();
  } catch {
    throw new UnauthorizedError("Token inválido o expirado");
  }
}

export function authorize(...rolesPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      throw new ForbiddenError();
    }
    next();
  };
}