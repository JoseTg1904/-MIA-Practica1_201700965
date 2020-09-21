const  express = require('express');
const morgan = require('morgan');
//const bodyParser = require('body-parser');

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