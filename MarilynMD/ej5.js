//5 Pregunta: Escribe un programa en Node.js que establezca un código de salida personalizado y lo imprima por consola

function exitCode(code) {
  //code:
  console.log(`El codigo es: ${code}`);
  process.exit(code);
}

exitCode(42);
