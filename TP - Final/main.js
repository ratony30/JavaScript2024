
const listaProductos = document.getElementById('lista-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const cotizarBtn = document.getElementById('cotizar');
const cotizacionSection = document.getElementById('cotizacion');


let animales;
let carrito = [];


fetch('data.json')
  .then(response => response.json())
  .then(data => {
    animales = data; 
    mostrarAnimales(animales);
    cargarCarrito();
  })
  .catch(error => {
    console.error('Error al cargar los animales:', error);
  });


function mostrarAnimales(animales) {
  animales.forEach(animal => {
    const animalElement = `
      <div class="animal" data-id="${animal.id}">
        <img src="${animal.imagen}" alt="${animal.nombre}"> 
        <h3>${animal.nombre}</h3>
        <p>Precio: $${animal.precio}</p>
        <p>${animal.descripcion}</p>
        <button class="agregar-carrito">Agregar al Carrito</button>
      </div>
    `;
    listaProductos.innerHTML += animalElement;
  });


  listaProductos.addEventListener('click', function(event) {
    if (event.target.classList.contains('agregar-carrito')) {
      const animalId = parseInt(event.target.closest('.animal').dataset.id);
      const animal = obtenerAnimalPorId(animalId);

      if (animal) {
        carrito.push(animal);
        actualizarCarrito();
        guardarCarrito();
      }
    }
  });
}


function obtenerAnimalPorId(id) {
  const animal = animales.find(a => a.id === id);
  return animal;
}


function actualizarCarrito() {
  listaCarrito.innerHTML = '';

  carrito.forEach(animal => {
    const animalElement = `
      <div class="animal-carrito" data-id="${animal.id}">
        <img src="${animal.imagen}" alt="${animal.nombre}">
        <h3>${animal.nombre}</h3>
        <p>Precio: $${animal.precio}</p>
        <button class="eliminar-carrito">Eliminar</button>
      </div>
    `;
    listaCarrito.innerHTML += animalElement;
  });

  const total = calcularTotalCarrito();
  totalCarrito.textContent = `Total: $${total}`;

  
  listaCarrito.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar-carrito')) {
      const animalId = parseInt(event.target.closest('.animal-carrito').dataset.id);
      carrito = carrito.filter(animal => animal.id !== animalId);
      actualizarCarrito();
      guardarCarrito();
    }
  });
}


function calcularTotalCarrito() {
  let total = 0;
  carrito.forEach(animal => {
    total += animal.precio;
  });
  return total;
}


function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  localStorage.removeItem('carrito');
}


function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function cargarCarrito() {
  const carritoStorage = localStorage.getItem('carrito');
  if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
    actualizarCarrito();
  }
}


vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
cotizarBtn.addEventListener('click', cotizar);


function cotizar() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Agrega animales para cotizar.');
    return;
  }

  cotizacionSection.innerHTML = `
    <h2>Confirma tu Compra de Animales</h2>
    <form id="formulario-cotizacion">
      <label for="nombre">Nombre y Apellido:</label>
      <input type="text" id="nombre" name="nombre" value="Homero Simpson" required>
      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" name="email" value="homerosimpon@gmail.com" required>
      <label for="direccion">Dirección:</label>
      <input type="text" id="direccion" name="direccion" value="Siempreviva 123" required>
      <label for="telefono">Teléfono:</label>
      <input type="tel" id="telefono" name="telefono" value="3706-808022" required>
      <button type="submit">Comprar</button>
    </form>
  `;

  const formularioCotizacion = document.getElementById('formulario-cotizacion');
  formularioCotizacion.addEventListener('submit', enviarCotizacion);
}

function enviarCotizacion(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;

  alert(`¡Gracias ${nombre} por tu compra! Tus animales te llegarán a tu domicilio!`);
  vaciarCarrito();
  cotizacionSection.innerHTML = '';

  agregarCotizacionAlHistorial(nombre, email, direccion, telefono, carrito);
}


function agregarCotizacionAlHistorial(nombre, email, direccion, telefono, carrito) {

}
