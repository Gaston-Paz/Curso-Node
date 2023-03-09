const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('contraseña','La contraseña es obligatoria').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token','Token de google necesario').notEmpty(),
    validarCampos
],googleSignIn);


module.exports = router;