import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export function getAll(_req: Request, res: Response) {
  res.json(autorService.findAll());
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const autor = autorService.findById(id);
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(autor);
}

export function create(req: Request, res: Response) {
  const nuevo = autorService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = autorService.update(id, req.body);
  if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = autorService.remove(id);
  if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
  return res.status(204).send();
}