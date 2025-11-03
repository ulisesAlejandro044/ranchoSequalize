const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Raza = db.Raza; 

async function index(req, res) {
    try {
        // SELECT * FROM razas
        const razas = await Raza.findAll();
        res.json({ data: razas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de razas: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM razas WHERE id = ?
        const raza = await Raza.findByPk(id);

        if (!raza) {
            return res.status(404).json({ mensaje: 'Raza no encontrada.' });
        }

        res.json({ data: raza });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la raza: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO razas (nombre, origen, descripcion, estado) VALUES (?, ?, ?, ?)
        const nuevoRegistro = await Raza.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Raza creada con éxito.',
            data: nuevoRegistro 
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
        
        // UPDATE razas SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Raza.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const razaExistente = await Raza.findByPk(id);
            if (!razaExistente) {
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
                const filasEliminadas = await Raza.destroy({
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