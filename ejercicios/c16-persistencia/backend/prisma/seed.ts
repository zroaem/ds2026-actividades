import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "George Orwell", nacionalidad: "Reino Unido" },
  { nombre: "Franz Kafka", nacionalidad: "Chequia" }
];

async function main() {
  const creados = await prisma.autor.createMany({ data: autores });
  console.log(`Autores creados: ${creados.count}`);

  const todosLosAutores = await prisma.autor.findMany();
  const idPorNombre = new Map(todosLosAutores.map(a => [a.nombre, a.id]));

  const libros = [
    {
      titulo: "El Aleph",
      autorId: idPorNombre.get("Jorge Luis Borges")!,
      mood: "Mágico",
      imagen: "https://picsum.photos/300/400",
      sinopsis: "Un hombre descubre en el sótano de una casa un punto del espacio que contiene todos los puntos del universo."
    },
    {
      titulo: "Rayuela",
      autorId: idPorNombre.get("Julio Cortázar")!,
      mood: "Drama",
      imagen: "https://picsum.photos/301/400",
      sinopsis: "Horacio Oliveira busca a la Maga por las calles de París."
    },
    {
      titulo: "1984",
      autorId: idPorNombre.get("George Orwell")!,
      mood: "Misterio",
      imagen: "https://picsum.photos/302/400",
      sinopsis: "En un mundo donde el Gran Hermano todo lo ve, Winston Smith se atreve a pensar por su cuenta."
    },
    {
      titulo: "La Metamorfosis",
      autorId: idPorNombre.get("Franz Kafka")!,
      mood: "Drama",
      imagen: "https://picsum.photos/303/400",
      sinopsis: "Gregor Samsa amanece convertido en un insecto gigante."
    }
  ];

  await prisma.libro.createMany({ data: libros });
  console.log(`Libros creados: ${libros.length}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());