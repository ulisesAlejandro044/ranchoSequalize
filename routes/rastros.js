var xprs = require('express');
var rutas = xprs.Router();
const rastrosController = require('../app/controllers/rastrosController');
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'rastros'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /rastros
// CRUD: Leer (todos los registros de rastros)
rutas.get('/', rastrosController.index);
//   function(req, res) {
//   // Simulación de una lista de registros de rastros
//   const rastros = [
//     { id: 1, ubicacion: 'México', capacidad: 500, estatus: 'Operando' },
//     { id: 2, ubicacion: 'Argentina', capacidad: 800, estatus: 'Mantenimiento' },
//     { id: 3, ubicacion: 'Brasil', capacidad: 1200, estatus: 'Operando' }
//   ];

//   res.json({
//     message: 'Lista de rastros obtenida con éxito.',
//     data: rastros
//   });
// });

// GET /rastros/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', rastrosController.show);
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const rastro = { id: id, ubicacion: 'México', capacidad: 500, estatus: 'Operando' };

//   res.json({
//     message: `Registro de rastro con ID ${id} obtenido con éxito.`,
//     data: rastro
//   });
// });

// POST /rastros
// CRUD: Crear (un nuevo registro de rastro)
//Validaciones
const rulesPost = [
    body('fecha')
        .escape()
        .notEmpty().withMessage('La fecha es obligatoria.')
        .isISO8601().withMessage('El formato de la fecha no es válido.')
        .isBefore(new Date().toISOString()).withMessage('La fecha no puede ser en el futuro.'),
    body('destino')
        .escape()
        .notEmpty().withMessage('El destino es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El destino debe tener entre 3 y 100 caracteres.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['en proceso', 'finalizado', 'rechazado']).withMessage('El estado no es válido.'),
    body('ganado_id')
        .escape()
        .notEmpty().withMessage('El ID del ganado es obligatorio.')
        .isInt().withMessage('El ID del ganado debe ser un número entero.'),
];

rutas.post('/', rulesPost, rastrosController.store);
//   function(req, res) {
//   // Simulación de un nuevo registro creado
//   const nuevoRastro = { id: 4, ubicacion: 'Colombia', capacidad: 600, estatus: 'En construcción' };

//   res.json({
//     message: 'Registro de rastro creado con éxito.',
//     data: nuevoRastro
//   });
// });

// PUT /rastros/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('fecha')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .isISO8601().withMessage('El formato de la fecha no es válido.')
        .isBefore(new Date().toISOString()).withMessage('La fecha no puede ser en el futuro.'),
    body('destino')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .isLength({ min: 3, max: 100 }).withMessage('El destino debe tener entre 3 y 100 caracteres.'),
    body('estado')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .isIn(['en proceso', 'finalizado', 'rechazado']).withMessage('El estado no es válido.'),
    body('ganado_id')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .isInt().withMessage('El ID del ganado debe ser un número entero.'),
];

rutas.put('/:id', rulesPut, rastrosController.update);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de rastro con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /rastros/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', rastrosController.destroy);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Registro de rastro con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;