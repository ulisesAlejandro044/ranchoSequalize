const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Corral = db.Corral; // Accedemos al modelo Corral

async function index(req, res) {
    try {
        // SELECT * FROM corrales
        const corrales = await Corral.findAll();
        res.json({ data: corrales });
    } catch (error) {
        // Manejo de error estandarizado con Sequelize
        res.status(500).json({ mensaje: 'Error al consultar la lista de corrales: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM corrales WHERE id = ?
        const corral = await Corral.findByPk(id);

        if (!corral) {
            return res.status(404).json({ mensaje: 'Corral no encontrado.' });
        }

        res.json({ data: corral });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el corral: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO corrales (capacidad, estado) VALUES (?, ?)
        const nuevoCorral = await Corral.create(datos);
        
        // Devolvemos el objeto completo creado por Sequelize
        res.status(201).json({ 
            mensaje: 'Corral creado con éxito.',
            data: nuevoCorral 
        }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro: ' + error.message });
    }
}

async function update(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const id = req.params.id;
        const datos = req.body;
        
        // UPDATE corrales SET campo1 = ?, campo2 = ? WHERE id = ?
        const [filasActualizadas] = await Corral.update(datos, {
            where: { id: id }
        });

        // Verificar si se actualizó algún registro
        if (filasActualizadas === 0) {
            // Verificamos si el ID existe
            const corralExistente = await Corral.findByPk(id);
            if (!corralExistente) {
                return res.status(404).json({ mensaje: 'Registro no encontrado.' });
            }
            return res.status(200).json({ mensaje: 'Registro sin modificaciones.' });
        }

        res.json({ mensaje: 'Registro actualizado con éxito.', filas: filasActualizadas });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el registro: ' + error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        // DELETE FROM corrales WHERE id = ?
        const filasEliminadas = await Corral.destroy({
            where: { id: id }
        });

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado para eliminar.' });
        }

        res.json({ mensaje: 'Registro eliminado con éxito.', filas: filasEliminadas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
    }
}

module.exports = {
    index, store, show, update, destroy
};