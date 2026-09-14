import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(_req: Request, res: Response) {
  const libros = await libroService.findAll();
  res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = await libroService.findById(id);
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = await libroService.update(id, req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = await libroService.remove(id);
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}