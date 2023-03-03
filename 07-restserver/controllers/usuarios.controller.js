const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    //Para tomar los queryparams
    // const { nombre } = req.query;

    res.json();
};

const usuariosPost = (req = request, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        nombre,
        edad
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