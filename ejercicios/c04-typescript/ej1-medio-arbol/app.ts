const generarAsteriscos = (n: number): string => {
    let resultado : string = "";
    for(let i = 0; i<n; i++){
        for(let j = 0; j <= i; j++){
            resultado += "*";
        }
        resultado += "\n";
    }
    return resultado;
}

const boton = document.querySelector("#boton") as HTMLButtonElement;
const input = document.querySelector("#numero") as HTMLInputElement;
const salida = document.querySelector("#salida") as HTMLElement;

boton.addEventListener("click", () => {
    const valor : number = Number(input.value);
    if (input.value === "" || valor < 1) {
        salida.textContent = "Ingrese un número válido mayor o igual a 1.";
        return;
    }
    salida.textContent = generarAsteriscos(valor);
});