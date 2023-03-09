const { response, request } = require('express');
const { Categoria } = require('../models/index');

const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        res.status(400).json({
            msg: `La categoría ${nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);

}

const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [categorias,total] = await Promise.all([
        Categoria.find({estado: true}).populate('usuario','nombre').limit(Number(limite)).skip(Number(desde)),
        Categoria.countDocuments({estado: true})]);

    res.json({total,categorias});

}

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    res.json(categoria);
}

const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { usuario, estado, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,resto,{new:true});


    res.json(categoria);
}

const borrarCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}