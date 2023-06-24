require ('dotenv').config(); 
const { pausa, listPlaces } = require("./helpers/inquirer");
const { readInput } = require("./helpers/inquirer");
const { inquirerMenu } = require("./helpers/inquirer");

const Busquedas = require('./models/busquedas')

const main = async () => {
  
    const busquedas = new Busquedas();
    let opt;

  do {
    opt = await inquirerMenu();
    
    switch (opt) {
        case 1:
            // Mostrar mensaje
            const lugar = await readInput('Ciudad')
            const lugares = await  busquedas.ciudad(lugar);
            const id = await listPlaces(lugares);
            const plaseSel = lugares.find( p => p.id === id)
            console.log(plaseSel)
            // Buscar lugares

            //Seleccionar el lugar 

            //Clima

            //Mostrar resultados
            console.log('informacion de la ciudad \n'.green);
            console.log('Ciudad'.green);
            console.log('Lat'.green);
            console.log('Lng'.green);
            console.log('Temperatura'.green);
            break;
    
        default:
            break;
    }

    if ( opt !== 0 ) 


    await pausa();

  } while (opt !== 0);
};

main();