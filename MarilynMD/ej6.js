//6   Pregunta: Escribe un programa en Node.js  que reciba un argumento de línea de comandos  que represente  una ruta de archivo y verifique  si el archivo existe. Si existe, muestra  un mensaje  indicando que el archivo existe; de lo contrario,  muestra  un mensaje indicando que el archivo no existe.
const fs = require("fs"); //fs es un modulo que permite interactuar con el sistema de archivos

const filePath = process.argv[2]; //obtener la ruta de archivos en la terminal

//verifica que filePath es falsy o no
if (!filePath) {
  console.error("Hay que insertar una ruta para buscar");
  process.exit(1); //finaliza el programa e indica que hubo un error
}

//verifica si el archivo existe en la ruta y si se puede acceder al archivo en la ruta
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("No existe esta ruta de archivo");
  } else {
    console.log("Si existe la ruta de archivo");
  }
});
