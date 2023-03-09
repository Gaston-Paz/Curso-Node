const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/JWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            const data = {
                nombre,
                correo,
                contraseña: '132456',
                google: true,
                img,
                rol:'USUARIO_ROL'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            res.status(401).json({
                msg:'Hable con el administrador. Usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            msg:'No funcionó la verificación de Google'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}