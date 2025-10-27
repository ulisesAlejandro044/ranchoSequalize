const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Rastro = db.Rastro; 
const Ganado = db.Ganado; // Importamos Ganado para cualquier lógica relacionada si fuera necesaria

async function index(req, res) {
    try {
        // SELECT * FROM rastros
        const rastros = await Rastro.findAll();
        res.json({ data: rastros });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de rastros: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM rastros WHERE id = ?
        const rastro = await Rastro.findByPk(id);

        if (!rastro) {
            return res.status(404).json({ mensaje: 'Registro de rastro no encontrado.' });
        }

        res.json({ data: rastro });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el registro de rastro: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO rastros (fecha, destino, estado, ganado_id) VALUES (?, ?, ?, ?)
        const nuevoRegistro = await Rastro.create(datos);
        
        // Lógica adicional: Marcar el Ganado como "En Rastro"
        // if (datos.ganado_id) {
        //     await Ganado.update({ estado: 'EN_RASTRO' }, { where: { id: datos.ganado_id } });
        // }

        res.status(201).json({ 
            mensaje: 'Registro de rastro creado con éxito.',
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
        
        // UPDATE rastros SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Rastro.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const rastroExistente = await Rastro.findByPk(id);
            if (!rastroExistente) {
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
        
        // Eliminación física del registro de rastro
        // DELETE FROM rastros WHERE id = ?
        const filasEliminadas = await Rastro.destroy({
            where: { id: id }
        });

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Registro de rastro no encontrado para eliminar.' });
        }
        
        // Lógica adicional: Podrías querer revertir el estado del Ganado aquí
        // if (filasEliminadas > 0) {
        //     const rastro = await Rastro.findByPk(id);
        //     if (rastro) {
        //         await Ganado.update({ estado: 'ACTIVO' }, { where: { id: rastro.ganado_id } });
        //     }
        // }


        res.json({ mensaje: 'Registro de rastro eliminado con éxito.', filas: filasEliminadas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
    }
}

module.exports = {
    index, show, store, update, destroy
};