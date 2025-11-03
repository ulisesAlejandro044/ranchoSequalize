const xprs = require('express');
const router = xprs.Router();
const { registrar, login, perfil } = require('../app/controllers/authController');
const { verificarToken } = require('../middleware/auth');

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

module.exports = router;
