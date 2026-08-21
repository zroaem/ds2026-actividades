import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(_req: Request, res: Response) {
  try {
    const libros = await libroService.findAll();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const libro = await libroService.findById(id);

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    return res.json(libro);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevo = await libroService.create(req.body);
    return res.status(201).json(nuevo);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const actualizado = await libroService.update(id, req.body);
    if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
    return res.json(actualizado);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const ok = await libroService.remove(id);
    if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}