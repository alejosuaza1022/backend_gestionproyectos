const express = require('express')
const router = express.Router()
const controlador_autor = require('../controllers/autor')
const autenticacion = require('..//controllers/autenticacion')


router.post('/login', autenticacion.validar_autor);
router.post('/', controlador_autor.guardar_autor);
router.use(autenticacion.middleware_validar_autor)
router.get('/', controlador_autor.obtener_autores);
router.get('/obras_autor/:id', autenticacion.middleware_validar_autor, controlador_autor.obtener_publicaciones_autor);
router.get('/:id', controlador_autor.obtener_autor);
router.delete('/:id', controlador_autor.eliminar_autor);
router.put('/:id', controlador_autor.actualizar_autor);

module.exports = router