var xprs = require('express');
var rutas = xprs.Router();
const tanquesController = require('../app/controllers/tanquesController');
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'tanques'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /tanques
// CRUD: Leer (todos los registros de tanques)
rutas.get('/', tanquesController.index);
//   function(req, res) {
//   // Simulación de una lista de registros de tanques
//   const tanques = [
//     { id: 1, capacidad_litros: 5000, estado: 'Lleno', ubicacion: 'Almacén 1' },
//     { id: 2, capacidad_litros: 3000, estado: 'Vacío', ubicacion: 'Almacén 2' },
//     { id: 3, capacidad_litros: 7500, estado: 'Lleno', ubicacion: 'Almacén 1' }
//   ];

//   res.json({
//     message: 'Lista de tanques obtenida con éxito.',
//     data: tanques
//   });
// });

// GET /tanques/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', tanquesController.show);
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const tanque = { id: id, capacidad_litros: 5000, estado: 'Lleno', ubicacion: 'Almacén 1' };

//   res.json({
//     message: `Registro de tanque con ID ${id} obtenido con éxito.`,
//     data: tanque
//   });
// });

// POST /tanques
// CRUD: Crear (un nuevo registro de tanque)
//Validaciones
const rulesPost = [
    body('capacidad')
        .escape()
        .notEmpty().withMessage('La capacidad es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La capacidad debe ser un número positivo.'),
    body('temperatura')
        .escape()
        .notEmpty().withMessage('La temperatura es obligatoria.')
        .isFloat({ min: 0, max: 40 }).withMessage('La temperatura debe ser entre 0 y 40.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['lleno', 'vacio', 'limpieza', 'en reparacion']).withMessage('El estado no es válido.'),
    body('leche_id')
        .escape()
        .notEmpty().withMessage('El ID de la leche es obligatorio.')
        .isInt().withMessage('El ID de la leche debe ser un número entero.'),
];

rutas.post('/',rulesPost, tanquesController.store);
//   function(req, res) {
//   // Simulación de un nuevo registro creado
//   const nuevoTanque = { id: 4, capacidad_litros: 2000, estado: 'Lleno', ubicacion: 'Almacén 3' };

//   res.json({
//     message: 'Registro de tanque creado con éxito.',
//     data: nuevoTanque
//   });
// });

// PUT /tanques/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    body('capacidad')
        .escape()
        .optional()
        .notEmpty().withMessage('La capacidad es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La capacidad debe ser un número positivo.'),
    body('temperatura')
        .escape()
        .optional()
        .notEmpty().withMessage('La temperatura es obligatoria.')
        .isFloat({ min: 0, max: 40 }).withMessage('La temperatura debe ser entre 0 y 40.'),
    body('estado')
        .escape()
        .optional()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['lleno', 'vacio', 'limpieza', 'en reparacion']).withMessage('El estado no es válido.'),
    body('leche_id')
        .escape()
        .optional()
        .notEmpty().withMessage('El ID de la leche es obligatorio.')
        .isInt().withMessage('El ID de la leche debe ser un número entero.'),
];

rutas.put('/:id', rulesPut, tanquesController.update); 
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de tanque con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /tanques/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', tanquesController.destroy);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de tanque con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;