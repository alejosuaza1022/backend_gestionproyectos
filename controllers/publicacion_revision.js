const s_pg = require("../services/postgres")

let guardar_publicacion_revision = async(req, res) => {
        console.log("asdasd")
        let servicio = new s_pg();
        let publicacion_revision = req.body;
        try {
            let resp = (await middle_verificar_fecha(publicacion_revision.fechasubida, publicacion_revision.idpublicacion))
            let bool = true;
            if (resp.rowCount !== 0) {
                bool = resp.rows[0].plazo_maximo;
            }
            if (bool) {
                _guardar(publicacion_revision, servicio).then(async bd_res => {
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
    const estado = 0
    let sql = 'select data,fechasubida,estado from publicacionrevision where idpublicacion = $1 and (estado =$2 or estado = 2);'
    servicio.eje_sql(sql, [idpublicacion, estado]).then(bd_res => {
        console.log(bd_res.rowCount);
        if (bd_res.rowCount === 0) {
            next();
            return;
        } else res.send({
            message: 'aún tiene una revisión pendiente'
        });

    }).catch(error => {
        res.send({
            error: error,
        })
    });
}

async function _guardar(publicacion_revision, servicio) {
    let sql = 'insert into publicacionrevision(idpublicacion,data,fechasubida,estado)' +
        'values($1,$2,$3,$4);'
    return await servicio.eje_sql(sql, [publicacion_revision.idpublicacion,
        publicacion_revision.data, publicacion_revision.fechasubida,
        publicacion_revision.estado
    ])
}

let obtener_publicacion_revisiones = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select id,idpublicacion,data,fechasubida,estado from publicacionrevision;'
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
    let sql = 'select idpublicacion,data,fechasubida,estado from publicacionrevision where id = $1;'
    await servicio.eje_sql(sql, [id_publicacion_revision]).then(bd_res => {
        res.status(200).send({
            message: ' publicacion_revision agregada ',
            publicacion_revision: bd_res.rows[0]
        })
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
    let sql = 'update publicacionrevision set idpublicacion = $1,' +
        'data = $2, fechasubida=$3, estado = $4 where id = $5;'
    await servicio.eje_sql(sql, [publicacion_revision.idpublicacion,
        publicacion_revision.data, publicacion_revision.fechasubida,
        publicacion_revision.estado,
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
    let sql = "select fechaevaluacion+interval '15 days' >= $1 and $1>fechaevaluacion as plazo_maximo from registroevaluacion" +
        " inner join publicacionrevision on idpublicacionrevision = " +
        "publicacionrevision.id where idpublicacion = $2 order by fechaevaluacion desc "
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