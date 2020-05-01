const express = require("express");
const morgan = require('morgan')
require('dotenv').config()


const app = express();
app.use(express.json());
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

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});