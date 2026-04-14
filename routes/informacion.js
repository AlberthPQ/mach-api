// routes/informacion.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ endpoint correcto
router.get('/regiones', (req, res) => {
  const sql = "SELECT DISTINCT region FROM instituciones";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error DB:", err);
      return res.status(500).json({ error: "Error al obtener regiones" });
    }

    res.json(results);
  });
});

// 🔥 UNIVERSIDADES POR REGIÓN
router.get('/universidades/:region', (req, res) => {
  const { region } = req.params;

  const sql = `
    SELECT DISTINCT nombre, tipo, licenciamiento, pagina_web
    FROM instituciones
    WHERE region = ?
  `;

  db.query(sql, [region], (err, results) => {
    if (err) {
      console.error("❌ Error DB:", err);
      return res.status(500).json({ error: "Error al obtener universidades" });
    }

    res.json(results);
  });
});

module.exports = router;