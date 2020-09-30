/*
consulta que muestra
la orden por la cual se a pagado la mayor cantidad de dinero respecto a los proveedores
*/
select Usuario.nombreUsuario as Nombre_usuario, 
Usuario.telefonoUsuario as Telefono_usuario, Transaccion.ID_Transaccion as Numero_transaccion, 
Compania.nombre as Nombre_compañia, 
sum(Detalle_transaccion.cantidad * (select precioUnitario from Producto where Producto.ID_Producto = Detalle_transaccion.ID_Producto) ) 
as Total_orden 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
where Usuario.ID_TipoUsuario = 1 
group by nombreUsuario, Transaccion.ID_Compania, telefonoUsuario, Transaccion.ID_Transaccion 
order by Total_orden desc 
limit 1;


/*
consulta que muestra
el cliente que mas productos a comprado independientemente  de la compañia
a la que haya sido
*/
select Usuario.ID_Usuario as identificador_usuario,
Usuario.nombreUsuario as Nombre_usuario,
sum(Detalle_transaccion.cantidad) as Total_productos
from Usuario
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
where Usuario.ID_TipoUsuario = 2 
group by Usuario.ID_Usuario, nombreUsuario 
order by Total_productos desc 
limit 1;


/*
consulta que muestra
la direccion, ciudad, region, codigo postal a la cual las compañias han echo
mas pedidos
*/
(select Usuario.direccion as direccion, Region.nombreRegion as region, 
Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, count(*) as total_pedidos 
from Usuario 
inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad 
inner join Region on Ciudad.ID_Region = Region.ID_Region 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
where Usuario.ID_TipoUsuario = 1 
group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion 
order by total_pedidos desc limit 1) 
union all 
(select Usuario.direccion as direccion, Region.nombreRegion as region, 
Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, count(*) as total_pedidos 
from Usuario 
inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad 
inner join Region on Ciudad.ID_Region = Region.ID_Region 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
where Usuario.ID_TipoUsuario = 1 
group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion 
order by total_pedidos asc limit 1);


/*
consulta que muestra 
los clientes que mas han comprado a ciertas compañias
productos de la categoria cheese
*/
select Usuario.nombreUsuario as Nombre_usuario, 
Transaccion.ID_Transaccion as Numero_transaccion, Compania.nombre as Nombre_compañia, 
count(Categoria_producto.categoriaProducto) as Contador_quesos 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto 
where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = "Cheese" 
group by nombreUsuario, Usuario.ID_Usuario, Transaccion.ID_Compania, Transaccion.ID_Transaccion, 
Categoria_producto.categoriaProducto 
order by Contador_quesos desc 
limit 5;

/*
consulta que muestra
los clientes que mas han comprado y los que menos sin importar la compañia a la que sean
*/
(select Usuario.nombreUsuario as Nombre_usuario, 
Usuario.fechaRegistro as registro_usuario, 
sum(Detalle_transaccion.cantidad * 
(select precioUnitario from Producto where Producto.ID_Producto = Detalle_transaccion.ID_Producto) ) 
as Total_orden 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
where Usuario.ID_TipoUsuario = 2 
group by nombreUsuario, fechaRegistro 
order by Total_orden desc 
limit 3)
union all 
(select Usuario.nombreUsuario as Nombre_usuario, 
Usuario.fechaRegistro as registro_usuario, 
sum(Detalle_transaccion.cantidad * 
(select precioUnitario from Producto where Producto.ID_Producto = Detalle_transaccion.ID_Producto) ) 
as Total_orden 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
where Usuario.ID_TipoUsuario = 2 
group by nombreUsuario, fechaRegistro 
order by Total_orden asc 
limit 3);


/*
consulta que muestra 
las categorias mas y menos vendidas sin importar la compañia y los usuarios entre las
que se hagan estas transacciones
*/
(select Categoria_producto.categoriaProducto as Categoria_Producto, 
sum(Producto.precioUnitario * Detalle_transaccion.cantidad) as Contador_categoria 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto 
where Usuario.ID_TipoUsuario = 1 
group by Categoria_producto.categoriaProducto 
order by Contador_categoria desc 
limit 1) 
union all 
(select Categoria_producto.categoriaProducto as Categoria_Producto, 
sum(Producto.precioUnitario * Detalle_transaccion.cantidad) as Contador_categoria 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto 
where Usuario.ID_TipoUsuario = 1 
group by Categoria_producto.categoriaProducto 
order by Contador_categoria asc 
limit 1);


/*
consulta que muestra 
el top 5 de proveedores que mas cantidad de
dinero han producido por la venta
de productos de la categoria fresh vegetables 
sin importar la compañia
*/
select Usuario.nombreUsuario as Nombre_usuario, 
sum(Detalle_transaccion.cantidad * Producto.precioUnitario) as total_vegetales 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto  
where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = "Fresh Vegetables" 
group by nombreUsuario
order by total_vegetales desc 
limit 5;


/*
consulta que muestra las ubicaciones de los clientes
que mas han comprado sin importar a que compañia haya sido
*/
(select Usuario.direccion as direccion, Region.nombreRegion as region, 
Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal, 
sum(Producto.precioUnitario * Detalle_transaccion.Cantidad) as total_compra 
from Usuario 
inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad 
inner join Region on Ciudad.ID_Region = Region.ID_Region 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
where Usuario.ID_TipoUsuario = 2 
group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion 
order by total_compra desc limit 3) 
union all 
(select Usuario.direccion as direccion, Region.nombreRegion as region, 
Ciudad.nombreCiudad as ciudad, Usuario.codigoPostal as codigo_postal,
sum(Producto.precioUnitario * Detalle_transaccion.Cantidad) as total_compra 
from Usuario 
inner join Ciudad on Usuario.ID_Ciudad = Ciudad.ID_Ciudad 
inner join Region on Ciudad.ID_Region = Region.ID_Region 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
where Usuario.ID_TipoUsuario = 2 
group by Usuario.direccion, Usuario.codigoPostal, Ciudad.nombreCiudad, Region.nombreRegion 
order by total_compra asc limit 3);


/*
consulta que muestra
el proveedor que menos productos a vendido hacia una compañia
*/
select Usuario.nombreUsuario as Nombre_usuario, 
Usuario.telefonoUsuario as Telefono_usuario, Transaccion.ID_Transaccion as Numero_transaccion, 
Compania.nombre as Nombre_compañia, 
sum(Detalle_transaccion.cantidad ) as Total_orden 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
where Usuario.ID_TipoUsuario = 1 
group by nombreUsuario, Transaccion.ID_Compania, telefonoUsuario, Transaccion.ID_Transaccion 
order by Total_orden asc 
limit 1;


/*
consulta que muestra los pruductos que mas han comprado
los clientes de la categoria seafood sin importar la compañia
*/
select Usuario.nombreUsuario as Nombre_usuario, 
count(Categoria_producto.categoriaProducto) as Contador_Seafood 
from Usuario 
inner join Transaccion on Transaccion.ID_Usuario = Usuario.ID_Usuario 
inner join Compania on Transaccion.ID_Compania = Compania.ID_Compania 
inner join Detalle_transaccion on Detalle_transaccion.ID_Transaccion = Transaccion.ID_Transaccion 
inner join Producto on Producto.ID_Producto = Detalle_transaccion.ID_Producto 
inner join Categoria_producto on Categoria_producto.ID_CategoriaProducto = Producto.ID_CategoriaProducto 
where Usuario.ID_TipoUsuario = 2 and Categoria_producto.categoriaProducto = "Seafood" 
group by nombreUsuario, Usuario.ID_Usuario, Categoria_producto.categoriaProducto 
order by Contador_Seafood desc 
limit 10;