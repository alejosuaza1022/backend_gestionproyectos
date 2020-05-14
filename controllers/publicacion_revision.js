const s_pg = require("../services/postgres")
const base64 = require('base64topdf');

/// validar fecha de realización de una correción también que sea mayor a la fecha de subida


let guardar_publicacion_revision = async(req, res) => {
        let servicio = new s_pg();
        let publicacion_revision = req.body;
        let tmp = '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' +
            'K4AIABXAG8AcgBkACAAZgBvAHIAIABNAGkAYwByAG8AcwBvAGYAdAAgADMANgA1KSAvQ3JlYXRvcij+/wBNAGkAYwByAG8AcwBvAGYAdACuACAAVwBvAHIAZAAgAGYAbwByACAATQBpAGMAcgBvAHMAbwBmAHQAIAAzADYANSkgL0NyZWF0aW9uRGF0ZShEOjIwMjAwNTExMDk0MTU1KzAwJzAwJykgL01vZERhdGUoRDoyMDIwMDUxMTA5NDE1NSswMCcwMCcpID4+DQplbmRvYmoNCjcyIDAgb2JqDQpbIDI1MCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMjUwIDAgMjUwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA2NjcgNzIyIDYxMSAwIDAgMCAzMzMgMCAwIDYxMSA4ODkgMCAwIDU1NiA3MjIgNjY3IDAgNjExIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDQ0NCA1MDAgNDQ0IDUwMCA0NDQgMzMzIDUwMCA1MDAgMjc4IDI3OCAwIDI3OCA3NzggNTAwIDUwMCA1MDAgNTAwIDMzMyAzODkgMjc4IDUwMCA1MDAgMCA1MDAgNTAwIDQ0NCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCA0NDQgMCAwIDAgMCAwIDAgMCA0NDQgMCAwIDAgMjc4IDAgMCAwIDUwMCAwIDUwMCAwIDAgMCAwIDAgMCA1MDBdIA0KZW5kb2JqDQo3MyAwIG9iag0KPDwvVHlwZS9NZXRhZGF0YS9TdWJ0eXBlL1hNTC9MZW5ndGggMzAxNT4+DQpzdHJlYW0NCjw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+PHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iMy4xLTcwMSI+CjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgo8cGRmOlByb2R1Y2VyPk1pY3Jvc29mdMKuIFdvcmQgZm9yIE1pY3Jvc29mdCAzNjU8L3BkZjpQcm9kdWNlcj48L3JkZjpEZXNjcmlwdGlvbj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CjwvcmRmOkRlc2NyaXB0aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KPHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnTCriBXb3JkIGZvciBNaWNyb3NvZnQgMzY1PC94bXA6Q3JlYXRvclRvb2w+PHhtcDpDcmVhdGVEYXRlPjIwMjAtMDUtMTFUMDk6NDE6NTUrMDA6MDA8L3htcDpDcmVhdGVEYXRlPjx4bXA6TW9kaWZ5RGF0ZT4yMDIwLTA1LTExVDA5OjQxOjU1KzAwOjAwPC94bXA6TW9kaWZ5RGF0ZT48L3JkZjpEZXNjcmlwdGlvbj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIj4KPHhtcE1NOkRvY3VtZW50SUQ+dXVpZDo3OTYxNTBERS03N0M0LTRBMzEtODlGNi03RDNCQjFFMzM4ODQ8L3htcE1NOkRvY3VtZW50SUQ+PHhtcE1NOkluc3RhbmNlSUQ+dXVpZDo3OTYxNTBERS03N0M0LTRBMzEtODlGNi03RDNCQjFFMzM4ODQ8L3htcE1NOkluc3RhbmNlSUQ+PC9yZGY6RGVzY3JpcHRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8L3JkZjpSREY+PC94OnhtcG1ldGE+PD94cGFja2V0IGVuZD0idyI/Pg0KZW5kc3RyZWFtDQplbmRvYmoNCjc0IDAgb2JqDQo8PC9EaXNwbGF5RG9jVGl0bGUgdHJ1ZT4+DQplbmRvYmoNCjc1IDAgb2JqDQo8PC9UeXBlL1hSZWYvU2l6ZSA3NS9XWyAxIDQgMl0gL1Jvb3QgMSAwIFIvSW5mbyA3MSAwIFIvSURbPERFNTA2MTc5QzQ3NzMxNEE4OUY2N0QzQkIxRTMzODg0PjxERTUwNjE3OUM0NzczMTRBODlGNjdEM0JCMUUzMzg4ND5dIC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDE3MD4+DQpzdHJlYW0NCnicNdE3GoJQEIXRB+YImCWIOWHOabv2ughXYG2pnWtAfL9OMee7xW1mhAjG95VgG0J8OcNDojwlmgk3iX6FlxCq7O1gDwc4whZU+BVOQd2w/kmBMIRgAxGIQgzikIAkpCANGciCBjoYkIM8FKAIJShDBapgggU2OFADF+rQgCa0oA0d6EIP+jCAIXgwgjFMYAozmMMClrCCdXB5+yL/54B7l3hvIT6Ppxa1DQplbmRzdHJlYW0NCmVuZG9iag0KeHJlZg0KMCA3Ng0KMDAwMDAwMDAwOSA2NTUzNSBmDQowMDAwMDAwMDE3IDAwMDAwIG4NCjAwMDAwMDAxNjUgMDAwMDAgbg0KMDAwMDAwMDIyMSAwMDAwMCBuDQowMDAwMDAwNDg1IDAwMDAwIG4NCjAwMDAwMDM4NjYgMDAwMDAgbg0KMDAwMDAwNDAzNyAwMDAwMCBuDQowMDAwMDA0MjczIDAwMDAwIG4NCjAwMDAwMDQzMjYgMDAwMDAgbg0KMDAwMDAwMDAxMCA2NTUzNSBmDQowMDAwMDAwMDExIDY1NTM1IGYNCjAwMDAwMDAwMTIgNjU1MzUgZg0KMDAwMDAwMDAxMyA2NTUzNSBmDQowMDAwMDAwMDE0IDY1NTM1IGYNCjAwMDAwMDAwMTUgNjU1MzUgZg0KMDAwMDAwMDAxNiA2NTUzNSBmDQowMDAwMDAwMDE3IDY1NTM1IGYNCjAwMDAwMDAwMTggNjU1MzUgZg0KMDAwMDAwMDAxOSA2NTUzNSBmDQowMDAwMDAwMDIwIDY1NTM1IGYNCjAwMDAwMDAwMjEgNjU1MzUgZg0KMDAwMDAwMDAyMiA2NTUzNSBmDQowMDAwMDAwMDIzIDY1NTM1IGYNCjAwMDAwMDAwMjQgNjU1MzUgZg0KMDAwMDAwMDAyNSA2NTUzNSBmDQowMDAwMDAwMDI2IDY1NTM1IGYNCjAwMDAwMDAwMjcgNjU1MzUgZg0KMDAwMDAwMDAyOCA2NTUzNSBmDQowMDAwMDAwMDI5IDY1NTM1IGYNCjAwMDAwMDAwMzAgNjU1MzUgZg0KMDAwMDAwMDAzMSA2NTUzNSBmDQowMDAwMDAwMDMyIDY1NTM1IGYNCjAwMDAwMDAwMzMgNjU1MzUgZg0KMDAwMDAwMDAzNCA2NTUzNSBmDQowMDAwMDAwMDM1IDY1NTM1IGYNCjAwMDAwMDAwMzYgNjU1MzUgZg0KMDAwMDAwMDAzNyA2NTUzNSBmDQowMDAwMDAwMDM4IDY1NTM1IGYNCjAwMDAwMDAwMzkgNjU1MzUgZg0KMDAwMDAwMDA0MCA2NTUzNSBmDQowMDAwMDAwMDQxIDY1NTM1IGYNCjAwMDAwMDAwNDIgNjU1MzUgZg0KMDAwMDAwMDA0MyA2NTUzNSBmDQowMDAwMDAwMDQ0IDY1NTM1IGYNCjAwMDAwMDAwNDUgNjU1MzUgZg0KMDAwMDAwMDA0NiA2NTUzNSBmDQowMDAwMDAwMDQ3IDY1NTM1IGYNCjAwMDAwMDAwNDggNjU1MzUgZg0KMDAwMDAwMDA0OSA2NTUzNSBmDQowMDAwMDAwMDUwIDY1NTM1IGYNCjAwMDAwMDAwNTEgNjU1MzUgZg0KMDAwMDAwMDA1MiA2NTUzNSBmDQowMDAwMDAwMDUzIDY1NTM1IGYNCjAwMDAwMDAwNTQgNjU1MzUgZg0KMDAwMDAwMDA1NSA2NTUzNSBmDQowMDAwMDAwMDU2IDY1NTM1IGYNCjAwMDAwMDAwNTcgNjU1MzUgZg0KMDAwMDAwMDA1OCA2NTUzNSBmDQowMDAwMDAwMDU5IDY1NTM1IGYNCjAwMDAwMDAwNjAgNjU1MzUgZg0KMDAwMDAwMDA2MSA2NTUzNSBmDQowMDAwMDAwMDYyIDY1NTM1IGYNCjAwMDAwMDAwNjMgNjU1MzUgZg0KMDAwMDAwMDA2NCA2NTUzNSBmDQowMDAwMDAwMDY1IDY1NTM1IGYNCjAwMDAwMDAwNjYgNjU1MzUgZg0KMDAwMDAwMDA2NyA2NTUzNSBmDQowMDAwMDAwMDY4IDY1NTM1IGYNCjAwMDAwMDAwNjkgNjU1MzUgZg0KMDAwMDAwMDA3MCA2NTUzNSBmDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDczNDQgMDAwMDAgbg0KMDAwMDAwNzYwMCAwMDAwMCBuDQowMDAwMDA4MTQ3IDAwMDAwIG4NCjAwMDAwMTEyNDUgMDAwMDAgbg0KMDAwMDAxMTI5MCAwMDAwMCBuDQp0cmFpbGVyDQo8PC9TaXplIDc2L1Jvb3QgMSAwIFIvSW5mbyA3MSAwIFIvSURbPERFNTA2MTc5QzQ3NzMxNEE4OUY2N0QzQkIxRTMzODg0PjxERTUwNjE3OUM0NzczMTRBODlGNjdEM0JCMUUzMzg4ND5dID4+DQpzdGFydHhyZWYNCjExNjYxDQolJUVPRg0KeHJlZg0KMCAwDQp0cmFpbGVyDQo8PC9TaXplIDc2L1Jvb3QgMSAwIFIvSW5mbyA3MSAwIFIvSURbPERFNTA2MTc5QzQ3NzMxNEE4OUY2N0QzQkIxRTMzODg0PjxERTUwNjE3OUM0NzczMTRBODlGNjdEM0JCMUUzMzg4ND5dIC9QcmV2IDExNjYxL1hSZWZTdG0gMTEyOTA+Pg0Kc3RhcnR4cmVmDQoxMzMzOA0KJSVFT0Y='
            /*      try {
                        let archivo = req.files.archivo;

                    } catch (erro) {
                        res.send({ error: erro, message: "error pdf" })
                        return
                    }*/
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
                            error: error,

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
    console.log(req.body)
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