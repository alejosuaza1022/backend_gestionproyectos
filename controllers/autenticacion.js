const s_pg = require("../services/postgres")
const jwt = require("jsonwebtoken");


function validarLogin(persona) {
    if (!persona) {
        throw {
            ok: false,
            mensaje: "La información  es obligatoria.",
        };
    }

    if (!persona.idevaluador) {
        throw {
            ok: false,
            mensaje: "El documento  es obligatorio."
        };
    }

    if (!persona.clave) {
        throw {
            ok: false,
            mensaje: "La clave  es obligatoria."
        };
    }
}

/**
 * Consultar la persona en el sistema con documento y clave
 * @param {*} persona
 */
async function consultarPersona(persona) {
    let _servicio = new s_pg();
    let valores = [persona.idevaluador, persona.clave];
    let sql = `SELECT * FROM acc_usuarios WHERE id=$1 AND clave=md5($2)`;
    return await _servicio.eje_sql(sql, valores);
};

function generarToken(persona) {
    delete persona.clave;
    let token = jwt.sign(persona, "123456789");
    return token;
}

function verificarToken(token) {
    return jwt.verify(token, "123456789");
}



let validar_persona = async(req, res) => {
    try {
        validarLogin(req.body)
        consultarPersona(req.body).
        then(bd_res => {
            let persona =
                bd_res.rowCount > 0 ? bd_res.rows[0] : undefined;
            if (persona) {
                let token = generarToken(persona);
                res
                    .status(200)
                    .send({
                        info: token,
                        nombre: persona.nombre,
                        mensaje: "evaluador autenticado."
                    });
            } else {
                res.status(400).send({
                    mensaje: "Documento y/o clave incorrecta.",
                });
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

}
let middleware_validar_persona = (req, res, next) => {
    try {
        let url = req.url;
        if (url.includes('/login')) {
            next();
        } else {
            let token = req.headers.token;
            verificarToken(token);
            next();
        }
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}
let verificarAut = (req, res) => {
    try {
        let token = req.headers.token;
        verificarToken(token);
        res.status(200).send({
            ok: true,
            mensaje: "Autenticado.",
        });
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}



/*let validar_evaluador = async(req, res) => {
    let autenticacion = new _Autenticacion(req.body, "evaluador");
    try {
        autenticacion.validarLogin()
        autenticacion.consultarPersona().
        then(bd_res => {
            let persona =
                bd_res.rowCount > 0 ? bd_res.rows[0] : undefined;
            console.log(persona)

            if (persona) {
                let token = autenticacion.generarToken(persona);
                res
                    .status(200)
                    .send({
                        info: token,
                        nombre: persona.nombre,
                        mensaje: "evaluador autenticado."
                    });
            } else {
                res.status(400).send({
                    mensaje: "Documento y/o clave incorrecta.",
                });
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

}
let middleware_validar_autor = (req, res, next) => {
    let autenticacion = new _Autenticacion(req.body, "autor");
    try {
        let url = req.url;
        if (url.includes('/login')) {
            next();
        } else {
            let token = req.headers.token;
            autenticacion.verificarToken(token);
            next();
        }
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}
/**let middleware_validar_evaluador = (req, res, next) => {
    let autenticacion = new _Autenticacion(req.body, "evaluador");
    try {
        let url = req.url;
        if (url.includes('/login')) {
            next();
        } else {
            let token = req.headers.token;
            autenticacion.verificarToken(token);
            next();
        }
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}
let verificarAut = (req, res) => {
    try {
        let tipo = req.query
        console.log(tipo['tipo'])
        let token = req.headers.token;
        let autenticacion = new _Autenticacion(req.body, tipo['tipo']);
        let verificacion = autenticacion.verificarToken(token);
        res.status(200).send({
            ok: true,
            info: verificacion,
            mensaje: "Autenticado.",
        });
    } catch (error) {
        res.status(401).send({
            ok: false,
            info: error,
            mensaje: "No autenticado.",
        });
    }
}*/
module.exports = {
    middleware_validar_persona,
    validar_persona,
    verificarAut
}