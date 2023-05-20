// Pregunta: Escribe un programa en Node.js  que muestre por consola la información  de uso de CPU del sistema, incluyendo  el promedio 
//  de uso de CPU en los últimos 1, 5 y 15 minutos.

// Importar el módulo os para obtener información del sistema operativo
const os = require('os');

// Función para calcular el promedio del uso de CPU
const cpuAverage = () => {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  // Iterar sobre cada CPU y sumar los tiempos de CPU
  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  // Calcular los promedios
  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;

  return {
    idle: idle,
    total: total
  };
};

// Función para calcular el uso de CPU en intervalos regulares
const calculateCpuUsage = (intervalSeconds) => {
  setInterval(() => {
    const startMeasure = cpuAverage();
    setTimeout(() => {
      const endMeasure = cpuAverage();

      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;

      const percentageCpu = 100 - Math.floor((100 * idleDifference) / totalDifference);

      console.log(`CPU Usage in the last ${intervalSeconds} second(s): ${percentageCpu.toFixed(2)}%`);
    }, intervalSeconds * 1000); // Convertir los segundos en milisegundos
  }, intervalSeconds * 1000); // Convertir los segundos en milisegundos
};

// Calcular el uso de CPU en el último minuto
calculateCpuUsage(60);

// Calcular el uso de CPU en los últimos 15 minutos
calculateCpuUsage(900);

// Detener la ejecución después de 5 minutos
setTimeout(() => {
  console.log('Programa finalizado.');
  process.exit(); // Terminar la ejecución del programa
}, 3 * 60 * 1000); // Convertir los minutos en milisegundos

