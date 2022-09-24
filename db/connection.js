const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Realmadrid1!',
    database: 'company'
});

module.exports = db;