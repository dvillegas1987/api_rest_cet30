const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.post('/mesa',(req,res) => {

    const {materia,docente,aula,fecha,hora,estado} = req.body;

    var fecha_hora = fecha+' '+hora+':00';
    
    mysqlConnection.query('insert into mesas_examen (asignatura,docente,aula,fecha_hora) values(?,?,?,?)',[materia,docente,aula,fecha_hora],
        (err,rows,fields) => {
            if(!err){
                res.json('Se ha guardado exitosamente!');
            }else{
                console.log(err);
            }
    });
});

router.get('/mesa/:estado', (req,res) => {
    
    const {estado} = req.params;

    if(estado == 0){
        mysqlConnection.query('select m.codigo, a.descripcion as asignatura, d.apellido as apellido, d.nombre as nombre, DATE_FORMAT(fecha_hora, "Fecha: %d/%m/%Y - Horario: %H:%i %p") as fechahora,DATE_FORMAT(fecha_hora, "%Y-%m-%d") as fecha, aula,o.descripcion as orientacion, c.descripcion as ciclo, a.anio as anio from mesas_examen m, docente d, asignatura a, orientacion o, ciclo c where m.docente = d.codigo and m.asignatura = a.codigo and a.orientacion = o.codigo and a.ciclo = c.codigo and TIMESTAMPDIFF(DAY,NOW(),DATE_FORMAT(fecha_hora, "%Y-%m-%d")) <= 2',(err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else{
        mysqlConnection.query('select m.codigo, a.descripcion as asignatura, d.apellido as apellido, d.nombre as nombre, DATE_FORMAT(fecha_hora, "Fecha: %d/%m/%Y - Horario: %H:%i %p") as fechahora,DATE_FORMAT(fecha_hora, "%Y-%m-%d") as fecha, aula,o.descripcion as orientacion, c.descripcion as ciclo, a.anio as anio from mesas_examen m, docente d, asignatura a, orientacion o, ciclo c where m.docente = d.codigo and m.asignatura = a.codigo and a.orientacion = o.codigo and a.ciclo = c.codigo and TIMESTAMPDIFF(DAY,NOW(),DATE_FORMAT(fecha_hora, "%Y-%m-%d")) >= 2',(err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });   
    }

});


module.exports = router;