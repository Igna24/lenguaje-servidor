// Pregunta: Escribe un programa en Node.js  que solicite al usuario ingresar un número entero desde  la entrada estándar y verifique
//  si el número  es par o impar. Luego,  muestra un mensaje  indicando si el número  es par o impar.

// Importar el módulo readline para leer la entrada del usuario
const readline = require('readline');

// Crea una interfaz para leer desde la entrada estándar (stdin) y escribir en la salida estándar (stdout)
const rl2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pregunta al usuario que ingrese un número entero
rl2.question('Ingrese un número entero: ', (input) => {
  // Convierte el valor ingresado a un número entero utilizando la función parseInt
  const number = parseInt(input);

  // Verifica si el valor ingresado no es un número válido
  if (isNaN(number)) {
    console.log('El valor ingresado no es un número entero válido.');
  } else {
    // Verifica si el número es par o impar utilizando el operador de módulo (%)
    if (number % 2 === 0) {
      console.log(`El número ${number} es par.`);
    } else {
      console.log(`El número ${number} es impar.`);
    }
  }

  // Cierra la interfaz de lectura
  rl2.close();
});
