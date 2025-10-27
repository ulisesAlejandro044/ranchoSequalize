const clientesController = require('../app/controllers/clientesController');

var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");



// GET /clientes
// CRUD: Leer (todos los clientes)
rutas.get('/', clientesController.index);
  //function(req, res) {
  // Simulación de una lista de clientes
  //const clientes = [
   // { id: 1, nombre: 'Maria Juarez' },
    //{ id: 2, nombre: 'Pedro Gomez' },
    //{ id: 3, nombre: 'Ana Fernandez' },
    //{ id: 4, nombre: 'Carlos Ruiz' },
  //];

  //res.json({
   // message: 'Lista de clientes obtenida con éxito.',
   // data: clientes
  //});


// GET /clientes/:id
// CRUD: Leer (un cliente específico por su ID)
rutas.get('/:id', clientesController.show);
  //function(req, res) {
  //const id = req.params.id; // Captura el ID de la URL
  // Simulación de un registro único
  //const cliente = { id: id, nombre: 'Maria Juarez' };

//  res.json({
  //  message: `Cliente con ID ${id} obtenido con éxito.`,
   // data: cliente
  //});


// POST /clientes
// CRUD: Crear (un nuevo cliente)

//crear validaciones
const rulesPost = [
    body('nombre')
        .escape()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('direccion')
        .escape()
        .notEmpty().withMessage('La dirección es obligatoria.')
        .isLength({ min: 5, max: 255 }).withMessage('La dirección debe tener entre 5 y 255 caracteres.'),
    body('correo')
        .escape()
        .notEmpty().withMessage('El correo es obligatorio.')
        .isEmail().withMessage('Debe ser un correo electrónico válido.'),
    body('telefono')
        .escape()
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isMobilePhone('es-MX').withMessage('El teléfono no tiene un formato válido.'),
    body('rfc')
        .escape()
        .notEmpty().withMessage('El RFC es obligatorio.')
        .isLength({ min: 12, max: 13 }).withMessage('El RFC debe tener 12 o 13 caracteres.')
];

rutas.post('/', rulesPost, clientesController.store);
  //function(req, res) {
  // Supongamos que los datos del nuevo cliente están en req.body
  //const nuevoCliente = { id: 4, nombre: 'Carlos Ruiz' };

  //res.json({
   // message: 'Cliente creado con éxito.',
   // data: nuevoCliente
 // });


// PUT /clientes/:id
// CRUD: Actualizar (un cliente específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('nombre')
        .optional()
        .escape()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('direccion')
        .optional()
        .escape()
        .notEmpty().withMessage('La dirección es obligatoria.')
        .isLength({ min: 5, max: 255 }).withMessage('La dirección debe tener entre 5 y 255 caracteres.'),
    body('correo')
        .optional()
        .escape()
        .notEmpty().withMessage('El correo es obligatorio.')
        .isEmail().withMessage('Debe ser un correo electrónico válido.'),
    body('telefono')
        .optional()
        .escape()
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isMobilePhone('es-MX').withMessage('El teléfono no tiene un formato válido.'),
    body('rfc')
        .optional()
        .escape()
        .notEmpty().withMessage('El RFC es obligatorio.')
        .isLength({ min: 12, max: 13 }).withMessage('El RFC debe tener 12 o 13 caracteres.')
];

rutas.put('/:id', rulesPut, clientesController.update);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({
    //message: `Cliente con ID ${id} actualizado con éxito.`});


// DELETE /clientes/:id
// CRUD: Eliminar (un cliente específico por su ID)
rutas.delete('/:id', clientesController.destroy);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Cliente con ID ${id} eliminado con éxito.`});


module.exports = rutas;