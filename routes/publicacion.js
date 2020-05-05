const express = require('express')
const router = express.Router()
const controlador_publicacion = require('../controllers/publicacion')
const autenticacion = require('..//controllers/autenticacion')

router.use(autenticacion.middleware_validar_autor)
router.get('/', controlador_publicacion.obtener_publicaciones);
router.post('/', controlador_publicacion.guardar_publicacion);
router.get('/:id', controlador_publicacion.obtener_publicacion);
router.delete('/:id', controlador_publicacion.eliminar_publicacion);
router.put('/:id', controlador_publicacion.actualizar_publicacion);
router.get('/revisiones_publicacion/:id', controlador_publicacion.obtener_revisiones_publicacion);

module.exports = router