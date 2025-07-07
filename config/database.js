const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // à adapter selon votre config
  password: '', // à adapter selon votre config
  database: 'kanban_db' // à créer dans MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    process.exit(1);
  }
  console.log('Connecté à MySQL');
});

module.exports = db; 