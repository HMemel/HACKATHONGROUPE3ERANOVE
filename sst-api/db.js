// db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '217.76.50.150',
  user: 'sst',
  password: 'HackathonWmbi062024#',
  database: 'bd_sst_new',
  port: 5001 // Port de connexion à la base de données
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;
