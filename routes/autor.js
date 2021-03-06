const express = require('express')
const router = express.Router()
const controlador_autor = require('../controllers/autor')
const autenticacion = require('..//controllers/autenticacion')
const base64 = require('base64topdf');




router.get("/verificar", autenticacion.decode_pesona)
router.post('/login', autenticacion.validar_persona);
router.get('/obras-autor/:id', autenticacion.middleware_validar_persona, controlador_autor.obtener_publicaciones_autor);
router.get('/estado-obra/:id/:id_autor', autenticacion.middleware_validar_persona, controlador_autor.obtener_estado_publicacion)

module.exports = router