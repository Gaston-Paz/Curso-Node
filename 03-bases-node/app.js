
const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();

crearArchivo(argv.base, argv.listar, argv.hasta)
    .then(resultado => console.log(resultado))
    .catch(err => console.error(err));

