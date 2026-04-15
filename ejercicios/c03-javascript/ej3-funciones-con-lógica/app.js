const calcularPrecioFinal = (monto, medioPago) => {
    if(monto < 200){
        return monto;
    }
    if(monto <= 400){
        if(medioPago === "E"){
            return monto * 0.70;
        } else if (medioPago === "D"){
            return monto * 0.80;
        } else if(medioPago === "C"){
            return monto * 0.90;
        }
    }
    
    return monto * 0.60;
}

const mostrarResultado = (monto, medioPago) => {
    const precioFinal = calcularPrecioFinal(monto, medioPago);
    console.log(`Monto: $${monto} | Pago: ${medioPago} | Final: $${precioFinal}`);
}

mostrarResultado(300, "E");
mostrarResultado(500, "D");
mostrarResultado(200, "C");
mostrarResultado(140, "C");
mostrarResultado(600, "E");
mostrarResultado(20, "D");
