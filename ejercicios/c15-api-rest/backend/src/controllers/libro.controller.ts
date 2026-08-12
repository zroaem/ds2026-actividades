import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(_req: Request, res: Response) {
  const libros = libroService.findAll();
  res.json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }

  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = libroService.update(id, req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = libroService.remove(id);
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}