const express = require('express')
const router = express.Router()
const controlador_reg_pub = require('../controllers/registro_evaluacion')


router.get('/', controlador_reg_pub.obtener_registro_evaluaciones);
router.post('/', controlador_reg_pub.guardar_registro_evaluacion);
router.get('/:id', controlador_reg_pub.obtener_registro_evaluacion);
router.delete('/:id', controlador_reg_pub.eliminar_registro_evaluacion);
router.put('/:id', controlador_reg_pub.actualizar_registro_evaluacion);

module.exports = router