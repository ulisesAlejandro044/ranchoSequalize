const { validationResult } = require('express-validator');
// Importamos el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models');
const Venta = db.Venta; 
const Cliente = db.Cliente; // Importamos Cliente para referencia o futuras consultas JOIN

async function index(req, res) {
    try {
        // SELECT * FROM ventas
        const ventas = await Venta.findAll();
        res.json({ data: ventas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la lista de ventas: ' + error.message });
    }
}

async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM ventas WHERE id = ?
        const venta = await Venta.findByPk(id);

        if (!venta) {
            return res.status(404).json({ mensaje: 'Venta no encontrada.' });
        }

        res.json({ data: venta });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la venta: ' + error.message });
    }
}

async function store(req, res) {
    // Nota: Aunque el código original no usaba validationResult, lo incluimos para buenas prácticas
    // const result = validationResult(req); 
    // if (!result.isEmpty()) { 
    //     return res.status(422).json({ errors: result.array() });
    // }

    try {
        const datos = req.body;
        // INSERT INTO ventas (precio, fecha, total, estado, cliente_id) VALUES (?, ?, ?, ?, ?)
        const nuevaVenta = await Venta.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Venta creada con éxito.',
            data: nuevaVenta 
        }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la venta: ' + error.message });
    }
}

async function update(req, res) {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //     return res.status(422).json({ errors: result.array() });
    // }

    try {
        const id = req.params.id;
        const datos = req.body;
        
        // UPDATE ventas SET campo = ? WHERE id = ?
        const [filasActualizadas] = await Venta.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const ventaExistente = await Venta.findByPk(id);
            if (!ventaExistente) {
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
        
        // CORRECCIÓN: Realizamos una eliminación lógica (cambio de estado) si es preferible, o eliminación física.
        // Optaremos por la eliminación física si no hay un campo 'estado' claro en el código original.
        
        // ELIMINACIÓN FÍSICA: DELETE FROM ventas WHERE id = ?
        const filasEliminadas = await Venta.destroy({
            where: { id: id }
        });

        if (filasEliminadas === 0) {
            return res.status(404).json({ mensaje: 'Venta no encontrada para eliminar.' });
        }

        res.json({ mensaje: 'Venta eliminada con éxito.', filas: filasEliminadas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
    }
}

module.exports = {
    index, store, show, update, destroy
};