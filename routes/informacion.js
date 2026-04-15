// routes/informacion.js

const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/regiones', async (req, res) => {

  try {

    const result = await db.query(
      "SELECT DISTINCT region FROM instituciones"
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Error al obtener regiones"
    });
  }
});


router.get('/universidades/:region', async (req, res) => {

  try {

    const { region } = req.params;

    const sql = `
      SELECT DISTINCT nombre, tipo, licenciamiento, pagina_web
      FROM instituciones
      WHERE region = $1
    `;

    const result = await db.query(sql, [region]);

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Error al obtener universidades"
    });
  }
});

module.exports = router;