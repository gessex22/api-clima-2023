const inquirer = require("inquirer");

require("colors");

const questions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        name: `${"1.".green} Buscar ciudad?`,
        value: 1,
      },
      {
        name: `${"2.".green} Historial`,
        value: 2,
      },
      {
        name: `${"3.".green} Salir`,
        value: 0,
      },
    ],
  },
];

const msgcon = [
  {
    type: "input",
    name: "Comfirmacion",
    message: `Presione ${"enter".green} para confirmar`,
  },
];

const listPlaces = async (lugares = []) => {
  const choicex = lugares.map((lugar, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });

  choicex.unshift({
    value: "0",
    name: "0. ".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar",
      
      choices: choicex,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const completedtask = async (tareas = []) => {
  const choicex = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices: choicex,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
};

const inquirerMenu = async () => {
  console.log(`========================`.green);
  console.log(`========================`.green);
  console.log(`    Tareas 1.0 G         `.red);
  console.log(`========================`.green);
  console.log(`========================\n`.green);

  const { opcion } = await inquirer.prompt(questions);

  return opcion;
};

const pausa = async () => {
  return await inquirer.prompt(msgcon);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `Porfavor ingrese algo`;
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);

  return desc;
};

const confirmacion = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};
module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  listPlaces,
  confirmacion,
  completedtask,
};
