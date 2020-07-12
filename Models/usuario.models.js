var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesvalidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

var usuaioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es Necesario'] },
    email: { type: String, required: [true, 'El Correo electronico es Necesario'], unique: true },
    password: { type: String, required: [true, 'la contraseña es Necesaria'] },
    imagen: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesvalidos }
});
usuaioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuaioSchema);