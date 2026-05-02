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
    try {
        const usuarios = await obtenerUsuarios();
        usuarios.forEach(usuario => {
            console.log(`Nombre: ${usuario.name} | Email: ${usuario.email}`);
        });
    }
    catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}
main();
