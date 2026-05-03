interface LibroOL{
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

async function buscarLibros (query: string): Promise<LibroOL[]>{
    const respuesta = await fetch(`https://openlibrary.org/search.json?q=${query}`)

    if(!respuesta.ok){
        throw new Error(`Error HTTP: ${respuesta.statusText}`)
    }

    const datos = await respuesta.json()
    return datos.docs
}

async function main(): Promise<void> {
    const inputBusqueda = document.querySelector("#inputBusqueda") as HTMLInputElement;
    const btnBuscar = document.querySelector("#btnBuscar") as HTMLButtonElement;
    const resultados = document.querySelector("#resultados") as HTMLDivElement;
    const cargando = document.querySelector("#cargando") as HTMLParagraphElement;
    const error = document.querySelector("#error") as HTMLParagraphElement;

    btnBuscar.addEventListener("click", async () => {
        const query = inputBusqueda.value.trim();

        if(query === ""){
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
        } catch (err) {
            cargando.style.display = "none";
            error.style.display = "block";
            error.textContent = "Error al buscar los libros";
        }
    });
}

main();