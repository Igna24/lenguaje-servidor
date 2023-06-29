const http = require('http');
const fs = require('fs');
// Crear el servidor
const server = http.createServer((req, res) => {
  // Obtener la ruta solicitada por el cliente
  const url = req.url;
  // Manejar la ruta específica
  if (url === '/ruta-especifica' || url === "/" ) {
    // Leer el archivo HTML correspondiente a la ruta específica
    const htmlFile = fs.readFileSync('index.html', 'utf8');
    // Configurar las cabeceras de la respuesta
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    // Enviar el contenido del archivo HTML como respuesta
    res.end(htmlFile);
  } else {
    const noEncontradaHtmlFile = fs.readFileSync('noEncontrada.html', 'utf8')
    // Manejar otras rutas o devolver una respuesta por defecto
    res.statusCode = 404; // Status: Intetando buscar un elemento que no existe
    res.end(noEncontradaHtmlFile);
  }
});
// Escuchar en un puerto específico
const port = 3000;
server.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});