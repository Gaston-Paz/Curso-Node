const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    //Para tomar los queryparams
    const { limite = 5, desde = 0 } = req.query;

    const [total,usuarios] = await Promise.all([
        Usuario.find({estado: true}).limit(Number(limite)).skip(Number(desde)),
        Usuario.countDocuments({estado: true})]);

    res.json({total,usuarios});
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

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, contraseña, google, correo, ...resto } = req.body;

    if(contraseña){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        usuario
    });
};

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;
    //Borrado físico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuarioAutenticado;
    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}