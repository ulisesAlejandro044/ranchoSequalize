const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Proveedor = db.Proveedor; 

async function index(req, res) {
    try {
        // SELECT * FROM proveedores
        const proveedores = await Proveedor.findAll();
        res.json({ data: proveedores });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de proveedores: ' + error.message });
    }
}

async function store(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }

    try {
        const datos = req.body;
        // INSERT INTO proveedores (nombre, direccion, correo, telefono, categoria, estado) VALUES (?, ?, ?, ?, ?, ?)
        const nuevoRegistro = await Proveedor.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Proveedor creado con éxito.',
            data: nuevoRegistro 
        }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM proveedores WHERE id = ?
        const proveedor = await Proveedor.findByPk(id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado.' });
        }

        res.json({ data: proveedor });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el proveedor: ' + error.message });
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
        
        // UPDATE proveedores SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Proveedor.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const proveedorExistente = await Proveedor.findByPk(id);
            if (!proveedorExistente) {
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
        
        // CORRECCIÓN: Realizamos eliminación lógica (cambio de estado) sobre el proveedor
        // UPDATE proveedores SET estado = 'INACTIVO' WHERE id = ?
        const [filasActualizadas] = await Proveedor.update({ estado: 'INACTIVO' }, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado para desactivar.' });
        }

        res.json({ mensaje: 'Proveedor marcado como INACTIVO con éxito.', filas: filasActualizadas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al desactivar el registro: ' + error.message });
    }
}

module.exports = {
    index, store, show, update, destroy
};