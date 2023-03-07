const { Router } = require('express');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios.controller');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarRol, existeCorreo } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
        check('correo','El formato del correo es inválido').isEmail(),
        check('correo','El correo es un campo obligatorio').not().isEmpty(),
        check('correo').custom(existeCorreo),
        check('correo','El nombre debe ser un texto').isString(),
        check('nombre','El nombre es un campo obligatorio').not().isEmpty(),
        // check('rol','No es un rol permitido').isIn(['ADMIN_ROL','USUARIO_ROL']),
        check('rol').custom( validarRol ),
        check('contraseña','La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
        validarCampos
] ,usuariosPost);

router.delete('/:id', usuariosDelete);

module.exports = router;