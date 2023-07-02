
console.log("conectado.............")

var btnGuardarSimulacion = document.querySelector(".btn-guardar-simulacion");
var formGuardarSimulacion = document.querySelector(".formulario-guardar-simulacion");


var url = window.location.href;
var pathname = new URL(url).pathname;
var parts = pathname.split("/");
var idSimulation = parts[parts.length - 1];

console.log("idSimu: " + idSimulation)


btnGuardarSimulacion.addEventListener("click", (e) => {
    e.preventDefault();
    let formularioFinal = new FormData(formGuardarSimulacion);


    formularioFinal.set('idSimulation', idSimulation)


    // formularioFinal.set("lista",JSON.stringify({dato1 : 'holaMundo',dato2: 'hola mundo 2'}));

    let descripcionProductoServicio = [];

    let filasDescripcionProductoServicio = document.querySelectorAll('.fila-descripcion-producto-servico');

    filasDescripcionProductoServicio.forEach(element => {
        descripcionProductoServicio.push({
            nombre: element.querySelector('.nombre-producto-servico').value,
            proceso: element.querySelector('.proceso-elaboracion').value,
            caracteristicas: element.querySelector('.caracteristicas').value
        })
    });

    formularioFinal.set('filasDescripcionProductoServicio', JSON.stringify(descripcionProductoServicio));


    let capitalOperarivo = [];

    let filasTablasCapital = document.querySelectorAll(".fila-contenido-tabla-capital");

    let auxI = 0;
    filasTablasCapital.forEach(element => {
        let auxCantidad = element.querySelector('.input-cantidad').value
        let auxAportePropio = element.querySelector('.input-aporte-propio').value
        let auxSeInvertira = element.querySelector('.input-inversion').value
        capitalOperarivo.push({
            tipo: element.classList[1],
            cantidad: auxCantidad == "" ? '0' : auxCantidad,
            unidad: element.querySelector('.input-unidad').value,
            detalle: element.querySelector('.input-detalle').value,
            aportePropio: auxAportePropio == "" ? '0' : auxAportePropio,
            seInvertira: auxSeInvertira == "" ? '0' : auxSeInvertira,
            orden: auxI
        });
        auxI++
    });

    let auxAportePropioMnoObra = document.querySelector('.mano-obra-aporte-propio').value

    capitalOperarivo.push({
        tipo: "manoObra",
        cantidad: "1",
        unidad: "GLOBAL",
        detalle: "MANO DE OBRA DEL EMPRENDEDOR HASTA LA INSTALACION DEL NEGOCIO",
        aportePropio: auxAportePropioMnoObra == "" ? '0' : auxAportePropioMnoObra,
        seInvertira: "0",
        orden: auxI
    });


    formularioFinal.set('filasTablasCapital', JSON.stringify(capitalOperarivo));


    let costoProductoServicio = [];

    let filasCostoProductoServicio = document.querySelectorAll(".fila-costo-produto-servicio");

    filasCostoProductoServicio.forEach(element => {
        console.log(element);
        costoProductoServicio.push({
            productoServicio: element.querySelector('.productoServicio').value,
            tipo: element.querySelector('.tipoProductoServico').value,
            cantidad: element.querySelector('.cantidadProductoServicio').value,
            unidad: element.querySelector('.unidadProductoServicio').value,
            frecuencia: element.querySelector('.frecuenciaProductoServicio').value,
            precioCompra: element.querySelector('.precioCompra').value,
            precioVenta: element.querySelector('.precionVenta').value

        });
    });

    formularioFinal.set('filasCostoProductoServicio', JSON.stringify(costoProductoServicio));



    console.log(formularioFinal);
    fetch('simulation/save', {
        method: 'post',
        body: formularioFinal
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })

});