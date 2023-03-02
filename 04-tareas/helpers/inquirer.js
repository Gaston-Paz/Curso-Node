const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {name:`${'1.'.green} Crear Tarea`,value:1},
            {name:`${'2.'.green} Listar Tareas`,value:2},
            {name:`${'3.'.green} Listar Tareas Completadas`,value:3},
            {name:`${'4.'.green} Listar Tareas Pendientes`,value:4},
            {name:`${'5.'.green} Completar Tareas`,value:5},
            {name:`${'6.'.green} Borrar Tarea`,value:6},
            {name:`${'0.'.red} Salir\n`,value:0}
        ]
    }
];


const listadoTareasBorrar = async (listado) => {
    let choices = listado.map((t,i) => {
        return {
            value: t.id,
            name: `${(i+1 + '.').green} ${t.descripcion}`
        }
    });

    choices.unshift({value:0,name:`${'0.'.green} Cancelar`});

    const preguntasBorrado = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntasBorrado);

    return id;
}

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  ');
    console.log('=========================\n'.green);
    
    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async () =>{
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`
        }
    ];
    await inquirer.prompt(pregunta)
}

const leerInput = async (message) =>{
    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {descripcion} = await inquirer.prompt(pregunta);

    return descripcion;
}

const confirmar = async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async (listado) => {
    let choices = listado.map((t,i) => {
        return {
            value: t.id,
            name: `${(i+1 + '.').green} ${t.descripcion}`,
            checked: true
        }
    });

    const preguntasCompletado = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(preguntasCompletado);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}