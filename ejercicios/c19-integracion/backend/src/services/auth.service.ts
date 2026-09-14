import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { RegistroInput } from "../validations/auth.validation";
import { UnauthorizedError } from "../utils/errors";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function registrar(datos: RegistroInput) {
  const passwordHash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  const usuario = await prisma.usuario.create({
    data: {
      email: datos.email,
      passwordHash,
      nombre: datos.nombre,
      // rol NO se manda acá: se deja que actúe el @default(CLIENTE) del schema
    },
  });

  return usuario;
}

export async function login(email: string, password: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    omit: { passwordHash: false },
  });

  if (!usuario) throw new UnauthorizedError();

  const passwordOk = await bcrypt.compare(password, usuario.passwordHash);
  if (!passwordOk) throw new UnauthorizedError();

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  return { token };
}