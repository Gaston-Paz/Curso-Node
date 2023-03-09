const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuarioAutenticado = await Usuario.findById(uid);

        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: 'Token inválido'
            });
        }

        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: 'Usuario inhabilitado'
            });
        }

        req.usuarioAutenticado = usuarioAutenticado;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token inválido'
        });
    }

}

module.exports = {
    validarJWT
}