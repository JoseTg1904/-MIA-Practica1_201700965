const express = require('express');
const { query } = require('./conexionBase');
const conexion = require('./conexionBase');
const router = express.Router();

const conexionBase = require('./conexionBase');

//rutas de reporte
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
    var comando = "LOAD DATA LOCAL INFILE \'"+ pathActual + "\' \
    INTO TABLE Temporal COLUMNS TERMINATED BY \';\' LINES TERMINATED BY \'\n\' IGNORE 1 LINES \
    (nombre_compania, contacto_compania, correo_compania, telefono_compania, tipo, nombre, \
    correo, telefono, @fechaCasteada, direccion, ciudad, codigo_postal, region, producto, \
    categoria_producto, cantidad, precio_unitario) \
    SET fecha_registro = STR_TO_DATE(@fechaCasteada, \'%d/%m/%y\')";
    if (conexionBase){
        conexionBase.query(comando)
        res.json({msg:'tabla temporal cargada c:'})
    }
});

router.get('/cargarModelo', (req, res) => {
    if (conexionBase){
        //llenado de las compañias desde la tabla temporal
        conexionBase.query("INSERT INTO Compania (nombre, contacto, correo, telefono) \
        SELECT DISTINCT nombre_compania, contacto_compania, correo_compania, telefono_compania \
        FROM Temporal \
        GROUP BY nombre_compania, contacto_compania, correo_compania, telefono_compania;")  

        //llenado de las regiones
        conexionBase.query("INSERT INTO Region (nombreRegion) \
        SELECT DISTINCT region from Temporal \
        GROUP BY region;")

        //llenado de los tipos de usuarios
        conexionBase.query("INSERT INTO Tipo_usuario (tipoUsuario) VALUES (\"P\"), (\"C\");")
    
        //llenado de las categorias de los productos
        conexionBase.query("INSERT INTO Categoria_producto (categoriaProducto) \
        SELECT DISTINCT categoria_producto FROM Temporal \
        GROUP BY categoria_producto;")

        //llenando de las ciudades
        conexionBase.query("INSERT INTO Ciudad (nombreCiudad, ID_Region) \
        SELECT DISTINCT ciudad, (SELECT ID_Region FROM Region where nombreRegion = region) \
        FROM Temporal \
        GROUP BY ciudad, region;")

        //llenado de los usuarios
        conexionBase.query("INSERT INTO Usuario (nombreUsuario, correoUsuario, telefonoUsuario, \
        fechaRegistro, direccion, codigoPostal, ID_Ciudad, ID_TipoUsuario) \
        SELECT DISTINCT nombre, correo, telefono, fecha_registro, direccion, codigo_postal, \
        (SELECT ID_Ciudad FROM Ciudad where nombreCiudad = ciudad), \
        (SELECT ID_TipoUsuario FROM Tipo_usuario where tipoUsuario = tipo) \
        From Temporal \
        GROUP BY nombre, correo, telefono, fecha_registro, direccion, codigo_postal, ciudad, tipo;")
-
        //llenado de las transacciones
        conexionBase.query("INSERT INTO Transaccion (ID_Usuario, ID_Compania) \
        SELECT DISTINCT (SELECT ID_Usuario FROM Usuario where nombreUsuario = Temporal.nombre), \
        (SELECT Compania.ID_Compania FROM Compania where Compania.nombre = nombre_compania) \
        From Temporal \
        GROUP BY Temporal.nombre, nombre_compania;")

        //llenado de los productos
        conexionBase.query("INSERT INTO Producto (nombreProducto, precioUnitario, ID_CategoriaProducto) \
        SELECT DISTINCT producto, precio_unitario, \
        (SELECT ID_CategoriaProducto FROM Categoria_producto where categoriaProducto = Temporal.categoria_producto) \
        From Temporal \
        GROUP BY producto, precio_unitario, categoria_producto;")

        //llenado del detalle de las transacciones
        conexionBase.query("INSERT INTO Detalle_transaccion (cantidad, ID_Transaccion, ID_Producto) \
        SELECT DISTINCT Temporal.cantidad, \
        (SELECT ID_Transaccion FROM Transaccion where ID_Usuario = (SELECT ID_Usuario from Usuario where nombreUsuario = Temporal.nombre) \
        and \
        ID_Compania = (SELECT ID_Compania from Compania where Compania.nombre = Temporal.nombre_compania)), \
        (SELECT ID_Producto FROM Producto where nombreProducto = Temporal.producto) \
        From Temporal \
        GROUP BY cantidad, nombre, nombre_compania, producto;")

        res.json({msg:'modelo cargado c:'})
    }
});

//rutas de eliminacion
router.get('/eliminarTemporal', (req, res) => {
    if (conexionBase){
        conexionBase.query('TRUNCATE TABLE Temporal')
        res.json({msg:'tabla temporal limpiada'})
    }   
});

router.get('/eliminarModelo', (req, res) => {
    if (conexionBase){
        conexionBase.query("SET FOREIGN_KEY_CHECKS = 0;")
        conexionBase.query("truncate table Compania;")        
        conexionBase.query("truncate table Ciudad;")
        conexionBase.query("truncate table Region;")
        conexionBase.query("truncate table Usuario;")
        conexionBase.query("truncate table Tipo_usuario;")
        conexionBase.query("truncate table Categoria_producto;")
        conexionBase.query("truncate table Transaccion;")
        conexionBase.query("truncate table Producto;")
        conexionBase.query("truncate table Detalle_transaccion;")
        conexionBase.query("SET FOREIGN_KEY_CHECKS = 1;")
        res.json({msg:'modelo limpiado'})
    }   
});

module.exports = router;