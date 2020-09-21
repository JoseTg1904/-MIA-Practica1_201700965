const base = require('mysql')

connection = base.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root',
    database: 'basePractica1'
});

let acciones = {};

module.exports = acciones;