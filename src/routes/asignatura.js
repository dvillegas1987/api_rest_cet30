const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');



router.get('/asignatura/:tipo_asignatura/:tipo_ciclo', (req,res) => {

    const {tipo_asignatura,tipo_ciclo} = req.params;

    mysqlConnection.query("select IdAsignarutas as codigo,DetalleAsignatura as asignatura from asignaturas where TipoAsignatura = ? and TipoCiclo = ?",[tipo_asignatura,tipo_ciclo],(err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{ 
            res.json(0);
        }
    });

});



router.get('/asignatura/:tipo_asignatura/:ciclo_lectivo/:profesor', (req,res) => {

    const {tipo_asignatura,ciclo_lectivo,profesor} = req.params;

    mysqlConnection.query("SELECT pt.id_asignatura as codigo, a.DetalleAsignatura as asignatura FROM `planilla_de_taller` pt, asignaturas a WHERE Id_Profesor = ? and ciclo_lectivo = ? and a.TipoAsignatura = ? and pt.id_asignatura = a.IdAsignarutas GROUP BY pt.id_asignatura",[profesor,ciclo_lectivo,tipo_asignatura],(err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{ 
            res.json(0);
        }
    });

});

module.exports = router;