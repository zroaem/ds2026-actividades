import { Request, Response } from "express";
import * as usuarioService from "../services/usuario.service";

export async function getAll(_req: Request, res: Response) {
  const usuarios = await usuarioService.findAll();
  res.json(usuarios);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const usuario = await usuarioService.findById(id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  return res.json(usuario);
}

export async function create(req: Request, res: Response) {
  const nuevo = await usuarioService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = await usuarioService.update(id, req.body);
  if (!actualizado) return res.status(404).json({ error: "Usuario no encontrado" });
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = await usuarioService.remove(id);
  if (!ok) return res.status(404).json({ error: "Usuario no encontrado" });
  return res.status(204).send();
}