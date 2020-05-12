const s_pg = require("../services/postgres")
const base64 = require('base64topdf');

/// validar fecha de realización de una correción también que sea mayor a la fecha de subida


let guardar_publicacion_revision = async(req, res) => {
        let servicio = new s_pg();
        let publicacion_revision = req.body;
        let tmp = ''
        try {
            let archivo = req.files.archivo;
            tmp = base64.base64Encode(archivo.tempFilePath)

        } catch (erro) {
            res.send({ error: erro, message: "error pdf" })
            return
        }
        try {
            let resp = (await middle_verificar_fecha(publicacion_revision.fechasubida, publicacion_revision.idpublicacion))
            let bool = true;
            if (resp.rowCount !== 0) {
                bool = resp.rows[0].plazo_maximo;
            }
            if (bool) {
                _guardar(publicacion_revision, servicio, tmp).then(async bd_res => {
                        res.send({
                            data: bd_res,
                            message: " agregado correctamente "
                        })
                    })
                    .catch(error =>
                        res.status(500).send({
                            message: 'se detecto un error',
                            error: error
                        }))
            } else {
                res.send({ message: "fecha exede el plazo limite" });

            }
        } catch (error) {
            res.send({
                message: 'hubo un error',
                error: error

            })
        }
    }
    // para poder verificar que un autor no suba dos propuesta para revisar al mismo tiempo, solo una 
    // en proceso de revisión
let verificar_revision = async(req, res, next) => {
    let servicio = new s_pg();
    let idpublicacion = req.body.idpublicacion
    let sql = 'select id from pu_publicacion_revision where id_publicacion =$1 and (estado = 0 or estado =2 );'
    servicio.eje_sql(sql, [idpublicacion]).then(bd_res => {
        console.log("AQUI", bd_res.rowCount);
        if (bd_res.rowCount === 0) {
            next();
            return;
        } else res.send({
            message: 'aún tiene una revisión pendiente o su evaluación ya fue realizada'
        });
    }).catch(error => {
        res.send({
            error: error,
            message: "error"
        })
    });
}

async function _guardar(publicacion_revision, servicio, archivo) {

    let sql = 'insert into pu_publicacion_revision(id_publicacion,archivo,id_evaluador,estado,fecha_subida)' +
        'values($1,$2,$3,$4,$5);'
    return await servicio.eje_sql(sql, [publicacion_revision.idpublicacion,
        archivo, publicacion_revision.idevaluador, 0, publicacion_revision.fechasubida
    ])
}

let obtener_publicacion_revisiones = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select  id,retroalimentacion,fecha_realizada,id_publicacion,archivo,estado from pu_publicacion_revision;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            publicacion_revision: bd_res.rows
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });
}

let obtener_publicacion_revision = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion_revision = req.params.id;
    let sql = 'select id,retroalimentacion,fecha_realizada,id_publicacion,archivo,estado from pu_publicacion_revision where id = $1;'
    await servicio.eje_sql(sql, [id_publicacion_revision]).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            publicacion_revision: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });

}


let actualizar_publicacion_revision_autor = async(req, res) => {
    let servicio = new s_pg();
    let publicacion_revision = req.body;
    let id_publicacion_revision = req.params.id;
    let sql = 'update pu_publicacion_revision set archivo = $1,' +
        'where id = $2;'
    await servicio.eje_sql(sql, [publicacion_revision.archivo,
        id_publicacion_revision
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' publicacion_revision actualizado ',
            publicacion_revision: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });
}
let actualizar_publicacion_revision = async(req, res) => {
    let servicio = new s_pg();
    let publicacion_revision = req.body;
    let id_publicacion_revision = req.params.id;
    let sql = 'update pu_publicacion_revision set retroalimentacion = $1,' +
        'fecha_realizada=$2,estado = 1 where id = $3;'
    await servicio.eje_sql(sql, [publicacion_revision.retroalimentacion, publicacion_revision.fecha_realizada,
        id_publicacion_revision
    ]).
    then(async bd_res => {

        res.status(200).send({
            message: ' publicacion_revision actualizado ',
            publicacion_revision: bd_res.rows[0]
        });

    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });
}

let eliminar_publicacion_revision = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion_revision = req.params.id
    let sql = 'delete from publicacionrevision where id = $1 ;'
    await servicio.eje_sql(sql, [id_publicacion_revision]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            publicacion_revision: bd_res
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });
}
async function middle_verificar_fecha(fechasubida, idpublicacion) {
    let servicio = new s_pg();
    let sql = 'select fecha_realizada + 15 >= $1 and $1 >= fecha_realizada as plazo_maximo from pu_publicacion_revision where id_publicacion = $2 and estado = 1 order by fecha_realizada desc;'
    return await servicio.eje_sql(sql, [fechasubida, idpublicacion]);
    /**  then(bd_res => {
         console.log(bd_res.rowCount);
         if (bd_res.rowCount === 0) {
             next();
             return;
         }
         let bool = bd_res.rows[0].plazo_maximo;

         if (bool) next();
         else res.send("fecha exede el plazo limite");

     }).catch(error => {
         res.send({
             error: error,
             efe: "lalksdj"
         })
     });*/

}

module.exports = {
    guardar_publicacion_revision,
    obtener_publicacion_revision,
    obtener_publicacion_revisiones,
    actualizar_publicacion_revision,
    eliminar_publicacion_revision,
    verificar_revision
}