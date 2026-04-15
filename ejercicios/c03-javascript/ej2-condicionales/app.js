function diaDeLaSemana(numero){
    switch(numero){
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado (fin de semana)";
        case 7:
            return "Domingo (fin de semana)";
        default:
            return "Día inválido";
    }
}

const clasificarNota = (nota) =>{
    if(nota < 4 && nota >= 0){
        return "Desaprobado";
    }
    if(nota <= 7){
        return "Aprobado";
    }
    if(nota <= 10){
        return "Promocionado";
    }
    else{
        return "Nota inválida";
    }
};
//el enunciado no especifica que se deba manejar notas menores a 0 o mayores a 10
//lo inclui ya que me parecia el manejo correcto del caso

console.log(diaDeLaSemana(1));
console.log(diaDeLaSemana(3));
console.log(diaDeLaSemana(7));
console.log(diaDeLaSemana(12));
console.log(diaDeLaSemana(-9));

console.log(clasificarNota(3));
console.log(clasificarNota(6));
console.log(clasificarNota(8));
console.log(clasificarNota(10));
console.log(clasificarNota(33));

