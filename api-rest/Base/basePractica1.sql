#creacion de la base de datos
CREATE DATABASE IF NOT EXISTS basePractica1;

#usando la base de datos actual
USE basePractica1;


#Tablas que no son hijas de ninguna otra tabla

#creacion de la tabla temporal que almacena el csv
CREATE TABLE IF NOT EXISTS Temporal (
	nombre_compania VARCHAR(200),
    contacto_compania VARCHAR(200),
    correo_compania VARCHAR(200),
    telefono_compania VARCHAR(200),
    tipo cHAR(1),
    nombre VARCHAR(200),
    correo VARCHAR(200),
    telefono VARCHAR(200),
    fecha_registro date,
    direccion VARCHAR(200),
    ciudad VARCHAR(200),
    codigo_postal VARCHAR(200),
    region VARCHAR(200),
    producto VARCHAR(200),
    categoria_producto VARCHAR(200),
    cantidad VARCHAR(200),
    precio_unitario VARCHAR(200)
);

#tabla que almacena las compañias
CREATE TABLE IF NOT EXISTS Compania (
ID_Compania INT AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(37),
contacto VARCHAR(17), 
correo VARCHAR(55),
telefono VARCHAR(12)
);

#tabla que almacena las regiones
create table if not exists Region (
	ID_Region int auto_increment primary key,
    nombreRegion varchar(11)
);

#tabla que almacena los dos tipos de ususarios
create table if not exists Tipo_usuario(
	ID_TipoUsuario int auto_increment primary key,
    tipoUsuario char(1)
);

#tabla que almacena las categorias de los productos
create table if not exists Categoria_producto(
	ID_CategoriaProducto int auto_increment primary key,
    categoriaProducto varchar(19)
);


#tablas que tienen que si son hijas

#tabla que almacena las ciudades y es hija de region
create table if not exists Ciudad(
	ID_Ciudad int auto_increment primary key,
    nombreCiudad varchar(16),
    ID_Region int,
    foreign key(ID_Region) references Region(ID_Region)
);

#tabla que almacena los productos
create table if not exists Producto(
	ID_Producto int auto_increment primary key,
    nombreProducto varchar(24),
	precioUnitario decimal(5, 2),
    ID_CategoriaProducto int,
    foreign key(ID_CategoriaProducto) references Categoria_producto(ID_CategoriaProducto)
);

#tabla que almacena los usuarios
create table if not exists Usuario(
	ID_Usuario int auto_increment primary key,
    nombreUsuario varchar(19),
    correoUsuario varchar(52),
    telefonoUsuario varchar(12),
    fechaRegistro date,
    direccion varchar(33),
    codigoPostal mediumint,
    ID_Ciudad int,
    ID_TipoUsuario int,
    foreign key(ID_Ciudad) references Ciudad(ID_Ciudad),
    foreign key(ID_TipoUsuario) references Tipo_usuario(ID_TipoUsuario)
);

#tabla que almacena las transacciones entre los usuarios y la compañia
create table if not exists Transaccion(
	ID_Transaccion int auto_increment primary key,
    ID_Usuario int,
    ID_Compania int,
    foreign key(ID_Usuario) references Usuario(ID_Usuario),
    foreign key(ID_Compania) references Compania(ID_Compania)
);

#tabla que almacena el detalle de la transaccion
create table if not exists Detalle_transaccion(
	cantidad smallint,
    ID_Transaccion int,
    ID_Producto int,
    foreign key(ID_Transaccion) references Transaccion(ID_Transaccion),
    foreign key(ID_Producto) references Producto(ID_Producto)
);


select count(*) as total_pedidos
from Usuario 
inner join
Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad
inner join
Region on Ciudad.ID_Region = Region.ID_Region
inner join 
Tipo_usuario on Usuario.ID_TipoUsuario = Tipo_usuario.ID_TipoUsuario 
inner join 
Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join 
Compania on Transaccion.ID_Compania = Compania.ID_Compania
where Usuario.ID_TipoUsuario = 1
group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion
order by total_pedidos;


