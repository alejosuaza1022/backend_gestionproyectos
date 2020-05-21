const JSReport = require("jsreport-core")();
const fs = require("fs");
let jsReportInit = false

const crearPlantilla = (nombrePlantilla) => {
    try {
        let html = fs.readFileSync(`./templates/${nombrePlantilla}.html`).toString();

        let plantilla = {};
        plantilla.content = html;
        plantilla.recipe = "chrome-pdf";
        plantilla.engine = "handlebars";
        return plantilla;
    } catch (error) {
        console.log(error);

    }
};

const crearPDF = async(req, res) => {

    try {
        let data = req.body.data
        let nombrePlantilla = req.body.template
        if (!jsReportInit) {
            jsReportInit = true
            await JSReport.init();
        }


        let infoPdf = {};
        infoPdf.template = crearPlantilla(nombrePlantilla);
        infoPdf.data = data;

        let resultado = await JSReport.render(infoPdf);

        fs.writeFile("./files/nuevoPdf.pdf", resultado.content, (error) => {
            if (error) {
                console.log("error", error)
            }
            console.log("documento escrito")
        })

        res.status(200).send({ ok: true, mensaje: "Pdf creado" })
    } catch (error) {
        res.send({ message: "hola", error: error.message })
    }
};

module.exports = { crearPDF };

/*crearPDF({publicacion: "Test", nombre: "nombre"}, "publicacionEvaluada")
.then((res) =>{
    fs.writeFile("./files/nuevoPdf2.pdf", res, (error) =>{
        if(error){
            console.log("error", error)
        }
        console.log("documento escrito")
    })
}).catch((error) =>{
    console.log("error", error)
})*/