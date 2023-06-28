require("dotenv").config();
const { green } = require("colors");
const { pausa, listPlaces } = require("./helpers/inquirer");
const { readInput } = require("./helpers/inquirer");
const { inquirerMenu } = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const lugar = await readInput("Ciudad");
        const lugares = await busquedas.ciudad(lugar);
        const id = await listPlaces(lugares);
        if (id === '0' )continue

        const plaseSel = lugares.find((p) => p.id === id);
        //guardar en db
        busquedas.addHistory(plaseSel.nombre)
              //Seleccionar el lugar

        //Clima
        const wheater = await busquedas.climaLugar(plaseSel.lat, plaseSel.lng);
        //Mostrar resultados
        console.log("informacion de la ciudad \n".green);
        console.log(`Ciudad : ${plaseSel.nombre} `.green);
        console.log(`Lat: `.green + plaseSel.lat);
        console.log(`Lng: `.green + plaseSel.lng);
        console.log(`Temperatura : `.green + wheater.temp);
        console.log(`Tmin : `.green + wheater.min);
        console.log(`Tmax : `.green + wheater.max);
        console.log(`Descripcion : `.green + wheater.desc);
        break;

        case 2:
            busquedas.historial.forEach((lugar,i) => {
              const idx = `${i +1}.`.green 
              console.log(`${idx } ` +  lugar);
              
            }); 
      default:
        break;
    }

    if (opt !== 0) await pausa();
    busquedas.saveDb();
  } while (opt !== 0);
};

main();
