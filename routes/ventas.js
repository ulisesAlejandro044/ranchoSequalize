var xprs = require('express');
var rutas = xprs.Router();
const ventasController = require('../app/controllers/ventasController');

/*
  Rutas RESTful para el recurso 'ventas'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /ventas
// CRUD: Leer (todos los registros de ventas)
rutas.get('/', ventasController.index);
//   function(req, res) {
//   // Simulación de una lista de registros de ventas
//   const ventas = [
//     { id: 1, fecha: '2025-09-18', cliente_id: 101, total: 1500.00 },
//     { id: 2, fecha: '2025-09-19', cliente_id: 102, total: 250.50 },
//     { id: 3, fecha: '2025-09-19', cliente_id: 101, total: 500.00 }
//   ];

//   res.json({
//     message: 'Lista de ventas obtenida con éxito.',
//     data: ventas
//   });
// });

// GET /ventas/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', ventasController.show);
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const venta = { id: id, fecha: '2025-09-19', cliente_id: 102, total: 250.50 };

//   res.json({
//     message: `Registro de venta con ID ${id} obtenido con éxito.`,
//     data: venta
//   });
// });

// POST /ventas
// CRUD: Crear (un nuevo registro de venta)
rutas.post('/', ventasController.store);
//   function(req, res) {
//   // Supongamos que los datos del nuevo registro están en req.body
//   const nuevaVenta = { id: 4, fecha: '2025-09-19', cliente_id: 103, total: 950.00 };

//   res.json({
//     message: 'Registro de venta creado con éxito.',
//     data: nuevaVenta
//   });
// });

// PUT /ventas/:id
// CRUD: Actualizar (un registro específico por su ID)
rutas.put('/:id', ventasController.update);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de venta con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /ventas/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', ventasController.destroy);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de venta con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;