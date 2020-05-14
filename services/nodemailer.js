const nodemailer = require('nodemailer')
const template_engine = require('./template_engine')
const engine = new template_engine()

class servicioCorreo{
    constructor() {}

    enviarCorreo(req, res) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });
    
        let data = req.body
        let template;
        if(data.tipo == "0"){
            template = engine.leerArchivo('templates/publicacionEvaluada.html').toString()

            template = engine.renderizarPlantilla(template, {
                publicacion: data.publicacion
            })
        }
        let mailOptions = {
            from: process.env.EMAIL,
            to: data.to,
            subject: data.subject,
            html: template
        }
    
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                res.status(500).send(error.message)
            } else {
                console.log("email enviado")
                res.status(200).send({ok: true, mensaje:"Email enviado"})
            }
        })
    }
}



module.exports = servicioCorreo