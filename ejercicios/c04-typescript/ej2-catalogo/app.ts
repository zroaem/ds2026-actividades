interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "001", titulo: "Harry Potter y el cáliz de fuego", autor: "J.K. Rowling", precio: 20.99, disponible: true },
    { isbn: "002", titulo: "La Metamorfosis", autor: "Franz Kafka", precio: 12.99, disponible: false, genero: "Novela" },
    { isbn: "003", titulo: "1984", autor: "George Orwell", precio: 15, disponible: true, genero: "Distopía" },
    { isbn: "004", titulo: "La mano izquierda de la oscuridad", autor: "Ursula K. Le Guin", precio: 9.99, disponible: true }
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => 
        libro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if(libros.length === 0) return 0;
    let suma: number = 0;
    for (const libro of libros) {
        suma += libro.precio;
    }
    return suma / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listado = document.querySelector("#listado") as HTMLUListElement;
    const stats = document.querySelector("#stats") as HTMLParagraphElement;

    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.disponible ? "Disponible" : "No disponible"}`;
        listado.appendChild(li);
    });

    const promedio = precioPromedio(libros);
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${promedio.toFixed(2)}`;
}

const btnFiltrar = document.querySelector("#filtrar") as HTMLButtonElement;
const inputAutor = document.querySelector("#filtroAutor") as HTMLInputElement;
const btnDisponibles = document.querySelector("#mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.querySelector("#mostrarTodos") as HTMLButtonElement;

btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputAutor.value));
});

btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);