const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../models/index');
const Administrador = db.Administrador;

const SECRET_KEY = 'miclaveultrasecreta123';

exports.registrar = async (req, res) => {
  try {
    const { nombres, apellidos, telefono, rfc, nss, email, username, password, rol } = req.body;

    const existe = await Administrador.findOne({ where: { username } });
    if (existe) return res.status(400).json({ mensaje: 'El usuario ya existe' });

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevo = await Administrador.create({
      nombres, apellidos, telefono, rfc, nss, email, username, password: passwordHash, rol
    });

    res.json({ mensaje: 'Administrador registrado correctamente', data: nuevo });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Administrador.findOne({ where: { username } });
    if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, username: usuario.username, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const usuario = await Administrador.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
  }
};
