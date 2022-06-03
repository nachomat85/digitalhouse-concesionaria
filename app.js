const autos = require('./autos');
const personaA = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 200000
    };
const concesionaria = {
    autos : autos,
    buscarAuto : function buscarAuto(patente){
        let filtro = this.autos.filter((auto) => auto.patente == patente)
        return filtro.length > 0 ? filtro[0] : null; },
    venderAuto : function venderAuto(patente){
        let autoAVender = this.buscarAuto(patente)
        autoAVender != null ? autoAVender.vendido = true : autoAVender;
        return autoAVender;
    },
    autosParaLaVenta : function autosParaLaVenta(){
        let listaAutosParaLaVenta = this.autos.filter((auto) => auto.vendido == false)
        return listaAutosParaLaVenta
    },
    autosNuevos : function autosNuevos(){
        let aLaVenta = this.autosParaLaVenta();
        return aLaVenta.filter((auto) => auto.km < 200)
    },
    listaDeVentas : function listaDeVentas(){
        let autosVendidos = this.autos.filter((auto) => auto.vendido == true)
        let listaDePreciosVenta = []
        autosVendidos.forEach(function (elemento){
            listaDePreciosVenta.push(elemento.precio)
        })
        return listaDePreciosVenta
    },
    totalDeVentas : function totalDeVentas(){
        let autosVendidos = this.listaDeVentas()
        return autosVendidos.length > 0 ? autosVendidos.reduce((total, precio) => total + precio) : 0;
    },
    puedeComprar : function puedeComprar(auto,persona){
        return auto.precio < persona.capacidadDePagoTotal && (auto.precio/auto.cuotas) < persona.capacidadDePagoEnCuotas
    },
    autosQuePuedeComprar : function autosQuePuedeComprar(persona){
        let autosDisponibles = this.autosParaLaVenta();
        return autosDisponibles.filter((elemento)=> concesionaria.puedeComprar(elemento, persona))
    }
};


console.log(concesionaria.buscarAuto('APL123'))
//console.log(concesionaria.autosParaLaVenta())
//console.log(concesionaria.venderAuto('APL123'))
//console.log(concesionaria.autosParaLaVenta())
console.log(concesionaria.listaDeVentas())
//console.log(concesionaria.totalDeVentas())
console.log(concesionaria.autosParaLaVenta())
//console.log(concesionaria.autosQuePuedeComprar(personaA))
console.log(concesionaria.venderAuto('APL123'))
console.log(concesionaria.autosParaLaVenta())
console.log(concesionaria.listaDeVentas())
console.log(concesionaria.venderAuto('JJK116'))
console.log(concesionaria.listaDeVentas())
console.log(concesionaria.autosParaLaVenta())
console.log(concesionaria.autos)

