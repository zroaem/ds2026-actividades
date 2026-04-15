const numeros = [1, 4, 55, 73, 2, 567];

let suma = 0;
let maximo = numeros[0];
let minimo = numeros[0];

for(let i = 0; i< numeros.length; i++){
    suma += numeros[i];
    if(numeros[i] > maximo){
        maximo = numeros[i];
    }
    if(numeros[i] < minimo){
        minimo = numeros[i];
    }
}

const promedio = suma / numeros.length;

console.log(`numeros: ${numeros}`);
console.log(`suma: ${suma}`);
console.log(`promedio: ${promedio}`);
console.log(`maximo: ${maximo}`);
console.log(`minimo: ${minimo}`);

const generarAsteriscos = (n) => {
    let resultado = "";
    for(let j = 0; j < n; j++){
        resultado += "*";
    }
    return resultado;
}

console.log(generarAsteriscos(5));