const express = require('express');
const cors = require('cors')
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios'
        }

        //Conectar a DB Mongo
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.categorias, require('../routes/categorias.routes'));
        this.app.use(this.path.usuarios, require('../routes/usuarios.routes'));
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