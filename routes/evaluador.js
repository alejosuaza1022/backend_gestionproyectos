const express = require('express')
const router = express.Router()
const controlador_eval = require('../controllers/evaluador')


router.get('/', controlador_eval.obtener_evaluadores);
router.post('/', controlador_eval.guardar_evaluador);
router.get('/propuestas_dis', controlador_eval.obtener_propuestas_disponibles);
router.get('/:id', controlador_eval.obtener_evaluador);
router.delete('/:id', controlador_eval.eliminar_evaluador);
router.put('/:id', controlador_eval.actualizar_evaluador);
module.exports = router