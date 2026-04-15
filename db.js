// archivo: db.js

const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-1-sa-east-1.pooler.supabase.com',
  user: 'postgres.rbadfyeqxrpqlkufhwue',
  password: 'Gominol@_19961022',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// probar conexión
pool.connect()
  .then(() => console.log('✅ Conectado a Supabase PostgreSQL'))
  .catch(err => console.error('❌ Error conexión:', err));

module.exports = pool;