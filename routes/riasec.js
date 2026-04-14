// routes/riasec.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔥 MATCH RIASEC
router.get('/match_riasec', (req, res) => {
  const dim1 = req.query.dim1;

  // 🔴 VALIDACIÓN CRÍTICA
  if (!dim1 || typeof dim1 !== 'string') {
    return res.status(400).json({
      error: "dim1 es requerido y debe ser un string válido"
    });
  }

  console.log("📩 dim1 recibido:", dim1);

  const sql = `
    SELECT 
        c.nombre AS nombre_carrera,
        i.nombre AS nombre_institucion,
        i.tipo,
        i.licenciamiento,
        i.pagina_web,
        i.region
    FROM riasec_match rm
    INNER JOIN carreras c ON rm.id_carrera = c.id_carrera
    INNER JOIN institucion_carrera ic ON c.id_carrera = ic.id_carrera
    INNER JOIN instituciones i ON ic.id_institucion = i.id_institucion
    WHERE rm.dim1 = ?
    LIMIT 50
  `;

  // 🔥 QUERY CON CONTROL DE ERROR
  db.query(sql, [dim1], (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);

      return res.status(500).json({
        error: "Error en base de datos",
        detail: err.message
      });
    }

    // 🔴 SEGURIDAD: siempre devolver array
    if (!results || results.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(results);
  });
});

module.exports = router;