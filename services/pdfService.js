const JSReport = require("jsreport-core")();
const fs = require("fs");

const crearPlantilla = (nombrePlantilla) => {
  let html = fs.readFileSync(`./templates/${nombrePlantilla}.html`).toString();

  let plantilla = {};
  plantilla.content = html;
  plantilla.recipe = "chrome-pdf";
  plantilla.engine = "handlebars";
  return plantilla;
};

const crearPDF = async (data, nombrePlantilla) => {
  await JSReport.init();

  let infoPdf = {};
  infoPdf.template = crearPlantilla(nombrePlantilla);
  infoPdf.data = data;

  let resultado = await JSReport.render(infoPdf);
  return resultado.content;
};

module.exports = { crearPDF };

/*crearPDF({publicacion: "Test"}, "publicacionEvaluada")
.then((res) =>{
    fs.writeFile("./files/nuevoPdf.pdf", res, (error) =>{
        if(error){
            console.log("error", error)
        }
        console.log("documento escrito")
    })
}).catch((error) =>{
    console.log("error", error)
})*/
