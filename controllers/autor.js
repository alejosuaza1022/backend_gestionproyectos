const s_pg = require("../services/postgres")



let guardar_autor = async(req, res) => {
    let servicio = new s_pg();
    let autor = req.body;
    let sql = 'insert into autor(nombre,apellidos,ocupacion,idautor) values($1,$2,$3,$4);'
    await servicio.eje_sql(sql, [autor.nombre, autor.apellidos, autor.ocupacion, autor.idautor]).
    then(bd_res => {
        res.status(200).send({
            message: ' autor agregado ',
            autor: bd_res
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    })


}

let obtener_autores = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select nombre,apellidos,ocupacion,idautor from autor;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            autor: bd_res.rows
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let obtener_autor = async(req, res) => {
    let servicio = new s_pg();
    let id_autor = req.params.id;
    let sql = 'select nombre,apellidos,ocupacion,idautor from autor where idautor = $1;'
    await servicio.eje_sql(sql, [id_autor]).then(bd_res => {
        res.status(200).send({
            message: ' autor agregado ',
            autor: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });

}

let actualizar_autor = async(req, res) => {
    let servicio = new s_pg();
    let autor = req.body;
    let id_autor = req.params.id;
    let sql = 'update autor set nombre = $1' +
        'apellidos = $2 ,ocupacion = $3,idautor = $4 where idautor = $5;'
    await servicio.eje_sql(sql, [autor.nombre, autor.apellidos, autor.ocupacion, autor.idautor, id_autor]).
    then(bd_res => {
        res.status(200).send({
            message: ' autor agregado ',
            autor: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let eliminar_autor = async(req, res) => {
    let servicio = new s_pg();
    let id_autor = req.params.id
    let sql = 'delete from autor where idautor = $1 ;'
    await servicio.eje_sql(sql, [id_autor]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            autor: bd_res
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });


}

module.exports = {
    guardar_autor,
    obtener_autor,
    obtener_autores,
    actualizar_autor,
    eliminar_autor
}