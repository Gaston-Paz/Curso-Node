const { green } = require("colors");
const Tarea = require("./tarea");

class Tareas{

    get listadoArr(){
        const listadito = [];

        Object.keys(this.listado).forEach(key => {
            listadito.push(this.listado[key]);
        });

        return listadito;
    }
    
    constructor(){
        this.listado = {};
    }

    crearTarea(desc){
        const tarea = new Tarea(desc);
        this.listado[tarea.id] = tarea;
    }

    listar(){
        console.log('\n');
        this.listadoArr.forEach((e,i) => {
            let index = `${((i+1)+'.').green}`;
            console.log(`${index} ${e.descripcion} :: ${e.completadoEn === null ? 'Pendiente'.red : 'Completada'.green}`);
        });
    }

    listarPorEstado(completado){
        let bandera = false;
        let cont = 1;
        this.listadoArr.forEach(e => {
            if(completado && e.completadoEn !== null){
                console.log(`${(cont+'.').green} ${e.descripcion} :: ${'Completada'.green} :: ${e.completadoEn.green}`);
                bandera = true;
                cont++;
            }
            else if(!completado && e.completadoEn === null){
                console.log(`${(cont+'.').green} ${e.descripcion} :: ${'Pendiente'.red}`);
                bandera = true;
                cont++;
            }
        });
        if(!bandera)console.log('No hay tareas para la opción seleccionada.'.red);
    }

    cargarTareasDeArchivo(listadito){
        this.listado = [];
        listadito.forEach(e => {
            this.listado[e.id] = e;
        });
    }

    eliminarTarea(id){
        if(this.listado[id]){
            delete this.listado[id];
        }
    }

    completarTareas(ids){
        ids.forEach(id => {
            if(this.listado[id].completadoEn === null){
                this.listado[id].completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(e =>{
           if(!ids.includes(e.id)){
            this.listado[e.id].completadoEn = null;
           } 
        });
    }
}

module.exports = Tareas;