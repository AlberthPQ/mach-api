// ==============================
// routes/informacion.js
// ==============================

const express = require('express');
const router = express.Router();
const db = require('../db');


// =====================================================
// 🌎 1. REGIONES
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
// 🎓 2. INSTITUCIONES POR REGIÓN
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
        pagina_web,
        region
      FROM instituciones
      WHERE region = $1
      ORDER BY nombre
    `;

    const result = await db.query(sql, [region]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error instituciones:", error);

    res.status(500).json({
      error: "Error al obtener instituciones"
    });
  }
});


// =====================================================
// 🎯 3. BECAS POR INSTITUCIÓN (ID)
// =====================================================
router.get('/becas/:id', async (req, res) => {

  try {

    const id = req.params.id;

    const sql = `
      SELECT 
        b.id_beca,
        b.nombre,
        b.tipo,
        b.categoria,
        b.descripcion
      FROM becas b
      INNER JOIN institucion_beca ib 
        ON b.id_beca = ib.id_beca
      WHERE ib.id_institucion = $1
      ORDER BY b.tipo, b.nombre
    `;

    const result = await db.query(sql, [id]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error becas:", error);

    res.status(500).json({
      error: "Error al obtener becas"
    });
  }
});


// =====================================================
// 💰 4. COSTOS POR INSTITUCIÓN (ID)
// =====================================================
router.get('/costos/:id', async (req, res) => {

  try {

    const id = req.params.id;

    const sql = `
      SELECT 
        tipo_pago,
        monto,
        descripcion
      FROM costos_estudio
      WHERE id_institucion = $1
      ORDER BY tipo_pago
    `;

    const result = await db.query(sql, [id]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error costos:", error);

    res.status(500).json({
      error: "Error al obtener costos"
    });
  }
});


// =====================================================
// 🎓 5. MODALIDADES POR INSTITUCIÓN (ID)
// =====================================================
router.get('/modalidades/:id', async (req, res) => {

  try {

    const id = req.params.id;

    const sql = `
      SELECT 
        m.nombre,
        m.tipo
      FROM modalidades m
      INNER JOIN institucion_modalidad im
        ON m.id_modalidad = im.id_modalidad
      WHERE im.id_institucion = $1
      ORDER BY m.tipo, m.nombre
    `;

    const result = await db.query(sql, [id]);

    res.json(result.rows);

  } catch (error) {

    console.error("❌ Error modalidades:", error);

    res.status(500).json({
      error: "Error al obtener modalidades"
    });
  }
});


// =====================================================
module.exports = router;