interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    const respuesta = await fetch("http://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok){
        throw new Error(`Error HTTP: ${respuesta.status}`);

    }

    const datos: Usuario[] = await respuesta.json();
    return datos;
}

async function main(): Promise<void> {
    const cargando = document.querySelector("#cargando") as HTMLParagraphElement;
    const error = document.querySelector("#error") as HTMLParagraphElement;
    const listado = document.querySelector("#listado") as HTMLUListElement;

    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} | ${usuario.email}`;
            listado.appendChild(li);
        });
    } catch (err) {
        cargando.style.display = "none";
        error.style.display = "block";
        error.textContent = "Ocurrio un error al cargar los usuarios."
    }
}

main();