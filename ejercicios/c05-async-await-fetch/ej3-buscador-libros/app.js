"use strict";
async function buscarLibros(query) {
    const respuesta = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    return datos.docs;
}
async function main() {
    const inputBusqueda = document.querySelector("#inputBusqueda");
    const btnBuscar = document.querySelector("#btnBuscar");
    const resultados = document.querySelector("#resultados");
    const cargando = document.querySelector("#cargando");
    const error = document.querySelector("#error");
    btnBuscar.addEventListener("click", async () => {
        const query = inputBusqueda.value.trim();
        if (query === "") {
            error.style.display = "block";
            error.textContent = "El input no puede estar vacio";
            return;
        }
        error.style.display = "none";
        cargando.style.display = "block";
        resultados.innerHTML = "";
        try {
            const libros = await buscarLibros(query);
            cargando.style.display = "none";
            const primeros10 = libros.slice(0, 10);
            primeros10.forEach(Libro => {
                const divTarjeta = document.createElement("div");
                const autor = Libro.author_name ? Libro.author_name[0] : "Desconocido";
                const anio = Libro.first_publish_year ? Libro.first_publish_year : "Desconocido";
                divTarjeta.innerHTML = `<p><strong>${Libro.title}</strong></p><p>Autor: ${autor}</p><p>Año de publicación: ${anio}</p>`;
                resultados.appendChild(divTarjeta);
            });
        }
        catch (err) {
            cargando.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error al buscar los libros";
        }
    });
}
main();
