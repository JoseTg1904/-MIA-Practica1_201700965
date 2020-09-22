const express = require('express');
const router = express.Router();

const conexionBase = require('./conexionBase');

//rutas de consultas
router.get('/consulta1', (req, res) => {
    res.json({msg:'hola soy la consula 1 c:'});
});

router.get('/consulta2', (req, res) => {
    res.json({msg:'hola soy la consula 2 c:'});
});

router.get('/consulta3', (req, res) => {
    res.json({msg:'hola soy la consula 3 c:'});
});

router.get('/consulta4', (req, res) => {
    res.json({msg:'hola soy la consula 4 c:'});
});

router.get('/consulta5', (req, res) => {
    res.json({msg:'hola soy la consula 5 c:'});
});

router.get('/consulta6', (req, res) => {
    res.json({msg:'hola soy la consula 6 c:'});
});

router.get('/consulta7', (req, res) => {
    res.json({msg:'hola soy la consula 7 c:'});
});

router.get('/consulta8', (req, res) => {
    res.json({msg:'hola soy la consula 8 c:'});
});

router.get('/consulta9', (req, res) => {
    res.json({msg:'hola soy la consula 9 c:'});
});

router.get('/consulta10', (req, res) => {
    res.json({msg:'hola soy la consula 10 c:'});
});

//rutas de carga
router.get('/cargarTemporal', (req, res) => {
    var comando = "LOAD DATA LOCAL INFILE \'"+ pathActual + "\' INTO TABLE temporal COLUMNS TERMINATED BY \';\' LINES TERMINATED BY \'\n\' IGNORE 1 LINES;"
    if (conexionBase){
        conexionBase.query(comando)
        res.json({msg:'tabla temporal cargada c:'})
    }
});

router.get('/cargarModelo', (req, res) => {
    res.json({msg:'hola soy la carga del modelo c:'});
});

//rutas de eliminacion
router.get('/eliminarTemporal', (req, res) => {
    if (conexionBase){
        conexionBase.query('TRUNCATE TABLE temporal')
        res.json({msg:'tabla temporal limpiada'})
    }   
});

router.get('/eliminarModelo', (req, res) => {
    res.json({msg:'hola soy la eliminacion del modelo c:'});
});

module.exports = router;