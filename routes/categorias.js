const categoriasController = require('../app/controllers/categoriasController');


var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");

// GET /categorias 
// CRUD: Leer (todos los registros)
rutas.get('/', categoriasController.index);
// function(req, res) {
  // Simulación de una lista de categorías
 // const categorias = [
   // { id: 1, nombre: 'Engorda' },
   // { id: 2, nombre: 'Desarrollo' },
    //{ id: 3, nombre: 'Lechero' },
    //{ id: 4, nombre: 'Rastro' },
  //];
  //res.json({
   // message: 'Lista de categorías obtenida con éxito.',
   // data: categorias
 // });
//});

// GET /categorias/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', categoriasController.show);
  //function(req, res) {
  //const id = req.params.id;
  // Simulación de un registro único
  //const categoria = { id: id, nombre: 'Lechero' };

  //res.json({message: `Categoría con ID ${id} obtenida con éxito.`,
    //data: categoria});


// POST /categorias
// CRUD: Crear (un nuevo registro)
//validaciones
const rulesPost = [
    body('nombre')
        .escape()
        .notEmpty().withMessage('El nombre de la categoría es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('descripcion')
        .escape()
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
];

rutas.post('/',rulesPost, categoriasController.store);
  //function(req, res) {
  // Supongamos que los datos del nuevo registro están en req.body
  //const nuevoRegistro = { id: 3, nombre: 'Lechero' };

  //res.json({
    //message: 'Categoría creada con éxito.',
    //data: nuevoRegistro});


// PUT /categorias/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('nombre')
        .optional()
        .escape()
        .notEmpty().withMessage('El nombre de la categoría es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('descripcion')
        .escape()
        .optional()
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.'),
];

rutas.put('/:id', rulesPut, categoriasController.update);
  //function(req, res) {
  //const id = req.params.id;
  //res.json({message: `Categoría con ID ${id} actualizada con éxito.`});
  

// DELETE /categorias/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', categoriasController.destroy);
  //function(req, res) {
  //const id = req.params.id;
  //res.json({message: `Categoría con ID ${id} eliminada con éxito.`});


module.exports = rutas;