// routes/riasec.js

const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/match_riasec', async (req, res) => {

  try {

    const dim1 = req.query.dim1;

    if (!dim1) {
      return res.status(400).json({
        error: "dim1 requerido"
      });
    }

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
      WHERE rm.dim1 = $1
      LIMIT 50
    `;

    const result = await db.query(sql, [dim1]);

    res.json(result.rows);

  } catch (err) {

    console.error("❌ DB error:", err);

    res.status(500).json({
      error: "Error base de datos"
    });
  }
});

module.exports = router;