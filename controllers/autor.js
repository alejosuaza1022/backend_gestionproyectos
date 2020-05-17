const s_pg = require("../services/postgres")




let obtener_estado_publicacion = async(req, res) => {
    let servicio = new s_pg();
    let id_publicacion = req.params.id
    let id_autor = req.params.id_autor
    let sql = 'select  pu_propuestas_publicaciones.id as id_publicacion,fecha_subida,pu_publicacion_revision.id as id_revision  ,estado as est,case when estado = 1 then fecha_realizada + 15  else null end as plazo_maximo ,estadoPublic(estado) as estado,retroalimentacion,titulo,(select id_evaluador  from pu_publicacion_revision where id_publicacion = $1 limit 1) as id_evaluador from pu_publicacion_revision right join pu_propuestas_publicaciones on pu_propuestas_publicaciones.id = pu_publicacion_revision.id_publicacion inner join pu_autores_publicaciones on pu_autores_publicaciones.id_publicacion =pu_propuestas_publicaciones.id where pu_propuestas_publicaciones.id=$1 and id_autor=$2 order by fecha_realizada desc limit 1;'
    await servicio.eje_sql(sql, [id_publicacion, id_autor]).then(bd_res => {
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
    let sql = 'select id_publicacion,titulo,facultad,tipo_publicacion,area from pu_propuestas_publicaciones inner join pu_autores_publicaciones on id_publicacion = pu_propuestas_publicaciones.id where id_autor = $1;'
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