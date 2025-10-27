const lechesController = require('../app/controllers/lechesController');
var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'leches'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /leches
// CRUD: Leer (todos los registros de leche)
rutas.get('/', lechesController.index); 
//   function(req, res) {
//   // Simulación de una lista de registros de leche
//   const leches = [
//     { id: 1, tipo: 'Entera', cantidad_litros: 500, fecha: '2025-09-19' },
//     { id: 2, tipo: 'Deslactosada', cantidad_litros: 250, fecha: '2025-09-19' },
//     { id: 3, tipo: 'Descremada', cantidad_litros: 150, fecha: '2025-09-18' }
//   ];

//   res.json({
//     message: 'Lista de leches obtenida con éxito.',
//     data: leches
//   });
// });

// GET /leches/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', lechesController.show); 
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const leche = { id: id, tipo: 'Entera', cantidad_litros: 500, fecha: '2025-09-19' };

//   res.json({
//     message: `Registro de leche con ID ${id} obtenido con éxito.`,
//     data: leche
//   });
// });

// POST /leches
// CRUD: Crear (un nuevo registro de leche)

//Validaciones
const rulesPost = [
    body('fecha')
        .escape()
        .notEmpty().withMessage('La fecha es obligatoria.')
        .isISO8601().withMessage('El formato de fecha no es válido.')
        .isBefore(new Date().toISOString()).withMessage('La fecha no puede ser en el futuro.'),
    body('cantidad')
        .escape()
        .notEmpty().withMessage('La cantidad es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La cantidad debe ser un número positivo.'),
    body('densidad')
        .escape()
        .notEmpty().withMessage('La densidad es obligatoria.')
        .isFloat({ min: 1.025, max: 1.035 }).withMessage('La densidad no está en el rango normal para la leche.'),
    body('tanque_id')
        .escape()
        .notEmpty().withMessage('El ID del tanque es obligatorio.')
        .isInt().withMessage('El ID del tanque debe ser un número entero.'),
    body('ganado_id')
        .escape()
        .notEmpty().withMessage('El ID del ganado es obligatorio.')
        .isInt().withMessage('El ID del ganado debe ser un número entero.'),
];

rutas.post('/', rulesPost, lechesController.store);
//   function(req, res) {
//   // Simulación de un nuevo registro creado
//   const nuevaLeche = { id: 4, tipo: 'Saborizada', cantidad_litros: 100, fecha: '2025-09-19' };

//   res.json({
//     message: 'Registro de leche creado con éxito.',
//     data: nuevaLeche
//   });
// });

// PUT /leches/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('fecha')
        .escape()
        .optional()
        .notEmpty().withMessage('La fecha es obligatoria.')
        .isISO8601().withMessage('El formato de fecha no es válido.')
        .isBefore(new Date().toISOString()).withMessage('La fecha no puede ser en el futuro.'),
    body('cantidad')
        .escape()
        .optional()
        .notEmpty().withMessage('La cantidad es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La cantidad debe ser un número positivo.'),
    body('densidad')
        .escape()
        .optional()
        .notEmpty().withMessage('La densidad es obligatoria.')
        .isFloat({ min: 1.025, max: 1.035 }).withMessage('La densidad no está en el rango normal para la leche.'),
    body('tanque_id')
        .escape()
        .optional()
        .notEmpty().withMessage('El ID del tanque es obligatorio.')
        .isInt().withMessage('El ID del tanque debe ser un número entero.'),
    body('ganado_id')
        .escape()
        .optional()
        .notEmpty().withMessage('El ID del ganado es obligatorio.')
        .isInt().withMessage('El ID del ganado debe ser un número entero.'),
];

rutas.put('/:id',rulesPut, lechesController.update); 
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de leche con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /leches/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', lechesController.destroy); 
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de leche con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;