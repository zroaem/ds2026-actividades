import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { UnauthorizedError } from "../utils/errors";
import * as authService from "../services/auth.service";

export async function registrar(req: Request, res: Response) {
  const usuario = await authService.registrar(req.body);
  res.status(201).json(usuario);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const resultado = await authService.login(email, password);
  res.status(200).json(resultado);
}

export async function yo(req: Request, res: Response) {
  if (!req.usuario) throw new UnauthorizedError("Token requerido");

  const usuario = await prisma.usuario.findUniqueOrThrow({
    where: { id: req.usuario.id },
    select: { id: true, email: true, nombre: true, rol: true },
  });

  res.status(200).json(usuario);
}