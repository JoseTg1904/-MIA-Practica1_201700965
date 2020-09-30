const express = require('express');
const { query } = require('./conexionBase');
const router = express.Router();

const conexionBase = require('./conexionBase');

//rutas de reporte
router.get('/consulta1', (req, res) => {
    if (conexionBase){
            conexionBase.query("select Usuario.nombreUsuario as Nombre_usuario, \
            Usuario.telefonoUsuario as Telefono_usuario, Transaccion.ID_Transaccion as Numero_transaccion, \
            Compania.nombre as Nombre_compañia, \
            sum(Detalle_transaccion.cantidad * Producto.precioUnitario ) \
            as Total_orden \
            from Usuario \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
            where Usuario.ID_TipoUsuario = 1 \
            group by nombreUsuario, Transaccion.ID_Compania, telefonoUsuario, Transaccion.ID_Transaccion \
            order by Total_orden desc \
            limit 1;", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta2', (req, res) => {
    if (conexionBase){
        conexionBase.query("select Usuario.ID_Usuario as identificador_usuario, \
        Usuario.nombreUsuario as Nombre_usuario, \
        sum(Detalle_transaccion.cantidad) as Total_productos \
        from Usuario \
        inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
        inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
        inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
        where Usuario.ID_TipoUsuario = 2 \
        group by Usuario.ID_Usuario, nombreUsuario \
        order by Total_productos desc \
        limit 1;", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta3', (req, res) => {
    if (conexionBase){
        conexionBase.query("(select Usuario.direccion as direccion, Region.nombreRegion as region, \
            Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, count(*) as total_pedidos \
            from Usuario \
            inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad \
            inner join Region on Ciudad.ID_Region = Region.ID_Region \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            where Usuario.ID_TipoUsuario = 1 \
            group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion \
            order by total_pedidos desc limit 1) \
            union all \
            (select Usuario.direccion as direccion, Region.nombreRegion as region, \
            Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, count(*) as total_pedidos \
            from Usuario \
            inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad \
            inner join Region on Ciudad.ID_Region = Region.ID_Region \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            where Usuario.ID_TipoUsuario = 1 \
            group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion \
            order by total_pedidos asc limit 1);", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta4', (req, res) => {
    if (conexionBase){
        conexionBase.query("select Usuario.nombreUsuario as Nombre_usuario, \
        Transaccion.ID_Transaccion as Numero_transaccion, Compania.nombre as Nombre_compañia, \
        count(Categoria_producto.categoriaProducto) as Contador_quesos \
        from Usuario \
        inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
        inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
        inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
        inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
        inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto \
        where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = \"Cheese\" \
        group by nombreUsuario, Usuario.ID_Usuario, Transaccion.ID_Compania, Transaccion.ID_Transaccion, \
        Categoria_producto.categoriaProducto \
        order by Contador_quesos desc \
        limit 5;", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta5', (req, res) => {
    if (conexionBase){
        conexionBase.query("(select Usuario.nombreUsuario as Nombre_usuario, \
            Usuario.fechaRegistro as registro_usuario, \
            sum(Detalle_transaccion.cantidad * \
            (select precioUnitario from Producto where Producto.ID_Producto = Detalle_transaccion.ID_Producto) ) \
            as Total_orden \
            from Usuario \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            where Usuario.ID_TipoUsuario = 2 \
            group by nombreUsuario, fechaRegistro \
            order by Total_orden desc \
            limit 3) \
            union all \
            (select Usuario.nombreUsuario as Nombre_usuario, \
            Usuario.fechaRegistro as registro_usuario, \
            sum(Detalle_transaccion.cantidad * \
            (select precioUnitario from Producto where Producto.ID_Producto = Detalle_transaccion.ID_Producto) ) \
            as Total_orden \
            from Usuario \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            where Usuario.ID_TipoUsuario = 2 \
            group by nombreUsuario, fechaRegistro \
            order by Total_orden asc \
            limit 3);", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta6', (req, res) => {
    if (conexionBase){
        conexionBase.query("(select Categoria_producto.categoriaProducto as Categoria_Producto, \
            sum(Producto.precioUnitario * Detalle_transaccion.cantidad) as Contador_categoria \
            from Usuario \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
            inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto \
            where Usuario.ID_TipoUsuario = 1 \
            group by Categoria_producto.categoriaProducto \
            order by Contador_categoria desc \
            limit 1) \
            union all \
            (select Categoria_producto.categoriaProducto as Categoria_Producto, \
            sum(Producto.precioUnitario * Detalle_transaccion.cantidad) as Contador_categoria \
            from Usuario \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
            inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto \
            where Usuario.ID_TipoUsuario = 1 \
            group by Categoria_producto.categoriaProducto \
            order by Contador_categoria asc \
            limit 1);", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta7', (req, res) => {
    if (conexionBase){
        conexionBase.query("select Usuario.nombreUsuario as Nombre_usuario, \
        sum(Detalle_transaccion.cantidad * Producto.precioUnitario) as total_vegetales \
        from Usuario \
        inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
        inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
        inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
        inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
        inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto  \
        where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = \"Fresh Vegetables\" \
        group by nombreUsuario \
        order by total_vegetales desc \
        limit 5;", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta8', (req, res) => {
    if (conexionBase){
        conexionBase.query("(select Usuario.direccion as direccion, Region.nombreRegion as region, \
            Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, \
            sum(Producto.precioUnitario * Detalle_transaccion.Cantidad) as total_compra \
            from Usuario \
            inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad \
            inner join Region on Ciudad.ID_Region = Region.ID_Region \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
            where Usuario.ID_TipoUsuario = 2 \
            group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion \
            order by total_compra desc limit 3) \
            union all \
            (select Usuario.direccion as direccion, Region.nombreRegion as region, \
            Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, \
            sum(Producto.precioUnitario * Detalle_transaccion.Cantidad) as total_compra \
            from Usuario \
            inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad \
            inner join Region on Ciudad.ID_Region = Region.ID_Region \
            inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
            inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
            inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
            where Usuario.ID_TipoUsuario = 2 \
            group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion \
            order by total_compra asc limit 3);", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
});

router.get('/consulta9', (req, res) => {
    if (conexionBase){
        conexionBase.query("select Usuario.nombreUsuario as Nombre_usuario, \
        Usuario.telefonoUsuario as Telefono_usuario, Transaccion.ID_Transaccion as Numero_transaccion, \
        Compania.nombre as Nombre_compañia, \
        sum(Detalle_transaccion.cantidad) \
        as Total_orden \
        from Usuario \
        inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
        inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
        inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
        where Usuario.ID_TipoUsuario = 1 \
        group by nombreUsuario, Transaccion.ID_Compania, telefonoUsuario, Transaccion.ID_Transaccion \
        order by Total_orden asc \
        limit 1;", (error, resultado) => {
        if (error) throw error;
        res.json(resultado)
    })
}
});

router.get('/consulta10', (req, res) => {
    if (conexionBase){
        conexionBase.query("select Usuario.nombreUsuario as Nombre_usuario, \
        count(Categoria_producto.categoriaProducto) as Contador_Seafood \
        from Usuario \
        inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario \
        inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania \
        inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion \
        inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto \
        inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto \
        where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = \"Seafood\" \
        group by nombreUsuario, Usuario.ID_Usuario, Categoria_producto.categoriaProducto \
        order by Contador_Seafood desc \
        limit 10;", (error, resultado) => {
            if (error) throw error;
            res.json(resultado)
        })
    }
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
        SELECT Temporal.cantidad, \
        (SELECT ID_Transaccion FROM Transaccion where ID_Usuario = \
        (SELECT ID_Usuario from Usuario where nombreUsuario = Temporal.nombre) \
        and \
        ID_Compania = (SELECT ID_Compania from Compania where Compania.nombre = Temporal.nombre_compania)), \
        (SELECT ID_Producto FROM Producto where nombreProducto = Temporal.producto) \
        From Temporal;")

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