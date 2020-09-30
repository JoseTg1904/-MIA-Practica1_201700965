/*
Instruccion que hace la carga desde el csv hacia la tabla temporal
la parte donde deberia ir la ruta del csv dice pathActual por que la 
obtengo con un metodo propio de node js para saber donde esta localizado 
el csv dentro de las carpetas del proyecto
*/

LOAD DATA LOCAL INFILE 'pathActual'
INTO TABLE Temporal COLUMNS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 1 LINES 
(nombre_compania, contacto_compania, correo_compania, telefono_compania, tipo, nombre, 
correo, telefono, @fechaCasteada, direccion, ciudad, codigo_postal, region, producto, 
categoria_producto, cantidad, precio_unitario) 
SET fecha_registro = STR_TO_DATE(@fechaCasteada, '%d/%m/%y');

#llenado de todas las tablas que no dependen de ninguna otra

#llenado de las compañias desde la tabla temporal
INSERT INTO Compania (nombre, contacto, correo, telefono) 
SELECT DISTINCT nombre_compania, contacto_compania, correo_compania, telefono_compania 
FROM Temporal 
GROUP BY nombre_compania, contacto_compania, correo_compania, telefono_compania; 

#llenado de las regiones
INSERT INTO Region (nombreRegion) 
SELECT DISTINCT region from Temporal 
GROUP BY region;

#llenado de los tipos de usuarios
INSERT INTO Tipo_usuario (tipoUsuario) VALUES ("P"), ("C");
    
#llenado de las categorias de los productos
INSERT INTO Categoria_producto (categoriaProducto)
SELECT DISTINCT categoria_producto FROM Temporal
GROUP BY categoria_producto;

#llenado de tablas dependientes

#llenando de las ciudades
INSERT INTO Ciudad (nombreCiudad, ID_Region) 
SELECT DISTINCT ciudad, (SELECT ID_Region FROM Region where nombreRegion = region) 
FROM Temporal 
GROUP BY ciudad, region;

#llenado de los usuarios
INSERT INTO Usuario (nombreUsuario, correoUsuario, telefonoUsuario, 
fechaRegistro, direccion, codigoPostal, ID_Ciudad, ID_TipoUsuario) 
SELECT DISTINCT nombre, correo, telefono, fecha_registro, direccion, codigo_postal, 
(SELECT ID_Ciudad FROM Ciudad where nombreCiudad = ciudad), 
(SELECT ID_TipoUsuario FROM Tipo_usuario where tipoUsuario = tipo) 
From Temporal 
GROUP BY nombre, correo, telefono, fecha_registro, direccion, codigo_postal, ciudad, tipo;

#llenado de las transacciones
INSERT INTO Transaccion (ID_Usuario, ID_Compania) 
SELECT DISTINCT (SELECT ID_Usuario FROM Usuario where nombreUsuario = Temporal.nombre), 
(SELECT Compania.ID_Compania FROM Compania where Compania.nombre = nombre_compania)
From Temporal 
GROUP BY Temporal.nombre, nombre_compania;

#llenado de los productos
INSERT INTO Producto (nombreProducto, precioUnitario, ID_CategoriaProducto) 
SELECT DISTINCT producto, precio_unitario, 
(SELECT ID_CategoriaProducto FROM Categoria_producto where categoriaProducto = Temporal.categoria_producto) 
From Temporal 
GROUP BY producto, precio_unitario, categoria_producto;

#llenado del detalle de las transacciones
INSERT INTO Detalle_transaccion (cantidad, ID_Transaccion, ID_Producto) 
SELECT Temporal.cantidad, 
(SELECT ID_Transaccion FROM Transaccion where ID_Usuario = 
(SELECT ID_Usuario from Usuario where nombreUsuario = Temporal.nombre)
and 
ID_Compania = (SELECT ID_Compania from Compania where Compania.nombre = Temporal.nombre_compania)), 
(SELECT ID_Producto FROM Producto where nombreProducto = Temporal.producto) 
From Temporal;
