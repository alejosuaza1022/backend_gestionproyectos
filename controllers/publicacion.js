const s_pg = require("../services/postgres")


// obtener todos las revisiones que el autor ha subido para calificar de una misma publicación

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
        })
    });
}

let obtener_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id;
    let sql = 'select nombre,materiaestudio,idautor from publicacion where id = $1;'
    await servicio.eje_sql(sql, [id_publicacion]).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            publicacion: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        })
    });

}




module.exports = {
    obtener_publicacion,
    obtener_publicaciones,
}