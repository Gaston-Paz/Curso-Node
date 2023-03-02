require('colors');

const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/archivo');
const Tareas = require('./models/tareas');

const main = async ()  => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasDeArchivo(tareasDB);
    }

    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const desc = await leerInput('Descipción: ');
                tareas.crearTarea(desc);
            break;
            case 2:
                tareas.listar();
            break;
            case 3:
                tareas.listarPorEstado(true);
            break;
            case 4:
                tareas.listarPorEstado(false);
            break;
            case 5:
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.completarTareas(ids);
            break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== 0){
                    if(await confirmar('¿Desea eliminar la tarea seleccionada?')){
                        tareas.eliminarTarea(id);
                    }
                }
            break;
            case 0:
            break;
        }

        guardarDB(tareas.listadoArr);

        if(opt !== 0)await pausa();
    }while(opt !== 0)

}

main();
