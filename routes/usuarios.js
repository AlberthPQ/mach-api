// archivo: usuarios.js

const express = require('express');
const router = express.Router();
const db = require('../db');


// ✅ CREAR USUARIO
router.post('/', (req, res) => {
  const {
    nombre,
    apellido,
    email,
    password,
    genero,
    grado,
    nacimiento,
    ubicacion
  } = req.body;

  const sql = `
    INSERT INTO usuarios 
    (nombre, apellido, email, password, genero, grado, nacimiento, ubicacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, apellido, email, password, genero, grado, nacimiento, ubicacion],
    (err, result) => {
      if (err) {
        console.error('❌ Error al insertar:', err);
        return res.status(500).json({ error: 'Error al guardar usuario' });
      }

      res.json({
        mensaje: '✅ Usuario guardado correctamente',
        id: result.insertId
      });
    }
  );
});


// ✅ LOGIN (CORREGIDO)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length > 0) {
      res.json({
        mensaje: 'Login correcto',
        id: results[0].id
      });
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
  });
});


// ✅ 🔥 NUEVO ENDPOINT (CLAVE DEL PROBLEMA)
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT nombre FROM usuarios WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener usuario' });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  });
});


// ✅ LISTAR USUARIOS
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }

    res.json(results);
  });
});

module.exports = router;