// archivo: db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql3.freesqldatabase.com',
  user: 'sql3822649',
  password: 'RNIbEHkmK2',
  database: 'sql3822649',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión:', err);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

module.exports = connection;