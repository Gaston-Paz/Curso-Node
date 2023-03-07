const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{type: String, required: [true, 'El nombre es obligatorio']},
    correo:{type: String, required: [true, 'El correo es obligatorio'], unique: true},
    contraseña:{type: String, required: [true, 'El nombre es obligatorio']},
    img:{type: String},
    rol:{type: String, required: [true, 'El rol es obligatorio'], emun: ['ADMIN_ROL','USUARIO_ROL']},
    estado:{type: Boolean, default: true},
    google:{type: Boolean, default: false}
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, contraseña, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);