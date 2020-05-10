const express = require('express')
const router = express.Router()
const controlador_publicacion = require('../controllers/publicacion')
const autenticacion = require('..//controllers/autenticacion')

router.use(autenticacion.middleware_validar_persona)
router.get('/', controlador_publicacion.obtener_publicaciones);
router.get('/:id', controlador_publicacion.obtener_publicacion);

module.exports = router