//9   Pregunta: Escribe un programa en Node.js  que muestre por consola los nombres  de todos los archivos y directorios en el directorio actual.
const fs = require("fs"); //fs es un modulo que permite interactuar con el sistema de archivos, se esta importando

//readdir lee el contenido de "./" (el directorio actual) recibiendo 2 parametros para saber si hay un error o mostrar la lista solicitada
fs.readdir("./", (err, files) => {
  if (err) {
    console.error("No se pudo leer el directorio", err);
    process.exit(1);
  } else {
    console.log("Archivos y directorios en el directorio actual:");
    //se utiliza el forEach para iterar entre cada file para mas adelante mostrarlo en la terminal
    files.forEach((file) => {
      console.log(file);
    });
  }
});
