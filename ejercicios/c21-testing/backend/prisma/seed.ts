// prisma/seed.ts
import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function seedUsuarios() {
  const passwordAdmin = await bcrypt.hash("admin1234", SALT_ROUNDS);
  const passwordCliente = await bcrypt.hash("cliente1234", SALT_ROUNDS);

  await prisma.usuario.upsert({
    where: { email: "admin@libreria.test" },
    update: {},
    create: {
      email: "admin@libreria.test",
      passwordHash: passwordAdmin,
      nombre: "Admin",
      rol: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: { email: "cliente@libreria.test" },
    update: {},
    create: {
      email: "cliente@libreria.test",
      passwordHash: passwordCliente,
      nombre: "Cliente",
      rol: "CLIENTE",
    },
  });

  console.log("Usuarios sembrados: admin@libreria.test / cliente@libreria.test");
}

const autores = [
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Franz Kafka", nacionalidad: "Chequia" },
];

const categorias = [
  { nombre: "Ficción" },
  { nombre: "Ensayo" },
  { nombre: "Clásico" },
];

const libros = [
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    mood: "reflexivo",
    imagen: "https://picsum.photos/seed/ficciones/400/600",
    sinopsis: "Cuentos que exploran laberintos e infinitos.",
    disponible: true,
    cats: ["Ficción", "Clásico"],
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    mood: "experimental",
    imagen: "https://picsum.photos/seed/rayuela/400/600",
    sinopsis: null,
    disponible: true,
    cats: ["Ficción"],
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    mood: "distópico",
    imagen: "https://picsum.photos/seed/1984/400/600",
    sinopsis: "Una sociedad bajo vigilancia total.",
    disponible: true,
    cats: ["Ficción", "Clásico"],
  },
  {
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    mood: "inquietante",
    imagen: "https://picsum.photos/seed/metamorfosis/400/600",
    sinopsis: null,
    disponible: true,
    cats: ["Clásico"],
  },
];

async function main() {
  for (const autor of autores) {
    await prisma.autor.upsert({
      where: { nombre: autor.nombre },
      update: autor,
      create: autor,
    });
  }

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: categoria,
      create: categoria,
    });
  }

  for (const { autor, cats, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({
      where: { titulo: datos.titulo, autor: { nombre: autor } },
    });

    const data = {
      ...datos,
      autor: { connect: { nombre: autor } },
      categorias: { connect: cats.map((nombre) => ({ nombre })) },
    };

    if (existente) {
      await prisma.libro.update({ where: { id: existente.id }, data });
    } else {
      await prisma.libro.create({ data });
    }
  }

  await seedUsuarios();
}

main()
  .then(() => console.log("Seed completado"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());