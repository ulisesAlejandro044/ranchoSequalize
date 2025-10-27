// app/controllers/categoriasController.js

// Importa el objeto 'db' de Sequelize que contiene todos tus modelos
const db = require('../../models'); 
const Categoria = db.Categoria; // Accede a tu modelo Categoria

const { validationResult } = require('express-validator');

async function index(req, res) {
  try {
    const categorias = await Categoria.findAll();
    res.json({
      message: 'Lista de categorías obtenida con éxito.',
      data: categorias
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en la consulta: ' + error.message });
  }
}

async function store(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  try {
    const datos = req.body;
    const nuevaCategoria = await Categoria.create(datos);
    res.status(201).json({ 
      message: 'Categoría creada con éxito.',
      data: nuevaCategoria
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el registro: ' + error.message });
  }
}

async function show(req, res) {
  try {
    const id = req.params.id;
    const categoria = await Categoria.findByPk(id); // Busca por clave primaria (ID)

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    res.json({ 
      message: `Categoría con ID ${id} obtenida con éxito.`,
      data: categoria
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error en la consulta: ' + error.message });
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

    // Actualiza la categoría y verifica si se modificó algo
    const [filasActualizadas, [categoriaActualizada]] = await Categoria.update(datos, {
      where: { id: id },
      returning: true // Devuelve el registro actualizado
    });

    if (filasActualizadas === 0) {
      return res.status(404).json({ mensaje: 'Registro no encontrado o no modificado.' });
    }

    res.json({ 
      mensaje: 'Registro actualizado con éxito.', 
      data: categoriaActualizada 
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el registro: ' + error.message });
  }
}

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const filasEliminadas = await Categoria.destroy({
      where: { id: id }
    });

    if (filasEliminadas === 0) {
      return res.status(404).json({ mensaje: 'Registro no encontrado para eliminar.' });
    }

    res.json({ mensaje: 'Registro eliminado con éxito.' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el registro: ' + error.message });
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy
};