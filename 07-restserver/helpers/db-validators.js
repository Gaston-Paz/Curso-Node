
const Role = require('../models/rol');
const Usuario = require('../models/usuario');
const validarRol = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol '${rol}' ingresado no existe`);
    }
}

const existeCorreo = async (correo = '') => {
    const existe = await Usuario.findOne({correo});
    if(existe){
        throw new Error(`El correo '${correo}' ya está registrado`);
        
    }
} 

module.exports = {
    validarRol,
    existeCorreo
}