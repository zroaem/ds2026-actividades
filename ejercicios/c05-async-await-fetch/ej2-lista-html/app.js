"use strict";
async function obtenerUsuarios() {
    const respuesta = await fetch("http://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
}
async function main() {
    const cargando = document.querySelector("#cargando");
    const error = document.querySelector("#error");
    const listado = document.querySelector("#listado");
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} | ${usuario.email}`;
            listado.appendChild(li);
        });
    }
    catch (err) {
        cargando.style.display = "none";
        error.style.display = "block";
        error.textContent = "Ocurrio un error al cargar los usuarios.";
    }
}
main();
