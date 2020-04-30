const s_pg = require("../services/postgres")



let guardar_publicacion_revision = async(req, res) => {
    let servicio = new s_pg();
    let publicacion_revision = req.body;
    let sql = 'insert into publicacionrevision(idpublicacion,data,fechasubida,estado)' +
        'values($1,$2,$3,$4);'
    await servicio.eje_sql(sql, [publicacion_revision.idpublicacion,
        publicacion_revision.data, publicacion_revision.fechasubida,
        publicacion_revision.estado
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' publicacion_revision agregado ',
            publicacion_revision: bd_res
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    })


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
        });
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
        });
    });

}

let actualizar_publicacion_revision = async(req, res) => {
    let servicio = new s_pg();
    let publicacion_revision = req.body;
    let id_publicacion_revision = req.params.id;
    let sql = 'update publicacionrevision set idpublicacion = $1' +
        'data = $2, fechasubida=$3, estado = $4 where id = $5;'
    await servicio.eje_sql(sql, [publicacion_revision.idpublicacion,
        publicacion_revision.data, publicacion_revision.fechasubida,
        publicacion_revision.estado,
        id_publicacion_revision
    ]).
    then(bd_res => {
        res.status(200).send({
            message: ' publicacion_revision agregado ',
            publicacion_revision: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
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
        });
    });


}

module.exports = {
    guardar_publicacion_revision,
    obtener_publicacion_revision,
    obtener_publicacion_revisiones,
    actualizar_publicacion_revision,
    eliminar_publicacion_revision
}