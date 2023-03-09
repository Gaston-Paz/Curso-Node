const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/JWT');

const login = async (req = request, res = response) => {

    const { correo, contraseña } = req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos'
            });
        }

        const contraseñaValida = bcryptjs.compareSync(contraseña, usuario.contraseña);

        if(!contraseñaValida){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal'
        });
    }
}

module.exports = {
    login
}