const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    //Para tomar los queryparams
    // const { nombre } = req.query;

    res.json();
};

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, contraseña, rol } = req.body;
    const usuario = new Usuario({
        nombre, correo, contraseña, rol
    });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña,salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.json(id);
};

const usuariosDelete = (req = request, res = response) => {
    const { id } = req.params;
    res.json(id);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}