var express = require('express');

var app = express();
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

module.exports = app;