#creacion de la base de datos
CREATE DATABASE IF NOT EXISTS basePractica1;

USE basePractica1;

#creacion de la tabla temporal que almacena el csv
CREATE TABLE IF NOT EXISTS temporal (
	nombre_compania VARCHAR(200),
    contacto_compania VARCHAR(200),
    correo_compania VARCHAR(200),
    telefono_compania VARCHAR(200),
    tipo VARCHAR(200),
    nombre VARCHAR(200),
    correo VARCHAR(200),
    telefono VARCHAR(200),
    fecha_registro VARCHAR(200),
    direccion VARCHAR(200),
    ciudad VARCHAR(200),
    codigo_postal VARCHAR(200),
    region VARCHAR(200),
    producto VARCHAR(200),
    categoria_producto VARCHAR(200),
    cantidad VARCHAR(200),
    precio_unitario VARCHAR(200)
);