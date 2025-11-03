var xprs = require('express');
var rutas = xprs.Router();
const proveedoresController = require('../app/controllers/proveedoresController');
const {body, param} = require("express-validator");

/*
  Rutas RESTful para el recurso 'proveedores'.
  Cada ruta y método corresponde a una operación CRUD.
*/

// GET /proveedores
// CRUD: Leer (todos los registros de proveedores)
rutas.get('/', proveedoresController.index); 
//   function(req, res) {
//   // Simulación de una lista de registros de proveedores
//   const proveedores = [
//     { id: 1, nombre: 'Lacteos del Campo S.A.', contacto: 'Juan Pérez' },
//     { id: 2, nombre: 'Granjas Unidas S.A. de C.V.', contacto: 'Ana Gómez' },
//     { id: 3, nombre: 'Alimentos La Vaquita', contacto: 'Luis Estrada' }
//   ];

//   res.json({
//     message: 'Lista de proveedores obtenida con éxito.',
//     data: proveedores
//   });
// });

// GET /proveedores/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', proveedoresController.show); 
//   function(req, res) {
//   const id = req.params.id; // Captura el ID de la URL
//   // Simulación de un registro único
//   const proveedor = { id: id, nombre: 'Lacteos del Campo S.A.', contacto: 'Juan Pérez' };

//   res.json({
//     message: `Proveedor con ID ${id} obtenido con éxito.`,
//     data: proveedor
//   });
// });

// POST /proveedores
// CRUD: Crear (un nuevo registro de proveedor)
//Validaciones
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
    body('categoria')
        .escape()
        .notEmpty().withMessage('La categoría es obligatoria.')
        .isIn(['Leche', 'Ganado', 'Alimento', 'Equipamiento', 'Otros']).withMessage('La categoría no es válida.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'inactivo', 'en revision']).withMessage('El estado no es válido.'),
];

rutas.post('/', rulesPost, proveedoresController.store);
//   function(req, res) {
//   // Supongamos que los datos del nuevo proveedor están en req.body
//   const nuevoProveedor = { id: 4, nombre: 'Agroganadera del Norte', contacto: 'Maria Robles' };

//   res.json({
//     message: 'Proveedor creado con éxito.',
//     data: nuevoProveedor
//   });
// });

// PUT /proveedores/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('nombre')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('direccion')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('La dirección es obligatoria.')
        .isLength({ min: 5, max: 255 }).withMessage('La dirección debe tener entre 5 y 255 caracteres.'),
    body('correo')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('El correo es obligatorio.')
        .isEmail().withMessage('Debe ser un correo electrónico válido.'),
    body('telefono')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isMobilePhone('es-MX').withMessage('El teléfono no tiene un formato válido.'),
    body('categoria')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('La categoría es obligatoria.')
        .isIn(['Leche', 'Ganado', 'Alimento', 'Equipamiento', 'Otros']).withMessage('La categoría no es válida.'),
    body('estado')
        .escape()
        .optional({ checkFalsy: true }) // <-- CORREGIDO
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'inactivo', 'en revision']).withMessage('El estado no es válido.'),
];

rutas.put('/:id', rulesPut, proveedoresController.update);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Proveedor con ID ${id} actualizado con éxito.`
//   });
// });

// DELETE /proveedores/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', proveedoresController.destroy);
//   function(req, res) {
//   const id = req.params.id;

//   res.json({
//     message: `Proveedor con ID ${id} eliminado con éxito.`
//   });
// });

module.exports = rutas;