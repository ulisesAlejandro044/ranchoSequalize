const db = require('../../models'); 
const Administrador = db.Administrador;
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// --- Métodos CRUD ---

/**
 * GET /administradores (CRUD: Leer todos)
 */
async function index(req, res) {
    try {
        const administradores = await Administrador.findAll({
            // Excluimos el campo 'password' de la consulta por seguridad
            attributes: { exclude: ['password'] }
        });

        res.json({
            message: 'Lista de administradores obtenida con éxito.',
            data: administradores
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en la consulta: ' + error.message });
    }
}

/**
 * GET /administradores/:id (CRUD: Leer uno)
 */
async function show(req, res) {
    try {
        const id = req.params.id;

        const administrador = await Administrador.findByPk(id, {
            // Excluimos el campo 'password'
            attributes: { exclude: ['password'] }
        });

        if (!administrador) {
            return res.status(404).json({ mensaje: `Administrador con ID ${id} no encontrado.` });
        }

        res.json({
            message: `Administrador con ID ${id} obtenido con éxito.`,
            data: administrador
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el registro: ' + error.message });
    }
}

/**
 * POST /administradores (CRUD: Crear)
 */
async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // Si la validación falla, eliminamos el archivo subido para no dejar basura.
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error al eliminar archivo tras validación fallida:', err);
            });
        }
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        
        // Si Multer subió un archivo, guardamos su ruta relativa
        if (req.file) {
            // Guardamos una ruta relativa que pueda ser servida públicamente
            datos.imagen = `/administradores/${req.file.filename}`;
        }

        // El hashing de la contraseña debería hacerse con un hook de Sequelize
        // en el modelo (beforeCreate), pero lo dejamos aquí como referencia.

        const nuevoAdmin = await Administrador.create(datos);

        // Creamos una copia del objeto para poder eliminar el password antes de enviarlo
        const adminResponse = nuevoAdmin.toJSON();
        delete adminResponse.password;

        res.status(201).json({
            message: 'Administrador creado con éxito.',
            data: adminResponse
        });
    } catch (error) {
        if (req.file) { // Si la creación en BD falla, también borramos el archivo.
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error al eliminar archivo tras fallo en BD:', err);
            });
        }

        // Manejo de errores específicos de Sequelize
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(400).json({
                mensaje: `Error: Ya existe un registro con este valor en el campo ${field}.`,
                errors: [{ msg: `El valor proporcionado ya está registrado.`, param: field }]
            });
        }

        res.status(500).json({ mensaje: 'Error al crear el registro: ' + error.message });
    }
}

/**
 * PUT /administradores/:id (CRUD: Actualizar)
 */
async function update(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error al eliminar archivo tras validación fallida:', err);
            });
        }
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const id = req.params.id;
        const datos = req.body;

        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            return res.status(404).json({ mensaje: 'Administrador no encontrado.' });
        }

        // Si se subió un nuevo archivo
        if (req.file) {
            // 1. Borramos la imagen anterior si existe
            if (administrador.imagen) {
                // Construimos la ruta absoluta al archivo viejo para poder borrarlo
                const imagenAnteriorPath = path.resolve('./uploads' + administrador.imagen);
                if(fs.existsSync(imagenAnteriorPath)) {
                    fs.unlinkSync(imagenAnteriorPath);
                }
            }
            // 2. Asignamos la ruta de la nueva imagen
            datos.imagen = `/administradores/${req.file.filename}`;
        }

        await administrador.update(datos);

        const adminResponse = administrador.toJSON();
        delete adminResponse.password;

        res.json({
            mensaje: 'Registro actualizado con éxito.',
            data: adminResponse
        });
    } catch (error) {
        if (req.file) { // Si la actualización en BD falla, borramos el nuevo archivo.
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error al eliminar archivo tras fallo en BD:', err);
            });
        }

        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            return res.status(400).json({
                mensaje: `Error: Ya existe un registro con este valor en el campo ${field}.`
            });
        }
        res.status(500).json({ mensaje: 'Error al actualizar el registro: ' + error.message });
    }
}

/**
 * DELETE /administradores/:id (CRUD: Eliminar)
 */
async function destroy(req, res) {
    try {
        const id = req.params.id;

        const administrador = await Administrador.findByPk(id);
        if (!administrador) {
            return res.status(404).json({ mensaje: 'Administrador no encontrado para eliminar.' });
        }

        // Guardamos la ruta de la imagen antes de eliminar el registro
        const imagenPath = administrador.imagen;

        // Eliminamos el registro de la base de datos
        await administrador.destroy();

        // Si existía una imagen asociada, la eliminamos del servidor
        if (imagenPath) {
            const imagenAbsolutaPath = path.resolve('./uploads' + imagenPath);
            if (fs.existsSync(imagenAbsolutaPath)) {
                fs.unlinkSync(imagenAbsolutaPath);
            }
        }

        res.json({ mensaje: 'Registro de administrador eliminado con éxito.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
    }
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
};