// Importar las dependencias necesarias
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3000;
const MONGODB_URI = ''; // URL de la base de datos MongoDB

// Configuración del middleware para parsear datos en formato JSON y URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html', 'htm', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'json'],
}));

// Conexión a MongoDB y inicio del servidor
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Definición del esquema de la colección "Carta" en MongoDB
const cartaSchema = new mongoose.Schema({
  tipo: String,
  nombre: String,
  descripcion: String,
  puntosBatalla: Number,
});

// Creación del modelo "Carta" basado en el esquema definido
const Carta = mongoose.model('Carta', cartaSchema);

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todas las cartas desde la base de datos
app.get('/cartas', async (req, res) => {
  try {
    const cartas = await Carta.find();
    res.json(cartas);
  } catch (error) {
    console.log('Error al obtener la lista de cartas:', error);
    res.status(500).json({ error: 'Error al obtener la lista de cartas' });
  }
});

// Ruta para agregar una nueva carta a la base de datos
app.post('/cartas', async (req, res) => {
  try {
    const nuevaCarta = new Carta(req.body);
    await nuevaCarta.save();
    res.sendStatus(200);
  } catch (error) {
    console.log('Error al registrar la carta', error);
    res.status(500).json({ error: 'Error al registrar la carta' });
  }
});

// Ruta para editar una carta existente en la base de datos
app.put('/cartas/:id', async (req, res) => {
  try {
    const cartaId = req.params.id;
    const cartaEditada = req.body;
    await Carta.findByIdAndUpdate(cartaId, cartaEditada);
    res.sendStatus(200);
  } catch (error) {
    console.log('Error al editar la carta', error);
    res.status(500).json({ error: 'Error al editar la carta' });
  }
});

// Ruta para eliminar una carta existente de la base de datos
app.delete('/cartas/:id', async (req, res) => {
  try {
    const cartaId = req.params.id;
    await Carta.findByIdAndDelete(cartaId);
    res.sendStatus(200);
  } catch (error) {
    console.log('Error al eliminar la carta', error);
    res.status(500).json({ error: 'Error al eliminar la carta' });
  }
});

// Ruta para buscar cartas por nombre o tipo
app.post('/cartas/search', async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm.toLowerCase();
    const resultados = await Carta.find({
      $or: [
        { nombre: { $regex: searchTerm, $options: 'i' } },
        { tipo: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    res.json(resultados);
  } catch (error) {
    console.log('Error al buscar cartas:', error);
    res.status(500).json({ error: 'Error al buscar cartas' });
  }
});
