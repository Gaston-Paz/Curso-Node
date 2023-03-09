const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/jwt');
const validaRoles = require('../middlewares/validar-roles.js');

module.exports = {
    ...validaRoles,
    ...validarJWT,
    ...validarCampos
}