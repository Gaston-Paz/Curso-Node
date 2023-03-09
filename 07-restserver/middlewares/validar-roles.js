const { response, request } = require('express');

const esAdmin = (req = request, res = response, next) => {
    
    if(!req.usuarioAutenticado){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const { rol, nombre } = req.usuarioAutenticado;
    if(rol !== 'ADMIN_ROL'){
        return res.status(403).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
}

const tieneRol = (roles = []) => {

    return (req = request, res = response, next) => {
        if(!req.usuarioAutenticado){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }
    
        const { rol, nombre } = req.usuarioAutenticado;
    
        if(!roles.includes(rol)){
            return res.status(403).json({
                msg: `${nombre} no tiene autorización`
            });
        }
    
        next();
    }
}

module.exports = {
    esAdmin,
    tieneRol
}