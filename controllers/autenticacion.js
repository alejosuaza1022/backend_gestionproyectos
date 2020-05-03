const s_pg = require("../services/postgres")
const jwt = require("jsonwebtoken");
class _Autenticacion {
    constructor(persona, tipo) {
        this.persona = persona;
        this.tipo = tipo;
    }

    validarLogin() {
        if (!this.persona) {
            throw {
                ok: false,
                mensaje: "La información  es obligatoria.",
            };
        }
        if (this.tipo === 'autor') {
            if (!this.persona.idautor) {
                throw {
                    ok: false,
                    mensaje: "El documento  es obligatorio."
                };
            }
        } else {
            if (!this.persona.idevaluador) {
                throw {
                    ok: false,
                    mensaje: "El documento  es obligatorio."
                };
            }
        }
        if (!this.persona.clave) {
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
    async consultarPersona() {
        let _servicio = new s_pg();
        let valores = [this.persona.idautor, this.persona.clave];
        let sql = `SELECT * FROM ${this.tipo} WHERE id${this.tipo}=$1 AND clave=md5($2)`;
        return await _servicio.eje_sql(sql, valores);
    };

    generarToken() {
        delete this.persona.clave;
        let token = jwt.sign(this.persona, "123456789");
        return token;
    }

    verificarToken(token) {
        return jwt.verify(token, "123456789");
    }


}
let validar_autor = async(req, res) => {
    let autenticacion = new _Autenticacion(req.body, "autor");
    try {
        autenticacion.validarLogin()
        autenticacion.consultarPersona().
        then(bd_res => {
            let persona =
                bd_res.rowCount > 0 ? bd_res.rows[0] : undefined;
            if (persona) {
                let token = autenticacion.generarToken(persona);
                res
                    .status(200)
                    .send({
                        info: token,
                        mensaje: "Autor autenticado."
                    });
            } else {
                res.status(400).send({
                    info: {},
                    mensaje: "Documento y/o clave incorrecta.",
                });
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

}
let validar_evaluador = async(req, res) => {
    let autenticacion = new _Autenticacion(req.body, "evaluador");
    try {
        autenticacion.validarLogin()
        autenticacion.consultarPersona().
        then(bd_res => {
            let persona =
                bd_res.rowCount > 0 ? bd_res.rows[0] : undefined;
            if (persona) {
                let token = autenticacion.generarToken(persona);
                res
                    .status(200)
                    .send({
                        info: token,
                        mensaje: "evaluador autenticado."
                    });
            } else {
                res.status(400).send({
                    info: {},
                    mensaje: "Documento y/o clave incorrecta.",
                });
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }

}
let middleware_validar_autor = (req, res, next) => {
    console.log("hola")
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
let middleware_validar_evaluador = (req, res, next) => {
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

module.exports = {
    validar_autor,
    validar_evaluador,
    middleware_validar_autor,
    middleware_validar_evaluador
}