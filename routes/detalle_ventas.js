const detalle_ventasController = require('../app/controllers/detalle_ventasController');

var xprs = require('express');
var rutas = xprs.Router();

// GET /detalle_ventas
// CRUD: Leer (todos los registros de detalle de ventas)
rutas.get('/', detalle_ventasController.index);
   //function(req, res) {
  // Simulación de una lista de registros de detalle de ventas
  //const detalleVentas = [
  //  { id: 1, id_venta: 100, producto: 'Leche', cantidad: 2 },
  //  { id: 2, id_venta: 100, producto: 'ganado', cantidad: 1 },
  //];

  //res.json({message: 'Lista de detalles de ventas obtenida con éxito.',data: detalleVentas});


// GET /detalle_ventas/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', detalle_ventasController.show);
  //function(req, res) {
  //const id = req.params.id; // Captura el ID de la URL
  // Simulación de un registro único
  //const detalle = { id: id, id_venta: 100, producto: 'Leche', cantidad: 2 };

  //res.json({message: `Detalle de venta con ID ${id} obtenido con éxito.`,data: detalle});


// POST /detalle_ventas
// CRUD: Crear (un nuevo registro de detalle de ventas)
rutas.post('/', detalle_ventasController.store);
  //function(req, res) {
  // Supongamos que los datos del nuevo registro están en req.body
  //const nuevoDetalle = { id: 4, id_venta: 102, producto: 'Queso', cantidad: 1 };

  //res.json({message: 'Detalle de venta creado con éxito.', data: nuevoDetalle});


// PUT /detalle_ventas/:id
// CRUD: Actualizar (un registro específico por su ID)
rutas.put('/:id', detalle_ventasController.update);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Detalle de venta con ID ${id} actualizado con éxito.`});


// DELETE /detalle_ventas/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', detalle_ventasController.destroy);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Detalle de venta con ID ${id} eliminado con éxito.`});


module.exports = rutas;