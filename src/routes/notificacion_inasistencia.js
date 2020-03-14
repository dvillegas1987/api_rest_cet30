const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');



router.post('/notificacion_inasistencia',(req,res) => {

    const {alumno,fecha,planilla_taller} = req.body;
    
    mysqlConnection.query('insert into notificaciones_ausencias (alumno,fecha_asistencia,fecha_hora_registro,planilla_taller) values(?,?,NOW(),?)',[alumno,fecha,planilla_taller],
        (err,rows,fields) => {
            if(!err){
                res.json('Aplicación exitosa!');
            }else{
                console.log(err);
            }
    });
});



router.get('/notificacion_inasistencia/:fecha/:alumno', (req,res) => {
    
    const {fecha,alumno} = req.params;

    mysqlConnection.query('select * from notificaciones_ausencias where alumno = ? and fecha_asistencia = ?',[alumno,fecha],(err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

module.exports = router;