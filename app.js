// Require Implementaciones de librerias para que funcione algo
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



// inicializar Variables 
var app = express();

// bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// importar rutas
var appRoutes = require('./routers/app.routes');
var usuarioRoutes = require('./routers/usuario.routes');
var loginRoutes = require('./routers/login.routes');

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

})

// rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Escuchar peticiones de express
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})