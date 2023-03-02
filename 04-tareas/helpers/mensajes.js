require('colors');

const mostrarMenu = () => {

    return new Promise((res,rej) => {
        console.clear();
        console.log('========================='.green);
        console.log('  Seleccione una opción  '.green);
        console.log('=========================\n'.green);
    
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tareas`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (opt) =>{
            readline.close();
            res(opt);
        });
    });



}

const pausa = () =>{
    return new Promise((res,rej) => {
        const pausa = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        pausa.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) =>{
            pausa.close();
            res(opt);
        });

    });
}


module.exports = {
    mostrarMenu,
    pausa
}