const s_pg = require("../services/postgres")



let guardar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let evaluador = req.body;
    let sql = 'insert into evaluador(nombre,apellidos,idevaluador,afiliacion,cargo,clave) values($1,$2,$3,$4,$5,md5($6));'
    await servicio.eje_sql(sql, [evaluador.nombre, evaluador.apellidos,
        evaluador.idevaluador, evaluador.afiliacion, evaluador.cargo, evaluador.clave
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' evaluador agregado ',
            evaluador: bd_res
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))


}

let obtener_evaluadores = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select nombre,apellidos,idevaluador,afiliacion,cargo from evaluador;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            evaluador: bd_res.rows
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));
}

let obtener_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id;
    let sql = 'select nombre,apellidos,idevaluador,afiliacion,cargo  from evaluador where idevaluador = $1;'
    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => {
        message = bd_res.rowCount === 0 ? 'no hay coincidencias' : 'exitoso';
        res.status(200).send({
            message: message,
            evaluador: bd_res.rows[0]
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));

}

let actualizar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let evaluador = req.body;
    let id_evaluador = req.params.id;
    let sql = 'update evaluador set nombre = $1,' +
        'apellidos = $2 ,idevaluador = $3 , afiliacion = $4, ' +
        'cargo = $5 where idevaluador = $6;'
    await servicio.eje_sql(sql, [evaluador.nombre, evaluador.apellidos,
        evaluador.idevaluador, evaluador.afiliacion,
        evaluador.cargo, id_evaluador
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' evaluador actualizado ',
            evaluador: bd_res.rows[0]
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));
}

let eliminar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id
    let sql = 'delete from evaluador where idevaluador = $1 ;'
    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            evaluador: bd_res
        });
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }));


}
let obtener_propuestas_en_revision = async(req, res) => {
    let servicio = new s_pg();
    const estado = 0;
    let sql = 'select publicacionrevision.idpublicacion,fechasubida,data,materiaestudio,nombre from publicacionrevision inner join  (select distinct on(idpublicacion) idpublicacion from registroevaluacion inner join publicacionrevision on idpublicacionrevision = publicacionrevision.id where idevaluador = $1)as tabaux on tabaux.idpublicacion = publicacionrevision.idpublicacion inner join publicacion on publicacion.id = publicacionrevision.idpublicacion where estado = 0;'

    await servicio.eje_sql(sql, [estado]).then(bd_res => res.status(200).send({
        message: ' exitoso ',
        evaluador: bd_res.rows
    })).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}
let obtener_propuestas_nuevas = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select data,nombre,materiaestudio,fechasubida from publicacionrevision inner join publicacion on idpublicacion = publicacion.id inner join (select idpublicacion as id2 from publicacionrevision inner join publicacion on publicacion.id = idpublicacion group by idpublicacion having count(idpublicacion) = 1)as tbaux on idpublicacion = id2 where estado = 0;'




}

module.exports = {
    guardar_evaluador,
    obtener_evaluador,
    obtener_evaluadores,
    actualizar_evaluador,
    eliminar_evaluador,
    obtener_propuestas_en_revision,
    obtener_propuestas_nuevas
}