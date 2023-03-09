const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { validarCampos, validarJWT, esAdmin } = require('../middlewares/index');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],
obtenerCategoria);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
],
crearCategoria
);

router.put('/:id', [
    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    check('id','El id es obligatorio').notEmpty(),
    check('id','No es un ID válido').isMongoId(),
    esAdmin,
    validarCampos
], borrarCategoria);

module.exports = router;