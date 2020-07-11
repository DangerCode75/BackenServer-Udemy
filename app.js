// Require Implementaciones de librerias para que funcione algo
var express = require('express');
var mongoose = require('mongoose');



// inicializar Variables 
var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

})

// rutas 
// req
// res = es la respuesta para el servidor
// next es solo para lo midelware que hace que contiue con la siguiente intruccion
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })
})

// Escuchar peticiones de express
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})