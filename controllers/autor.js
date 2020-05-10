const s_pg = require("../services/postgres")




let obtener_estado_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id
    let sql = 'select id,nombre,materiaestudio from publicacio where idautor = $1;'
    await servicio.eje_sql(sql, [id_autor]).then(bd_res => {
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


let obtener_publicaciones_autor = async(req, res) => {
    let servicio = new s_pg();
    let id_autor = req.params.id
    let sql = 'select id,nombre,materiaestudio from publicacio where idautor = $1;'
    await servicio.eje_sql(sql, [id_autor]).then(bd_res => {
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

module.exports = {
    obtener_publicaciones_autor,
    obtener_estado_publicacion
}