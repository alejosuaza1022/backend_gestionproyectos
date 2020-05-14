
const express = require('express')
const router = express.Router()
const mailservice = require('../services/nodemailer')
const _correo = new mailservice()

router.post("/", _correo.enviarCorreo)

module.exports = router;