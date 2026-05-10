async function buscarLibros(query) {
    const respuesta = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();
    return datos.docs;
}

async function iniciarBuscador() {
    const inputBusqueda = document.querySelector("#inputBusqueda");
    const btnBuscar = document.querySelector("#btnBuscar");
    const resultados = document.querySelector("#resultados");
    const cargando = document.querySelector("#cargando");
    const error = document.querySelector("#error");

    btnBuscar.addEventListener("click", async () => {
        const query = inputBusqueda.value.trim();

        if (query === "") {
            error.style.display = "block";
            error.textContent = "El input no puede estar vacío.";
            return;
        }

        error.style.display = "none";
        cargando.style.display = "block";
        resultados.innerHTML = "";

        try {
            const libros = await buscarLibros(query);
            cargando.style.display = "none";

            const primeros10 = libros.slice(0, 10);

            primeros10.forEach(libro => {
                const autor = libro.author_name ? libro.author_name[0] : "Desconocido";
                const anio = libro.first_publish_year ? libro.first_publish_year : "Desconocido";

                const col = document.createElement("div");
                col.className = "col";
                col.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title">${libro.title}</h6>
                            <p class="card-text text-muted small">${autor}</p>
                            <p class="card-text small">Año: ${anio}</p>
                            <a href="libro.html" class="mt-auto btn btn-outline-primary btn-sm">Ver más</a>
                        </div>
                    </div>
                `;
                resultados.appendChild(col);
            });

        } catch (err) {
            cargando.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error al buscar los libros.";
        }
    });
}

iniciarBuscador();