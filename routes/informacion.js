// routes/informacion.js

// routes/informacion.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ OBTENER REGIONES ÚNICAS
router.get('/regiones', (req, res) => {
  const sql = "SELECT DISTINCT region FROM instituciones";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error DB:", err);
      return res.status(500).json({
        error: "Error en base de datos"
      });
    }

    res.json(results);
  });
});

module.exports = router;