const  express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//variable que almacena la ruta donde se esta ejecutando el servidor
//para obtener la ubicacion del csv para realizar la carga masiva
global.pathActual = path.resolve(__dirname);
pathActual = path.join(pathActual, "/Base/DataCenterData.csv");

const servidor = express();

//configuracion del puerto 
servidor.set('port', process.env.PORT || 3000);

//middlewares
servidor.use(morgan('dev'));
servidor.use(express.json());

//enrutamiento
servidor.use("/", require('./Rutas/rutasGeneral'));

//verificacion del levantamiento del server
servidor.listen(servidor.get('port'), () => {
    console.log("simon aqui andamios en el puerto 3000");
});