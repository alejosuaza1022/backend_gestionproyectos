const express = require('express')
const router = express.Router()
const controlador_pub_rev = require('../controllers/publicacion_revision')
const autenticacion = require('..//controllers/autenticacion')


router.use(autenticacion.middleware_validar_persona)
router.get('/', controlador_pub_rev.obtener_publicacion_revisiones);
router.post('/', controlador_pub_rev.verificar_revision, controlador_pub_rev.guardar_publicacion_revision);
router.get('/:id', controlador_pub_rev.obtener_publicacion_revision);
router.delete('/:id', controlador_pub_rev.eliminar_publicacion_revision);
router.put('/:id', controlador_pub_rev.actualizar_publicacion_revision);

module.exports = router