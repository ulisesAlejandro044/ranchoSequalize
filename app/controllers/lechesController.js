const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Leche = db.Leche; 

async function index(req, res) {
    try {
        // SELECT * FROM leches
        const leches = await Leche.findAll();
        res.json({ data: leches });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de registros de leche: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM leches WHERE id = ?
        const leche = await Leche.findByPk(id);

        if (!leche) {
            return res.status(404).json({ mensaje: 'Registro de leche no encontrado.' });
        }

        res.json({ data: leche });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el registro de leche: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO leches (fecha, cantidad, densidad, tanque_id, ganado_id) VALUES (?, ?, ?, ?, ?)
        const nuevoRegistro = await Leche.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Registro de leche creado con éxito.',
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
        
        // UPDATE leches SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Leche.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const lecheExistente = await Leche.findByPk(id);
            if (!lecheExistente) {
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
        
        // CORRECCIÓN: Eliminamos el registro de la tabla 'leches'
        // DELETE FROM leches WHERE id = ?
        const filasEliminadas = await Leche.destroy({
            where: { id: id }
        });

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado para eliminar.' });
        }

        res.json({ mensaje: 'Registro de leche eliminado con éxito.', filas: filasEliminadas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
    }
}

module.exports = {
    index, store, show, update, destroy
};