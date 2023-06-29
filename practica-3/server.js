const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url.slice(1);

  if (url === "") {
    sendResponse(res, "index.html", "text/html");
  } else if (url.endsWith(".html")) {
    sendResponse(res, url, "text/html");
  } else if (url.endsWith(".css")) {
    sendResponse(res, url, "text/css");
  } else {
    sendResponse(res, "404.html", "text/html", 404);
  }
});

const sendResponse = (res, filename, contentType, statusCode = 200) => {
  const filePath = path.join(__dirname, filename);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Error interno del servidor");
    } else {
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.end(content);
    }
  });
};

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
