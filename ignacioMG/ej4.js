// Pregunta: Escribe un programa en Node.js que lea una línea de texto desde la entrada estándar (stdin) y la muestre en la salida estándar (stdout).

// Importar el módulo readline para leer la entrada del usuario
const readline = require('readline');

// Crear una interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,  // Establecer la entrada estándar como fuente de entrada
  output: process.stdout  // Establecer la salida estándar como destino de salida
});

// Preguntar al usuario que ingrese una palabra y recibir la entrada
rl.question('Ingresa la palabra: ', function(word) {
  // Mostrar el mensaje seguido de la palabra ingresada por el usuario
  console.log('La palabra ingresada fue: ' + word);
  // Cerrar la interfaz de readline, terminando la ejecución del programa
  rl.close();
});

