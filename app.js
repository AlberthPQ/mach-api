// archivo: app.js

const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
const usuariosRoutes = require('./routes/usuarios');
const riasecRoutes = require('./routes/riasec');
const informacionRoutes = require('./routes/informacion');

app.use('/usuarios', usuariosRoutes);
app.use('/riasec', riasecRoutes); // 👈 importante
app.use('/informacion', informacionRoutes);

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});