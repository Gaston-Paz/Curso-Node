const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { validarCampos, validarJWT, esAdmin } = require('../middlewares/index');
const { existeProducto } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],
obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria','La categoría es obligatoria').notEmpty(),
    validarCampos
],
crearProducto
);

router.put('/:id', [
    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria','La categoría es obligatoria').notEmpty(),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    esAdmin,
    validarCampos
], borrarProducto);

module.exports = router;