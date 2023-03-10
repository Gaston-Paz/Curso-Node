const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Categoria, Producto, Usuario } = require('../models/index');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: usuario ? [usuario] : []
        });
    }else{
        const regex = new RegExp(termino, 'i');
        const usuarios = await Usuario.find({
            $or:[{ nombre: regex },{ correo: regex }],
            $and:[{ estado:true }]
        });
        return res.json({
            results: usuarios ? [usuarios] : []
        });
    }

}

const buscarCategoria = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const resultado = await Categoria.findById(termino);
        return res.json({
            results: resultado ? [resultado] : []
        });
    }else{
        const regex = new RegExp(termino, 'i');
        const resultado = await Categoria.find({ nombre: regex, estado: true });
        return res.json({
            results: resultado ? [resultado] : []
        });
    }

}

const buscarProducto = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const resultado = await Producto.findById(termino).populate({'categoria':'nombre'});
        return res.json({
            results: resultado ? [resultado] : []
        });
    }else{
        const regex = new RegExp(termino, 'i');
        const resultado = await Producto.find({ nombre: regex, estado: true }).populate({'categoria':'nombre'});
        return res.json({
            results: resultado ? [resultado] : []
        });
    }

}

const buscar = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'categorias':  buscarCategoria(termino, res);
        break;

        case 'productos': buscarProducto(termino, res); 
        break;

        case 'usuarios': buscarUsuarios(termino, res);
        break;

        default:
            res.status(500).json({
                msg: `Se le olvidó hacer esta búsqueda`
            });
        break;
    }
}

module.exports = {
    buscar
}