//2 Pregunta: Escribe un programa en Node.js que muestre las variables de entorno del sistema por consola

const process = require("process"); //obtener el modulo process

const sistemVariables = process.env; //obtener las variables del sistema

console.log("Variables de Entorno del sistema", sistemVariables); //Mostrar las variables
