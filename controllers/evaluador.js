const s_pg = require("../services/postgres")



let guardar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let evaluador = req.body;
    let sql = 'insert into acc_usuarios (id,nombre,apellidos,correo,ocupacion,clave,afiliacion_institucional,rol) values($1,$2,$3,$4,$5,md5($6),$7,$8);'
    await servicio.eje_sql(sql, [evaluador.idevaluador, evaluador.nombre, evaluador.apellidos, evaluador.correo, evaluador.cargo, evaluador.clave, evaluador.afiliacion, 1]).
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
    let sql = 'select id,nombre,apellidos,afiliacion_institucional,ocupacion,correo from acc_usuarios;'
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
    let sql = 'select id,nombre,apellidos,afiliacion_institucional,ocupacion,correo  from acc_usuarios where id = $1;'
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
    let sql = 'update acc_usuarios set nombre = $1,' +
        'apellidos = $2 ,idevaluador = $3 , afiliacion_institucional = $4, ' +
        'ocupacion = $5, correo = $6 where id = $5;'
    await servicio.eje_sql(sql, [evaluador.nombre, evaluador.apellidos,
        evaluador.idevaluador, evaluador.afiliacion,
        evaluador.cargo, id_evaluador, evaluador.correo
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
    let sql = 'delete from acc_usuarios where id = $1 ;'
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

/*let obtener_propuestas_en_revision = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id;
    let sql = 'select publicacionrevision.id,fechasubida,data,materiaestudio,nombre from publicacionrevision inner join  (select distinct on(idpublicacion) idpublicacion from registroevaluacion inner join publicacionrevision on idpublicacionrevision = publicacionrevision.id where idevaluador = $1)as tabaux on tabaux.idpublicacion = publicacionrevision.idpublicacion inner join publicacion on publicacion.id = publicacionrevision.idpublicacion where estado = 0;'

    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => res.status(200).send({
        message: ' exitoso ',
        publicaciones: bd_res.rows
    })).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))


}*/

// no olvidar agregar el archivo
let obtener_propuestas_nuevas = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select pu_propuestas_publicaciones.id as id_publicacion,titulo,area,facultad,tipo_publicacion,pu_seguimientos_propuestas.archivo from pu_propuestas_publicaciones left  join pu_publicacion_revision on pu_propuestas_publicaciones.id = id_publicacion inner join pu_seguimientos_propuestas on pu_seguimientos_propuestas.id_propuesta = pu_propuestas_publicaciones.id where pu_publicacion_revision.id is null and pu_seguimientos_propuestas.estado = $1;'
    await servicio.eje_sql(sql, ['aprobado']).then(bd_res => {

        res.status(200).send({
            publicaciones: bd_res.rows,
            message: "exitoso"
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}

let obtener_en_espera_evaluar = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id
    let sql = ' select pu_publicacion_revision.id,pu_propuestas_publicaciones.id as idpub,titulo,area,facultad,tipo_publicacion,archivo from pu_propuestas_publicaciones inner join pu_publicacion_revision on pu_propuestas_publicaciones.id = id_publicacion where estado = 0 and id_evaluador = $1;'
    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => {
        res.status(200).send({
            publicaciones: bd_res.rows,
            message: "exitoso"
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))
}

let obtener_evaluadas = async(req, res) => {
    let servicio = new s_pg()
    let idautor = req.params.id
    let sql = 'select registroevaluacion.id,fechaevaluacion,organizacion,temporalidad,aportesobras,resultadofinal,concepto from registroevaluacion inner join  publicacionrevision on publicacionrevision.id = idpublicacionrevision where idevaluador = $1 and estado = 1'
    await servicio.eje_sql(sql, [idautor]).then(bd_res => {
        res.status(200).send({
            publicaciones: bd_res.rows,
            message: "exitoso"
        })
    }).catch(error => res.status(500).send({
        message: 'se detecto un error',
        error: error
    }))


}

module.exports = {
    guardar_evaluador,
    obtener_evaluador,
    obtener_evaluadores,
    actualizar_evaluador,
    eliminar_evaluador,
    obtener_propuestas_nuevas,
    obtener_en_espera_evaluar,
    obtener_evaluadas
}