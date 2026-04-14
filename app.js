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

app.use('/usuarios', usuariosRoutes);
app.use('/riasec', riasecRoutes); // 👈 importante

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});