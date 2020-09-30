const base = require('mysql')

var conexion = base.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '1234root',
    database: 'basePractica1'
});

conexion.connect( (error) => {
    if (error){
        throw error;
    }else{
        console.log("simon si me conecte")
    }
});

module.exports = conexion;
 