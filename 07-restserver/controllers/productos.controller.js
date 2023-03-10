const { response, request } = require('express');
const { Producto } = require('../models/index');

const crearProducto = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria;

    const productoDB = await Producto.findOne({nombre});
    if(productoDB){
        res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id,
        categoria
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);

}

const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [productos,total] = await Promise.all([
        Producto.find({estado: true}).populate('usuario','nombre').populate('categoria','nombre').limit(Number(limite)).skip(Number(desde)),
        Producto.countDocuments({estado: true})]);

    res.json({total,productos});

}

const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');
    res.json(producto);
}

const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { usuario, estado, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuarioAutenticado._id;

    const producto = await Producto.findByIdAndUpdate(id,resto,{new:true});


    res.json(producto);
}

const borrarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(producto);
}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}