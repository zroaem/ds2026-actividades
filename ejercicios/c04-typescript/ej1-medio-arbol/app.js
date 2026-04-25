"use strict";
const generarAsteriscos = (n) => {
    let resultado = "";
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            resultado += "*";
        }
        resultado += "\n";
    }
    return resultado;
};
const boton = document.querySelector("#boton");
const input = document.querySelector("#numero");
const salida = document.querySelector("#salida");
boton.addEventListener("click", () => {
    const valor = Number(input.value);
    if (input.value === "" || valor < 1) {
        salida.textContent = "Ingrese un número válido mayor o igual a 1.";
        return;
    }
    salida.textContent = generarAsteriscos(valor);
});
