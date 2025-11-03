const administradoresController = require('../app/controllers/administradoresController');


var xprs = require('express');
var rutas = xprs.Router();
const {body, param} = require("express-validator");
const createUploader = require('../multerConfig');
const uploadAdmin = createUploader('administradores');

rutas.get('/', administradoresController.index);

rutas.get('/:id', administradoresController.show);

const rulesPost = [
    body('nombres')
        .escape()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('apellidos')
        .escape()
        .notEmpty().withMessage('Los apellidos son obligatorios.'),
    body('telefono')
        .escape()
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isMobilePhone().withMessage('El teléfono debe ser un número válido.'),
    body('rfc')
        .escape()
        .notEmpty().withMessage('El RFC es obligatorio.')
        .isLength({ min: 12, max: 13 }).withMessage('El RFC debe tener entre 12 y 13 caracteres.'),
    body('nss')
        .escape()
        .notEmpty().withMessage('El NSS es obligatorio.')
        .isLength({ min: 11, max: 11 }).withMessage('El NSS debe tener 11 caracteres.'),
    body('email')
        .escape()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El correo electrónico debe ser válido.'),
    body('username')
        .escape()
        .notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    body('password')
        .escape()
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('rol')
        .escape()
        .notEmpty().withMessage('El rol es obligatorio.')
        .isIn(['superAdmin', 'administrador']).withMessage('El rol debe ser uno de los siguientes: superAdmin o administrador.')
];

rutas.post('/', uploadAdmin.single('imagen'),rulesPost, administradoresController.store);

const rulesPut = [
    param('id').isInt().withMessage('El ID que introduciste no es valido.'),

    body('nombres')
        .escape()
        .optional()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.'),
    body('apellidos')
        .escape()
        .optional()
        .notEmpty().withMessage('Los apellidos son obligatorios.'),
    body('telefono')
        .escape()
        .optional()
        .notEmpty().withMessage('El teléfono es obligatorio.')
        .isMobilePhone().withMessage('El teléfono debe ser un número válido.'),
    body('rfc')
        .escape()
        .optional()
        .notEmpty().withMessage('El RFC es obligatorio.')
        .isLength({ min: 12, max: 13 }).withMessage('El RFC debe tener entre 12 y 13 caracteres.'),
    body('nss')
        .escape()
        .optional()
        .notEmpty().withMessage('El NSS es obligatorio.')
        .isLength({ min: 11, max: 11 }).withMessage('El NSS debe tener 11 caracteres.'),
    body('email')
        .escape()
        .optional()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El correo electrónico debe ser válido.'),
    body('username')
        .escape()
        .optional()
        .notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    body('password')
        .escape()
        .optional({ checkFalsy: true })
        //.notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('rol')
        .escape()
        .optional()
        .notEmpty().withMessage('El rol es obligatorio.')
        .isIn(['superAdmin', 'administrador', 'admin']).withMessage('El rol debe ser uno de los siguientes: superAdmin o administrador.')
];

rutas.put('/:id', uploadAdmin.single('imagen'),rulesPut, administradoresController.update);

rutas.delete('/:id', administradoresController.destroy);

module.exports = rutas;