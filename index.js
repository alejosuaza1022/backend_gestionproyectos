const express = require("express");
const morgan = require('morgan')
var cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json());
const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles: true,

}))
app.use(morgan('dev'))
const autor_rutas = require('./routes/autor')
app.use('/api/autor', autor_rutas)

const publicacion_rutas = require('./routes/publicacion')
app.use('/api/publicacion', publicacion_rutas)

const publi_revi_rutas = require('./routes/publicacion_revision')
app.use('/api/publicacion_rev', publi_revi_rutas)

const eval_rutas = require('./routes/evaluador')
app.use('/api/evaluador', eval_rutas)

const registro_evaluacion = require('./routes/registro_evaluacion')
app.use('/api/registro_eval', registro_evaluacion)

const mail = require('./routes/mail')
app.use('/api/mail', mail)

const pdf = require('./routes/crearPdf')
app.use('/api/pdf', pdf)



const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(process.env.PORT);
});