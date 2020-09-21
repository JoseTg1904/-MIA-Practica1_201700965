const express = require('express');
const router = express.Router();

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
    res.json({msg:'hola soy la carga temporal c:'});
});

router.get('/cargarModelo', (req, res) => {
    res.json({msg:'hola soy la carga del modelo c:'});
});

//rutas de eliminacion
router.get('/eliminarTemporal', (req, res) => {
    res.json({msg:'hola soy la eliminacion del temporal c:'});
});

router.get('/eliminarModelo', (req, res) => {
    res.json({msg:'hola soy la eliminacion del modelo c:'});
});

module.exports = router;