const express = require('express')
const router = express.Router()
const controlador_eval = require('../controllers/evaluador')
const autenticacion = require('..//controllers/autenticacion')


router.get('/', controlador_eval.obtener_evaluadores);
router.post('/login', autenticacion.validar_persona);
router.post('/', controlador_eval.guardar_evaluador);
router.get('/', controlador_eval.obtener_evaluadores);
router.get('/verificar', autenticacion.verificarAut);
router.use(autenticacion.middleware_validar_persona)
router.get('/propuestas-nuevas', controlador_eval.obtener_propuestas_nuevas);
router.get('/:id', controlador_eval.obtener_evaluador);
router.delete('/:id', controlador_eval.eliminar_evaluador);
router.get('/espera-evaluar/:id', controlador_eval.obtener_en_espera_evaluar)
router.put('/:id', controlador_eval.actualizar_evaluador);
router.get('/obtener-evaluadas/:id', controlador_eval.obtener_evaluadas);


module.exports = router