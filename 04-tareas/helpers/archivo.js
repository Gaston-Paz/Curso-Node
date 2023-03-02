const fs = require('fs');

const path = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(path,JSON.stringify(data));
}

const leerDB = () => {
    if(!fs.existsSync(path))return null;
    let archivoString = fs.readFileSync(path,'utf-8');
    let archivoJson = JSON.parse(archivoString);
    return archivoJson;
}

module.exports = {
    guardarDB,
    leerDB
}