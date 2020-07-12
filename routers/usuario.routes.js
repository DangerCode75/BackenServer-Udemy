var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');


var app = express();

var Usuario = require('../Models/usuario.models');

// rutas 
// req
// res = es la respuesta para el servidor
// next es solo para lo midelware que hace que contiue con la siguiente intruccion




/**==============================================================================
OBTENER TODOS LOS USUARIOS
==============================================================================**/
app.get('/', mdAutenticacion.verificaToken, (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar los usuarios',
                errors: err
            })
        }
        res.status(200).json({
            ok: true,
            usuariotoken: req.usuario,
            usuarios: usuarios
        })
    });
});


/*==============================================================================
ACTUALIZAR USUARIOS
==============================================================================**/
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar un usuario',
                errors: err
            })
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id:' + id + 'no existe',
                errors: { message: 'No existe un usuario con ese Id' }
            })
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar un usuario',
                    errors: err
                })
            }
            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuariotoken: req.usuario,
                usuario: usuarioGuardado
            });
        })
    });
});

/*==============================================================================
CREAR UN NUEVO USUARIO
==============================================================================**/
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        imagen: body.imagen,
        role: body.role
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un usuario',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            usuariotoken: req.usuario,
            usuario: usuarioGuardado
        });
    });
})

/*==============================================================================
ELIMINAR UN USUARIO POR EL ID
==============================================================================**/
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar un usuario',
                errors: err
            })
        }
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese Id',
                errors: { message: 'No existe un usuario con ese Id' }
            })
        }

        res.status(200).json({
            ok: true,
            usuariotoken: req.usuario,
            usuario: usuarioEliminado
        })
    })
});
module.exports = app;