const express = require('express');
const cors = require('cors')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/usuarios';

        //Middlewares
        this.middlewares();


        //Rutas de mi app
        this.routes();
    }

    routes(){
        this.app.use(this.usuariosRoute, require('../routes/usuarios.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriento en puerto: ', this.port);
        });
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

}

module.exports = Server;