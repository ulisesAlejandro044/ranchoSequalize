var xprs = require('express');
var rutas = xprs.Router();
const razasController = require('../app/controllers/razasController');
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'razas'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /razas
// CRUD: Leer (todos los registros de razas)
rutas.get('/', razasController.index);
//   function(req, res) {
//   // Simulación de una lista de registros de razas
//   const razas = [
//     { id: 1, nombre: 'Angus', tipo_ganado: 'Bovino' },
//     { id: 2, nombre: 'Holstein', tipo_ganado: 'Bovino' },
//     { id: 3, nombre: 'Yorkshire', tipo_ganado: 'Porcino' }
//   ];

//   res.json({
//     message: 'Lista de razas obtenida con éxito.',
//     data: razas
//   });
// });

// GET /razas/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', razasController.show);
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const raza = { id: id, nombre: 'Holstein', tipo_ganado: 'Bovino' };

//   res.json({
//     message: `Registro de raza con ID ${id} obtenido con éxito.`,
//     data: raza
//   });
// });

// POST /razas
// CRUD: Crear (un nuevo registro de raza)
//Validaciones
const rulesPost = [
    body('nombre')
        .escape()
        .notEmpty().withMessage('El nombre de la raza es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('origen')
        .escape()
        .notEmpty().withMessage('El origen es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El origen debe tener entre 3 y 100 caracteres.'),
    body('descripcion')
        .escape()
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'inactivo']).withMessage('El estado no es válido.'),
];

rutas.post('/',rulesPost, razasController.store);
//   function(req, res) {
//   // Simulación de un nuevo registro creado
//   const nuevaRaza = { id: 4, nombre: 'Simmental', tipo_ganado: 'Bovino' };

//   res.json({
//     message: 'Registro de raza creado con éxito.',
//     data: nuevaRaza
//   });
// });

// PUT /razas/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    body('nombre')
        .escape()
        .optional()
        .notEmpty().withMessage('El nombre de la raza es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('origen')
        .escape()
        .optional()
        .notEmpty().withMessage('El origen es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El origen debe tener entre 3 y 100 caracteres.'),
    body('descripcion')
        .escape()
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
    body('estado')
        .escape()
        .optional()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'inactivo']).withMessage('El estado no es válido.'),
];

rutas.put('/:id', rulesPut, razasController.update);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de raza con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /razas/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', razasController.destroy);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de raza con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;