import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  try{
    const autores = await autorService.findAll();
    res.json(autores);
  } catch(error){
    res.status(500).json({ error: "Error interno del servidor" });
  }  
}

export async function getById(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    const autor = await autorService.findById(id);
    if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(autor);
  } catch(error){
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function create(req: Request, res: Response) {
  try{
    const nuevo = await autorService.create(req.body);
    return res.status(201).json(nuevo);
  } catch(error){
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function update(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    const actualizado = await autorService.update(id, req.body);
    if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
    return res.json(actualizado);
  } catch(error){
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function remove(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    const ok = await autorService.remove(id);
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    return res.status(204).send();
  } catch(error){
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}