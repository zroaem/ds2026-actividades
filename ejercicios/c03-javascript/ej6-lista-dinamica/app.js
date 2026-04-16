const input = document.querySelector("#producto");
const boton = document.querySelector("#agregar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");

const actualizarContador = () => {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
};

boton.addEventListener("click", () => {
    const nombre = input.value.trim();
    if(nombre === ""){
        contador.textContent = "ingrese un producto valido";
        return;
    }
    const item = document.createElement("li");
    item.textContent = nombre + " ";
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
        item.remove();
        actualizarContador();
    });
    item.appendChild(botonEliminar);
    lista.appendChild(item);
    input.value = "";
    actualizarContador();
});