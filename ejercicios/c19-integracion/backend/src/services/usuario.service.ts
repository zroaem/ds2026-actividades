import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { Usuario } from "../types/usuario.types";
import { UsuarioCreate, UsuarioUpdate } from "../validations/usuario.validation";

const SALT_ROUNDS = 10;

export async function findAll(): Promise<Usuario[]> {
  return prisma.usuario.findMany();
}

export async function findById(id: number): Promise<Usuario | null> {
  return prisma.usuario.findUnique({ where: { id } });
}

export async function create(datos: UsuarioCreate): Promise<Usuario> {
  const { password, ...resto } = datos;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  return prisma.usuario.create({ data: { ...resto, passwordHash } });
}

export async function update(
  id: number,
  datos: UsuarioUpdate
): Promise<Usuario | null> {
  const existe = await prisma.usuario.findUnique({ where: { id } });
  if (!existe) return null;

  const { password, ...resto } = datos;
  const data = {
    ...resto,
    ...(password
      ? { passwordHash: await bcrypt.hash(password, SALT_ROUNDS) }
      : {}),
  };

  return prisma.usuario.update({ where: { id }, data });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.usuario.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.usuario.delete({ where: { id } });
  return true;
}