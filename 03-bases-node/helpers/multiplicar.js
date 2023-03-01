const fs = require('fs');
const color = require('colors');

const crearArchivo = async (base,listar, hasta) => {

    try {
        let salida = `${'=================='.blue}\n   ${'Tabla del'.yellow} ${base.yellow} \n${'=================='.blue}\n`;
        let salidaArchivo = `==================\n   Tabla del base \n==================\n`;

        for (let index = 1; index <= hasta; index++){
            salida += `${color.cyan(base)} x ${color.yellow(index)} = ${base*index}\n`;  
            salidaArchivo += `${base} x ${index} = ${base*index}\n`;  
        }
        
        if(listar)console.log(salida);
        
        let nombreArchivo = `./salida/tabla-${base}.txt`;
            
        fs.writeFileSync(nombreArchivo,salidaArchivo);

        return `${nombreArchivo} creado con éxito`.green;
    } catch (error) {
        throw error;
    }

}


module.exports = {
    crearArchivo
}

// const crearArchivo = (base) => {

//     return new Promise((res, rej) => {
//         let salida = `==================\n   Tabla del ${base} \n==================\n`;

//         for (let index = 1; index <= 10; index++){
//             salida += `${base} x ${index} = ${base*index}\n`;  
//         }
    
//         console.log(salida);
    
//         let nombreArchivo = `tabla-${base}.txt`;
        
//         try {
//             fs.writeFileSync(nombreArchivo,salida);
//         } catch (error) {
//             rej(error);
//         }

//         res(`${nombreArchivo} creado con éxito`);
//     });
// }

// fs.writeFile(`tabla-${base}.txt`,salida, (err) => {
//     if(err)throw err;
//     console.log('Archivo creado');
// });


