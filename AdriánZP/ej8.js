const cadena = process.argv[2];
let cadenaInvertida = "";

for (let i = cadena.length - 1; i >= 0; i--) {
  cadenaInvertida += cadena[i];
}

console.log(cadenaInvertida);