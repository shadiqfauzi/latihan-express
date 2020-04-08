const mysql = require('mysql')

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'shadiq',
    password: 'root',
    database: 'hokihokibento',
    port: 3306
})

module.exports = db; 