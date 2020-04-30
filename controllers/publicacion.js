const s_pg = require("../services/postgres")



let guardar_publicacion = async(req, res) => {
        let servicio = new s_pg();
        let publicacion = req.body;
        let sql = 'insert into publicacion(nombre,materiaestudio,idautor) values($1,$2,$3);'
        await servicio.eje_sql(sql, [publicacion.nombre, publicacion.materia_estudio, publicacion.idautor]).
        then(bd_res => {
            res.status(200).send({
                message: ' publicacion agregado ',
                publicacion: bd_res
            })
        }).catch(error => {
            res.status(500).send({
                message: 'se detecto un error',
                error: error
            });
        })


    }
    // obtener todos las revisiones que el autor ha subido para calificar de una misma publicación
let obtener_revisiones_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id
    let sql = 'select id,data,fechasubida,estado from publicacionrevision where idpublicacion = $1 order by fechasubida desc';
    await servicio.eje_sql(sql, [id_publicacion]).then(bd_res => {
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
let obtener_publicaciones_autor = async(req, res) => {
    let servicio = new s_pg();
    let id_autor = req.params.id_autor
    let sql = 'select id,nombre,materiaestudio from publicacion where idautor = $1;'
    await servicio.eje_sql(sql, [id_autor]).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            publicacion: bd_res.rows
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });

}
let obtener_publicaciones = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select id,nombre,materiaestudio,idautor from publicacion;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            publicacion: bd_res.rows
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let obtener_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id;
    let sql = 'select nombre,materiaestudio,idautor from publicacion where id = $1;'
    await servicio.eje_sql(sql, [id_publicacion]).then(bd_res => {
        res.status(200).send({
            message: ' publicacion agregada ',
            publicacion: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });

}

let actualizar_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let publicacion = req.body;
    let id_publicacion = req.params.id;
    let sql = 'update publicacion set nombre = $1' +
        'materiaestudio = $2, idautor=$3 where id = $4;'
    await servicio.eje_sql(sql, [publicacion.nombre, publicacion.materia_estudio, publicacion.idautor, id_publicacion]).
    then(bd_res => {
        res.status(200).send({
            message: ' publicacion agregado ',
            publicacion: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let eliminar_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id
    let sql = 'delete from publicacion where id = $1 ;'
    await servicio.eje_sql(sql, [id_publicacion]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            publicacion: bd_res
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });


}

module.exports = {
    guardar_publicacion,
    obtener_publicacion,
    obtener_publicaciones,
    actualizar_publicacion,
    eliminar_publicacion,
    obtener_revisiones_publicacion,
    obtener_publicaciones_autor
}