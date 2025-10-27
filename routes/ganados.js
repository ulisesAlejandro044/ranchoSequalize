
var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");
const ganadosController = require('../app/controllers/ganadosController');
const createUploader = require('../multerConfig');
const uploadGanados = createUploader('ganados');

// GET /ganados
// CRUD: Leer (todos los registros de ganados)
rutas.get('/', ganadosController.index);
  //function(req, res) {
  // Simulación de una lista de registros de ganado
  //const ganados = [
    //{ id: 1, tipo: 'Vaca', peso: 500, corral_id: 101 },
    //{ id: 2, tipo: 'Toro', peso: 800, corral_id: 102 },
    //{ id: 3, tipo: 'Ternero', peso: 150, corral_id: 101 }
  //];

  //res.json({message: 'Lista de ganados obtenida con éxito.',data: ganados});


// GET /ganados/:id
// CRUD: Leer (un registro específico por su ID)
rutas.get('/:id', ganadosController.show); 
  //function(req, res) {
  //const id = req.params.id; // Captura el ID de la URL
  // Simulación de un registro único
  //const ganado = { id: id, tipo: 'Vaca', peso: 500, corral_id: 101 };

  //res.json({ message: `Registro de ganado con ID ${id} obtenido con éxito.`, data: ganado });


// POST /ganados
// CRUD: Crear (un nuevo registro de ganado)
//Validaciones   (  NO SE AGREGO EL DE LA IMAGEN)
const rulesPost = [
    body('proveedor')
        .escape()
        .notEmpty().withMessage('El proveedor es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre del proveedor debe tener entre 3 y 100 caracteres.'),
    body('edad')
        .escape()
        .notEmpty().withMessage('La edad es obligatoria.')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor o igual a 0.'),
    body('sexo')
        .escape()
        .notEmpty().withMessage('El sexo es obligatorio.')
        .isIn(['Macho', 'Hembra', 'macho', 'hembra']).withMessage('El sexo no es válido. Debe ser "Macho" o "Hembra".'),
    body('peso')
        .escape()
        .notEmpty().withMessage('El peso es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El peso debe ser un número mayor o igual a 0.'),
    body('precio')
        .escape()
        .notEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0.'),
    body('origen')
        .escape()
        .notEmpty().withMessage('El origen es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El origen debe tener entre 3 y 100 caracteres.'),
    body('altura')
        .escape()
        .notEmpty().withMessage('La altura es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La altura debe ser un número mayor o igual a 0.'),
    body('estado')
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'vendido', 'enfermo', 'fallecido']).withMessage('El estado no es válido.'),
    body('raza_id')
        .escape()
        .notEmpty().withMessage('El ID de la raza es obligatorio.')
        .isInt().withMessage('El ID de la raza debe ser un número entero.'),
    body('categoria_id')
        .escape()
        .notEmpty().withMessage('El ID de la categoría es obligatorio.')
        .isInt().withMessage('El ID de la categoría debe ser un número entero.'),
    body('corral_id')
        .escape()
        .optional()
        .isInt().withMessage('El ID del corral debe ser un número entero.'),
    body('proveedor_id')
        .escape()
        .notEmpty().withMessage('El ID del proveedor es obligatorio.')
        .isInt().withMessage('El ID del proveedor debe ser un número entero.'),
];
rutas.post('/', uploadGanados.single('imagen'),rulesPost, ganadosController.store);
  //function(req, res) {
  // Simulación de un nuevo registro creado
  //const nuevoGanado = { id: 4, tipo: 'Novillo', peso: 400, corral_id: 103 };

  //res.json({message: 'Registro de ganado creado con éxito.', data: nuevoGanado});


// PUT /ganados/:id
// CRUD: Actualizar (un registro específico por su ID)
//Validaciones put
const rulesPut = [
    param('id').isInt().withMessage('El ID debe ser un número entero.'),

    body('proveedor')
        .optional()
        .escape()
        .notEmpty().withMessage('El proveedor es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre del proveedor debe tener entre 3 y 100 caracteres.'),
    body('edad')
        .optional()
        .escape()
        .notEmpty().withMessage('La edad es obligatoria.')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero mayor o igual a 0.'),
    body('sexo')
        .optional()
        .escape()
        .notEmpty().withMessage('El sexo es obligatorio.')
        .isIn(['Macho', 'Hembra', 'macho', 'hembra']).withMessage('El sexo no es válido. Debe ser "Macho" o "Hembra".'),
    body('peso')
        .optional()
        .escape()
        .notEmpty().withMessage('El peso es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El peso debe ser un número mayor o igual a 0.'),
    body('precio')
        .optional()
        .escape()
        .notEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0.'),
    body('origen')
        .optional()
        .escape()
        .notEmpty().withMessage('El origen es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El origen debe tener entre 3 y 100 caracteres.'),
    body('altura')
        .optional()
        .escape()
        .notEmpty().withMessage('La altura es obligatoria.')
        .isFloat({ min: 0 }).withMessage('La altura debe ser un número mayor o igual a 0.'),
    body('estado')
        .optional()
        .escape()
        .notEmpty().withMessage('El estado es obligatorio.')
        .isIn(['activo', 'vendido', 'enfermo', 'fallecido']).withMessage('El estado no es válido.'),
    body('raza_id')
        .optional()
        .escape()
        .notEmpty().withMessage('El ID de la raza es obligatorio.')
        .isInt().withMessage('El ID de la raza debe ser un número entero.'),
    body('categoria_id')
        .optional()
        .escape()
        .notEmpty().withMessage('El ID de la categoría es obligatorio.')
        .isInt().withMessage('El ID de la categoría debe ser un número entero.'),
    body('corral_id')
        .escape()
        .optional()
        .isInt().withMessage('El ID del corral debe ser un número entero.'),
    body('proveedor_id')
        .optional()
        .escape()
        .notEmpty().withMessage('El ID del proveedor es obligatorio.')
        .isInt().withMessage('El ID del proveedor debe ser un número entero.'),
];

rutas.put('/:id', uploadGanados.single('imagen'),rulesPut, ganadosController.update);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Registro de ganado con ID ${id} actualizado con éxito.`});


// DELETE /ganados/:id
// CRUD: Eliminar (un registro específico por su ID)
rutas.delete('/:id', ganadosController.destroy);
  //function(req, res) {
  //const id = req.params.id;

  //res.json({message: `Registro de ganado con ID ${id} eliminado con éxito.`});

module.exports = rutas;