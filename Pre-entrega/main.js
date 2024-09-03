
const animales = ['perro', 'gato', 'pájaro', 'conejo', 'tortuga'];

function mostrarSaludo() {
    alert('¡Hola! Bienvenido a la aplicación de animales');
}

function solicitarNombreMostrarAnimales() {
    const nombreAnimal = prompt('Ingresa el nombre de un animal domestico:');
    if (animales.includes(nombreAnimal)) {
        const confirmacion = confirm('¿Deseas ver los nombres de los animales?');
        if (confirmacion) {
            console.log('Los nombres de los animales son: ');
            for (let i = 0; i < animales.length; i++) {
                console.log(i + 1 + '. ' + animales[i]);
            }
            alert('Los nombres de los animales son: ' + animales.join(', '));
        } else {
            alert('Has cancelado la visualización de los nombres de los animales');
        }
    } else {
        alert('El animal ingresado no está en la lista');
    }
}

mostrarSaludo();

solicitarNombreMostrarAnimales();
