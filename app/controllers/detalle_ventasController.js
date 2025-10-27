const db = require('../../models');
const DetalleVenta = db.DetalleVenta; // Accedemos al modelo DetalleVenta

// El index de tu antiguo proyecto usaba 'c.query', lo cambiamos a findAll()
async function index(req, res) {
    try {
        // SELECT * FROM detalle_ventas
        const detalles = await DetalleVenta.findAll();
        res.json({ data: detalles });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el detalle de ventas: ' + error.message });
    }
}

// Implementación de STORE (Crear)
async function store(req, res) {
    // Si tienes validaciones en tu archivo de rutas, descomenta las líneas de validationResult
    // const result = validationResult(req);
    // if (!result.isEmpty()) { return res.status(422).json({ errors: result.array() }); }

    try {
        const datos = req.body;
        // INSERT INTO detalle_ventas (...) VALUES (...)
        const nuevoDetalle = await DetalleVenta.create(datos);
        
        res.status(201).json({ 
            mensaje: 'Detalle de venta creado con éxito.',
            data: nuevoDetalle 
        }); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro: ' + error.message });
    }
}

// Implementación de SHOW (Leer por ID)
async function show(req, res) {
    try {
        const id = req.params.id;
        // SELECT * FROM detalle_ventas WHERE id = ?
        const detalle = await DetalleVenta.findByPk(id);

        if (!detalle) {
            return res.status(404).json({ mensaje: 'Detalle de venta no encontrado.' });
        }

        res.json({ data: detalle });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el detalle de venta: ' + error.message });
    }
}

// Implementación de UPDATE (Actualizar)
async function update(req, res) {
    // Si tienes validaciones, inclúyelas aquí.

    try {
        const id = req.params.id;
        const datos = req.body;
        
        // UPDATE detalle_ventas SET campo = ? WHERE id = ?
        const [filasActualizadas] = await DetalleVenta.update(datos, {
            where: { id: id }
        });

        if (filasActualizadas === 0) {
            const detalleExistente = await DetalleVenta.findByPk(id);
            if (!detalleExistente) {
                return res.status(404).json({ mensaje: 'Registro no encontrado.' });
            }
            return res.status(200).json({ mensaje: 'Registro sin modificaciones.' });
        }

        res.json({ mensaje: 'Registro actualizado con éxito.', filas: filasActualizadas });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el registro: ' + error.message });
    }
}

// Implementación de DESTROY (Eliminar)
async function destroy(req, res) {
    try {
        const id = req.params.id;
        // DELETE FROM detalle_ventas WHERE id = ?
        const filasEliminadas = await DetalleVenta.destroy({
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