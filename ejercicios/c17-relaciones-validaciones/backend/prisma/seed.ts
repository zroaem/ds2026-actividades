// prisma/seed.ts
import { prisma } from "../src/config/prisma";

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
    imagen: "https://…",
    sinopsis: "Cuentos que exploran laberintos e infinitos.",
    disponible: true,
    cats: ["Ficción", "Clásico"],
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    mood: "experimental",
    imagen: "https://…",
    sinopsis: null,
    disponible: true,
    cats: ["Ficción"],
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    mood: "distópico",
    imagen: "https://…",
    sinopsis: "Una sociedad bajo vigilancia total.",
    disponible: true,
    cats: ["Ficción", "Clásico"],
  },
  {
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    mood: "inquietante",
    imagen: "https://…",
    sinopsis: null,
    disponible: true,
    cats: ["Clásico"],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main()
  .then(() => console.log("Seed completado"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());