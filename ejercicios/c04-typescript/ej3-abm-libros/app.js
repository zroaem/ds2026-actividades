"use strict";
const catalogo = [
    { isbn: "001", titulo: "Harry Potter y el cáliz de fuego", autor: "J.K. Rowling", precio: 20.99, disponible: true },
    { isbn: "002", titulo: "La Metamorfosis", autor: "Franz Kafka", precio: 12.99, disponible: false, genero: "Novela" },
    { isbn: "003", titulo: "1984", autor: "George Orwell", precio: 15, disponible: true, genero: "Distopía" },
    { isbn: "004", titulo: "La mano izquierda de la oscuridad", autor: "Ursula K. Le Guin", precio: 9.99, disponible: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    let suma = 0;
    for (const libro of libros) {
        suma += libro.precio;
    }
    return suma / libros.length;
}
function renderizar(libros) {
    const listado = document.querySelector("#listado");
    const stats = document.querySelector("#stats");
    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} - $${libro.precio} - ${libro.disponible ? "Disponible" : "No disponible"}`;
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            eliminarLibro(libro.isbn);
        });
        li.appendChild(btnEliminar);
        listado.appendChild(li);
    });
    const promedio = precioPromedio(libros);
    stats.textContent = `Cantidad: ${libros.length} | Promedio: $${promedio.toFixed(2)}`;
}
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    const index = catalogo.findIndex(libro => libro.isbn === isbn);
    if (index !== -1) {
        catalogo.splice(index, 1);
    }
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = document.querySelector("#inputTitulo").value.trim();
    const autor = document.querySelector("#inputAutor").value.trim();
    const precio = parseFloat(document.querySelector("#inputPrecio").value);
    const genero = document.querySelector("#inputGenero").value.trim();
    const disponible = document.querySelector("#inputDisponible").checked;
    const errorForm = document.querySelector("#errorForm");
    if (titulo === "" || autor === "" || isNaN(precio) || precio <= 0) {
        errorForm.textContent = "Titulo y autor son obligatorios, el precio debe ser un número mayor a 0";
        return null;
    }
    errorForm.textContent = "";
    const libro = {
        isbn: Date.now().toString(),
        titulo,
        autor,
        precio,
        disponible,
        genero: genero !== "" ? genero : undefined
    };
    return libro;
}
const btnAgregar = document.querySelector("#btnAgregar");
const btnFiltrar = document.querySelector("#filtrar");
const inputAutor = document.querySelector("#filtroAutor");
const btnDisponibles = document.querySelector("#mostrarDisponibles");
const btnTodos = document.querySelector("#mostrarTodos");
btnAgregar.addEventListener("click", () => {
    const libro = validarFormulario();
    if (libro === null)
        return;
    agregarLibro(libro);
    limpiarFormulario();
});
btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputAutor.value));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
function limpiarFormulario() {
    document.querySelector("#inputTitulo").value = "";
    document.querySelector("#inputAutor").value = "";
    document.querySelector("#inputPrecio").value = "";
    document.querySelector("#inputGenero").value = "";
    document.querySelector("#inputDisponible").checked = false;
}
renderizar(catalogo);
