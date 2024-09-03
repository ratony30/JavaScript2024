/* let computadora = { 

    marca: "lenovo",
    ram: 32,
    procesador: "ryzen 7",

}


console.log (computadora.marca)

computadora.ram = 16 */

/* ULTIMA ENTREGA---

function Producto(id, nombre, importe, stock) {
    this.id = id
    this.nombre = nombre
    this.importe = importe
    this.stock = stock
    this.arrancar = function(){
        console.log (`el coche ${this.nombre} está endendido`)
    }

}


let computadora = new Producto(01, "lenovo", 2700000, 5)

console.log(computadora.arrancar())

localStorage.setItem("bienvenida", "bienvenidos a la clase")

let mensaje = localStorage.getItem("bienvenida")

alert(mensaje)*/



let productos = [ 
    { id: 1, nombre: 'Chimpance Africano', importe: 2300000 },
    { id: 2, nombre: 'Tortuga Australiana', importe: 1500000 },
    { id: 3, nombre: 'Rinoceronte Plateado', importe: 110000 },
];

let carrito = [];
let total = 0;


const productosLista = document.getElementById('productos-lista');
const carritoLista = document.getElementById('carrito-lista');
const totalElemento = document.getElementById('total');


function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    mostrarCarrito();
    calcularTotal();
    guardarCarritoEnLocalStorage();
}



function mostrarCarrito() {
    carritoLista.innerHTML = '';
    carrito.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} x ${producto.cantidad}`;
        carritoLista.appendChild(li);
    });
}



function calcularTotal() {
    total = carrito.reduce((acc, producto) => acc + producto.importe * producto.cantidad, 0);
    totalElemento.textContent = total;
}



function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}



productosLista.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const id = parseInt(event.target.dataset.id);
        const productoSeleccionado = productos.find((producto) => producto.id === id);
        if (productoSeleccionado) {
            agregarAlCarrito(productoSeleccionado);
        }
    }
});