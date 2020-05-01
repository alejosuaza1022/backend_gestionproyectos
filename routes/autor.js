const express = require('express')
const router = express.Router()
const controlador_autor = require('../controllers/autor')


router.get('/', controlador_autor.obtener_autores);
router.post('/', controlador_autor.guardar_autor)
router.get('/obras_autor/:id', controlador_autor.obtener_publicaciones_autor);
router.get('/:id', controlador_autor.obtener_autor);
router.delete('/:id', controlador_autor.eliminar_autor)
router.put('/:id', controlador_autor.actualizar_autor)

module.exports = router