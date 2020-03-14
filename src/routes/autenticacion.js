const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/autenticacion/:usuario/:password', (req,res) => {

    const {usuario} = req.params;
    const {password} = req.params;

    if (usuario && password) {
        
        mysqlConnection.query('select u.Id_Usuario,u.Nombre,u.Cargo,u.ClaveIngreso,u.CodProfesor, p.nombre_y_apellido as nombre_apellido from usuarios u, profesores p WHERE u.CodProfesor = p.id_profesores and u.Nombre = ? and u.claveIngreso =? ',[usuario,password],(err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{ 
                console.log(err);
            }
        });

    } else {
        res.json('Ingrese usuario y contraseña.');
    }
});


module.exports = router;