const express = require('express')
const router = express.Router()
const controlador_autor = require('../controllers/autor')
const autenticacion = require('..//controllers/autenticacion')


router.post('/login', autenticacion.validar_persona);
router.get('/obras_autor/:id', autenticacion.middleware_validar_persona, controlador_autor.obtener_publicaciones_autor);
router.get('/estado-obra/:id', autenticacion.middleware_validar_persona, controlador_autor.obtener_estado_publicacion)

module.exports = router