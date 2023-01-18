const ingresos=[
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500.00)
];

const egresos=[
    new Egreso('Alquiler', 900.00),
    new Egreso('Ropa', 400.00)
];

function cargarApp(){
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
} 

function totalIngresos(){
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

function totalEgresos(){
    let totalEgresos=0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

function cargarCabecero(){
    let presupuesto= totalIngresos() - totalEgresos();
    let porcentajeEgresos= totalEgresos()/totalIngresos();

    document.getElementById('PresupuestoTotal').innerHTML=formatoMoneda(presupuesto);
    document.getElementById('Porcentaje').innerHTML=formatoPorcentaje(porcentajeEgresos);
    document.getElementById('IngresosTotal').innerHTML=formatoMoneda(totalIngresos());
    document.getElementById('EgresosTotales').innerHTML=formatoMoneda(totalEgresos());
}

function formatoMoneda(valor){
    return valor.toLocaleString('es-GT', {style:'currency', currency:'GTQ', minimumFractionDigits:2});
}

function formatoPorcentaje(valor){
    return valor.toLocaleString('es-GT', {style:'percent', minimumFractionDigits:2});
}

function cargarIngresos(){
    let ingresosHTML='';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('listaIngresos').innerHTML=ingresosHTML;
}

function cargarEgresos(){
    let egresosHTML='';
    for(let egreso of egresos){
        egresosHTML +=crearEgresosHTML(egreso);
    }
    document.getElementById('listaEgresos').innerHTML=egresosHTML
}

function crearIngresoHTML(ingreso){
    let ingresosHTML=  `                <div class="elemento limpiarEstilos">
    <article class="elemento_descripcion">${ingreso.descripcion}</article>
    <section class="derecha limpiarEstilos">
        <article class="elemento_valor">${formatoMoneda(ingreso.valor)}</article>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline"
                onclick="eliminarIngreso(${ingreso.id})"
                ></ion-icon>
            </button>
        </div>
    </section>
</div> ` 
    return ingresosHTML;

}

 function eliminarIngreso(id){
    let indiceEliminar=ingresos.findIndex(ingreso=>{ingreso.id == id});
// con la funcion findIndex lo que hacemos es encontrar el indice del objeto que estamos buscando.
    ingresos.splice(indiceEliminar, 1); 
// por medio de la funcion splice indicamos cual es el indice a eliminar y solamente se eliminara un objeto.
    cargarCabecero();
    cargarIngresos();
 }

function crearEgresosHTML(egresos){
    let egresosHTML=` <div class="elemento limpiarEstilos">
    <article class="elemento_descripcion">${egresos.descripcion}</article>
    <section class="derecha limpiarEstilos">
        <article class="elemento_valor">${formatoMoneda(egresos.valor)}</article>
        <article class="elemento_porcentaje">${formatoPorcentaje(egresos.valor/totalEgresos())}</article>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="trash-outline" onclick="eliminarEgresos(${egresos.id})"> </ion-icon>
            </button>
        </div>
    </section>
</div>`
    return egresosHTML;
}

function eliminarEgresos(id){
    let indiceEliminar=egresos.findIndex(egresos=>{egresos.id == id});
// con la funcion findIndex lo que hacemos es encontrar el indice del objeto que estamos buscando.
    egresos.splice(indiceEliminar, 1); 
// por medio de la funcion splice indicamos cual es el indice a eliminar y solamente se eliminara un objeto.
    cargarCabecero();
    cargarEgresos();
}

function agregarDato(){
    let forma= document.forms['forma'];
    let tipo= forma['tipo'];
    let descripcion= forma['descripcion'];
    let valor= forma['valor'];

    if(descripcion.value !=='' && valor.value !==''){
        if(tipo.value=='ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));//el + es una sintaxis simplificada que convierte una cadena a un valor numerico.
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value=='egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}



