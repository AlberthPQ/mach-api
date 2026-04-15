// ==============================
// routes/informacion.js
// ==============================

const express = require('express');
const router = express.Router();
const db = require('../db');


// =====================================================
// 🌎 1. LISTAR REGIONES
// =====================================================
router.get('/regiones', async (req, res) => {

  try {

    const sql = `
      SELECT DISTINCT region
      FROM instituciones
      ORDER BY region
    `;

    const result = await db.query(sql);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error regiones:", error);

    res.status(500).json({
      error: "Error al obtener regiones"
    });
  }
});


// =====================================================
// 🎓 2. UNIVERSIDADES POR REGIÓN
// =====================================================
router.get('/universidades/:region', async (req, res) => {

  try {

    const region = decodeURIComponent(req.params.region);

    const sql = `
      SELECT 
        id_institucion,
        nombre,
        tipo,
        licenciamiento,
        pagina_web
      FROM instituciones
      WHERE region = $1
      ORDER BY nombre
    `;

    const result = await db.query(sql, [region]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error universidades:", error);

    res.status(500).json({
      error: "Error al obtener universidades"
    });
  }
});


// =====================================================
// 🎯 3. BECAS POR UNIVERSIDAD
// =====================================================
router.get('/becas/:universidad', async (req, res) => {

  try {

    const universidad = decodeURIComponent(req.params.universidad);

    const sql = `
      SELECT 
        b.id_beca,
        b.nombre,
        b.tipo,
        b.categoria,
        b.descripcion,
        i.nombre AS institucion
      FROM becas b
      JOIN institucion_beca ib 
        ON b.id_beca = ib.id_beca
      JOIN instituciones i 
        ON ib.id_institucion = i.id_institucion
      WHERE i.nombre = $1
      ORDER BY b.tipo, b.nombre
    `;

    const result = await db.query(sql, [universidad]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error becas:", error);

    res.status(500).json({
      error: "Error al obtener becas"
    });
  }
});


// =====================================================
module.exports = router;