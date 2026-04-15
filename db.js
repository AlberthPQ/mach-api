// archivo: db.js

const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.rbadfyeqxrpqlkufhwue.supabase.co',
  user: 'postgres',
  password: 'Gominol@_19961022',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log('✅ Conectado a Supabase PostgreSQL'))
  .catch(err => console.error('❌ Error conexión:', err));

module.exports = pool;