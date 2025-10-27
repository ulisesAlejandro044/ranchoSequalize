const { validationResult } = require('express-validator');
const db = require('../../models');
const Ganado = db.Ganado;
const fs = require('fs');
const path = require('path');

// --- Métodos CRUD ---

/**
 * GET /ganados (CRUD: Leer todos)
 */
async function index(req, res) {
    try {
        const ganados = await Ganado.findAll({
            // Para incluir datos de tablas relacionadas (si tienes las asociaciones definidas)
            // include: [db.Raza, db.Categoria, db.Corral] 
        });

        res.json({
            message: 'Lista de ganado obtenida con éxito.',
            data: ganados
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de ganado: ' + error.message });
    }
}

/**
 * GET /ganados/:id (CRUD: Leer uno)
 */
async function show(req, res) {
    try {
        const id = req.params.id;
        const ganado = await Ganado.findByPk(id);

        if (!ganado) {
            return res.status(404).json({ mensaje: `Ganado con ID ${id} no encontrado.` });
        }

        res.json({
            message: `Ganado con ID ${id} obtenido con éxito.`,
            data: ganado
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el registro: ' + error.message });
    }
}

/**
 * POST /ganados (CRUD: Crear)
 */
async function store(req, res) {
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
        const datos = req.body;
        
        if (req.file) {
            // Construimos la ruta URL que se guardará en la base de datos
            datos.imagen = `/ganados/${req.file.filename}`;
        }

        const nuevoGanado = await Ganado.create(datos);

        res.status(201).json({
            message: 'Ganado registrado con éxito.',
            data: nuevoGanado
        });
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error al eliminar archivo tras fallo en BD:', err);
            });
        }

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
 * PUT /ganados/:id (CRUD: Actualizar)
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

        const ganado = await Ganado.findByPk(id);
        if (!ganado) {
            return res.status(404).json({ mensaje: 'Ganado no encontrado.' });
        }

        if (req.file) {
            // 1. Borramos la imagen anterior si existe
            if (ganado.imagen) {
                const imagenAnteriorPath = path.resolve('./uploads' + ganado.imagen);
                if(fs.existsSync(imagenAnteriorPath)) {
                    fs.unlinkSync(imagenAnteriorPath);
                }
            }
            // 2. Asignamos la ruta de la nueva imagen
            datos.imagen = `/ganados/${req.file.filename}`;
        }

        await ganado.update(datos);

        res.json({
            message: 'Registro de ganado actualizado con éxito.',
            data: ganado
        });
    } catch (error) {
        if (req.file) {
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
 * DELETE /ganados/:id (CRUD: Eliminar)
 */
async function destroy(req, res) {
    try {
        const id = req.params.id;

        const ganado = await Ganado.findByPk(id);
        if (!ganado) {
            return res.status(404).json({ mensaje: 'Ganado no encontrado para eliminar.' });
        }

        const imagenPath = ganado.imagen;
        await ganado.destroy();

        if (imagenPath) {
            const imagenAbsolutaPath = path.resolve('./uploads' + imagenPath);
            if (fs.existsSync(imagenAbsolutaPath)) {
                fs.unlinkSync(imagenAbsolutaPath);
            }
        }

        res.json({ mensaje: 'Registro de ganado eliminado con éxito.' });
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