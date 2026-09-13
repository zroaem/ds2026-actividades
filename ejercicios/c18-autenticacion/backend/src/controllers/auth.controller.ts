import { Request, Response } from "express";
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
  res.status(200).json(req.usuario);
}