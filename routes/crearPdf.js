const express = require('express')
const router = express.Router()
const pdfService = require('../services/pdfService')

router.post("/", pdfService.crearPDF)

module.exports = router;