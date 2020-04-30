const s_pg = require("../services/postgres")



let guardar_registro_evaluacion = async(req, res) => {
    let servicio = new s_pg();
    let registro_evaluacion = req.body;
    let sql = 'insert into registroevaluacion(fechaevaluacion,organizacion,estilo,temporalidad,' +
        'aportesobras,resultadofinal,concepto,idevaluador,idpublicacionrevision)'
    'values($1,$2,$3,$4,$5,$6,$7,$8,$9);'
    await servicio.eje_sql(sql, [registro_evaluacion.fechaevaluacion,
        registro_evaluacion.organizacion, registro_evaluacion.estilo,
        registro_evaluacion.temporalidad, registro_evaluacion.aportesobras,
        registro_evaluacion.resultadofinal, registro_evaluacion.concepto,
        registro_evaluacion.idevaluador, registro_evaluacion.idpublicacionrevision
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' registro_evaluacion agregado ',
            registro_evaluacion: bd_res
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    })


}

let obtener_registro_evaluaciones = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select id,fechaevaluacion,resultadofinal,concepto,idevaluador,idpublicacionrevision from registroevaluacion;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            registro_evaluacion: bd_res.rows
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let obtener_registro_evaluacion = async(req, res) => {
    let servicio = new s_pg();
    let id_registro_evaluacion = req.params.id;
    let sql = 'select fechaevaluacion,resultadofinal,concepto,idevaluador,idpublicacionrevision from registroevaluacion where id = $1;'
    await servicio.eje_sql(sql, [id_registro_evaluacion]).then(bd_res => {
        res.status(200).send({
            message: ' registro_evaluacion agregada ',
            registro_evaluacion: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });

}

let actualizar_registro_evaluacion = async(req, res) => {
    let servicio = new s_pg();
    let registro_evaluacion = req.body;
    let id_registro_evaluacion = req.params.id;
    let sql = 'update registroevaluacion set fechaevaluacion = $1,organizacion= $2,estilo= $3,temporalidad= $4,' +
        'aportesobras = $5,resultadofinal = $6,concepto = $7,idevaluador = $8,idpublicacionrevision = $9 where id = $10;'
    await servicio.eje_sql(sql, [registro_evaluacion.fechaevaluacion,
        registro_evaluacion.organizacion, registro_evaluacion.estilo,
        registro_evaluacion.temporalidad, registro_evaluacion.aportesobras,
        registro_evaluacion.resultadofinal, registro_evaluacion.concepto,
        registro_evaluacion.idevaluador, registro_evaluacion.idpublicacionrevision,
        id_registro_evaluacion
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' registro_evaluacion agregado ',
            registro_evaluacion: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let eliminar_registro_evaluacion = async(req, res) => {
    let servicio = new s_pg();
    let id_registro_evaluacion = req.params.id
    let sql = 'delete from registroevaluacion where id = $1 ;'
    await servicio.eje_sql(sql, [id_registro_evaluacion]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            registro_evaluacion: bd_res
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });


}

module.exports = {
    guardar_registro_evaluacion,
    obtener_registro_evaluacion,
    obtener_registro_evaluaciones,
    actualizar_registro_evaluacion,
    eliminar_registro_evaluacion
}