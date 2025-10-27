const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Cliente = db.Cliente; // Accedemos al modelo Cliente

async function index(req, res) {
    try {
        // SELECT * FROM clientes
        const clientes = await Cliente.findAll();
        res.json({ data: clientes });
    } catch (error) {
        // El error de Sequelize ya es más detallado
        res.status(500).json({ mensaje: 'Error al consultar la lista de clientes: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM clientes WHERE id = ?
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado.' });
        }

        res.json({ data: cliente });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el cliente: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO clientes (nombre, direccion, telefono, correo) VALUES (?, ?, ?, ?)
        const nuevoCliente = await Cliente.create(datos);
        
        // Devolvemos el objeto completo creado por Sequelize
        res.status(201).json({ 
            mensaje: 'Cliente creado con éxito.',
            data: nuevoCliente 
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
        
        // UPDATE clientes SET campo1 = ?, campo2 = ? WHERE id = ?
        // La ventaja de Sequelize es que maneja el mapeo de campos dinámico automáticamente.
        const [filasActualizadas] = await Cliente.update(datos, {
            where: { id: id }
        });

        // Verificar si se actualizó algún registro
        if (filasActualizadas === 0) {
            // Buscamos si el ID existe, para dar un mensaje más preciso (404 si no existe)
            const clienteExistente = await Cliente.findByPk(id);
            if (!clienteExistente) {
                return res.status(404).json({ mensaje: 'Registro no encontrado.' });
            }
            // Si existe, pero no se modificó nada, devolvemos 200 (OK)
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
        // DELETE FROM clientes WHERE id = ?
        const filasEliminadas = await Cliente.destroy({
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