const express = require('express')
const router = express.Router()
const controlador_eval = require('../controllers/evaluador')
const autenticacion = require('..//controllers/autenticacion')


router.post("/login", autenticacion.validar_evaluador);
router.post('/', controlador_eval.guardar_evaluador);
router.get('/', controlador_eval.obtener_evaluadores);
router.get('/verificar', autenticacion.verificarAut);

router.use(autenticacion.middleware_validar_evaluador)
router.get('/propuestas_en_revision/:id', controlador_eval.obtener_propuestas_en_revision);
router.get('/propuestas_nuevas', controlador_eval.obtener_propuestas_nuevas);
router.get('/:id', controlador_eval.obtener_evaluador);
router.delete('/:id', controlador_eval.eliminar_evaluador);
router.get('/obtener_en_espera_evaluar/:id', controlador_eval.obtener_en_espera_evaluar)
router.put('/:id', controlador_eval.actualizar_evaluador);
router.get('/obtener_evaluadas/:id', controlador_eval.obtener_evaluadas);


module.exports = router