const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Tanque = db.Tanque; 

async function index(req, res) {
    try {
        // SELECT * FROM tanques
        const tanques = await Tanque.findAll();
        res.json({ data: tanques });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de tanques: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM tanques WHERE id = ?
        const tanque = await Tanque.findByPk(id);

        if (!tanque) {
            return res.status(404).json({ mensaje: 'Tanque no encontrado.' });
        }

        res.json({ data: tanque });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el tanque: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO tanques (capacidad, temperatura, estado, leche_id) VALUES (?, ?, ?, ?)
        const nuevoRegistro = await Tanque.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Tanque creado con éxito.',
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
        
        // UPDATE tanques SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Tanque.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const tanqueExistente = await Tanque.findByPk(id);
            if (!tanqueExistente) {
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
                    const filasEliminadas = await Tanque.destroy({
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
    index, show, store, update, destroy
};