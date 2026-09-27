import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(_req: Request, res: Response) {
  const categorias = await categoriaService.findAll();
  res.json(categorias);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const categoria = await categoriaService.findById(id);
  if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
  return res.json(categoria);
}

export async function create(req: Request, res: Response) {
  const nuevo = await categoriaService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const actualizado = await categoriaService.update(id, req.body);
  if (!actualizado) return res.status(404).json({ error: "Categoría no encontrada" });
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ok = await categoriaService.remove(id);
  if (!ok) return res.status(404).json({ error: "Categoría no encontrada" });
  return res.status(204).send();
}