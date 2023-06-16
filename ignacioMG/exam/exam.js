// Paso 1: Importar los módulos necesarios
const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

// Paso 2: Crear la función asincrónica fetchPokemon
async function fetchPokemon(number) {
  if (number < 1 || number > 898) {
    throw new Error('Número de Pokémon inválido');
  }
  
  const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const response = await axios.get(url);
  return response.data;
}

// Paso 3: Mostrar el nombre y tipos del Pokémon
async function getPokemonInfo() {
  try {
    const pokemon = await fetchPokemon(25);
    const name = chalk.yellow(pokemon.name);
    const types = pokemon.types.map(type => chalk.yellow(type.type.name));
    
    console.log(`Nombre del pokemon: ${name}`);
    console.log(`Tipos de pokemons: ${types.join(', ')}`);
    
    const formattedPokemon = formatPokemon(pokemon.name, types);
    console.log(formattedPokemon);
  } catch (error) {
    console.log(error.message);
  }
}

// Paso 4: Crear la función formatPokemon
function formatPokemon(name, types) {
  if (!name || !types) {
    throw new Error('Datos de Pokémon incompletos');
  }
  
  const formattedName = chalk.yellow(name);
  const formattedTypes = types.map(type => chalk.yellow(type));
  
  if (formattedTypes.length === 1) {
    return `El Pokémon ${formattedName} es de tipo ${formattedTypes[0]}`;
  } else {
    return `El Pokémon ${formattedName} es de tipo ${formattedTypes[0]} y ${formattedTypes[1]}`;
  }
}

// Paso 5: Llamar a la función formatPokemon
getPokemonInfo();

// Paso 6: Leer el contenido de .txt
fs.readFile('datos.txt', 'utf8', (error, data) => {
  if (error) {
    console.log(`El archivo 'datos.txt' no existe`);
  } else {
    console.log(`Contenido del archivo:\n${data}`);
  }
});

// Paso 7: Escribir en un archivo
function writeToFile(message) {
  fs.writeFile('resultados.txt', message, 'utf8', (error) => {
    if (error) {
      throw new Error(`Error al escribir en el archivo 'resultados.txt'`);
    }
  });
}

// Paso 8: Llamar a la función writeToFile
try {
  writeToFile('Examen finalizado');
  console.log('Mensaje escrito correctamente en el archivo.');
} catch (error) {
  console.log(error.message);
}

//node ignacioMG/exam/exam.js