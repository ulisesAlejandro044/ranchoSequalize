const corralesController = require('../app/controllers/corralesController');


var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'corrales'.
  El método HTTP define la acción a realizar.
*/

// GET /corrales
// CRUD: Leer todos los corrales
rutas.get('/', corralesController.index);
  //function(req, res) {
  // Simulación de una lista de corrales
 // const corrales = [
 //   { id: 101, ubicacion: 'Este' },
 //   { id: 102, ubicacion: 'Oeste' },
 //   { id: 103, ubicacion: 'Norte' }
 // ];

  // res.json({message: 'Lista de corrales obtenida con éxito.', data: corrales});


// GET /corrales/:id
// CRUD: Leer un corral específico por su ID
rutas.get('/:id', corralesController.show);
  //function(req, res) {
  //const id = req.params.id; // Captura el ID de la URL
  // Simulación de un registro único
  //const corral = { id: id, ubicacion: 'Este' };
  //res.json({message: `Corral con ID ${id} obtenido con éxito.`, data: corral});


// POST /corrales
// CRUD: Crear un nuevo corral
//validaciones
const rulesPost = [
    body('capacidad')
        .escape()
        .notEmpty().withMessage('La capacidad es obligatoria.')
        .isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['disponible', 'ocupado', 'limpieza', 'reparacion']).withMessage('El estado no es válido.'),
];

rutas.post('/',rulesPost, corralesController.store);
  //function(req, res) {
  // Supongamos que los datos del nuevo corral están en req.body
  //const nuevoCorral = { id: 104, ubicacion: 'Sur' };

  //res.json({message: 'Corral creado con éxito.',data: nuevoCorral});


// PUT /corrales/:id
// CRUD: Actualizar un corral específico por su ID
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('capacidad')
        .optional()
        .escape()
        .notEmpty().withMessage('La capacidad es obligatoria.')
        .isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0.'),
    body('estado')
        .optional()
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['disponible', 'ocupado', 'limpieza', 'reparacion']).withMessage('El estado no es válido.'),
];

rutas.put('/:id', rulesPut, corralesController.update);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Corral con ID ${id} actualizado con éxito.`});


// DELETE /corrales/:id
// CRUD: Eliminar un corral específico por su ID
rutas.delete('/:id', corralesController.destroy);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Corral con ID ${id} eliminado con éxito.`});


module.exports = rutas;