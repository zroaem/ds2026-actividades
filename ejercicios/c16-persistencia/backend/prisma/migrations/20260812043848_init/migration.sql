-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autorId" INTEGER NOT NULL,
    "mood" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "sinopsis" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Autor_nombre_key" ON "Autor"("nombre");
