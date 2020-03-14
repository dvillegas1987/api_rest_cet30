
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');



router.get('/estadistica_general/:planilla_taller/:fecha',(req,res) => {

    const {planilla_taller,fecha} = req.params;
    
    mysqlConnection.query("SELECT 'PRESENTES' as name, SUM(presente = 'SI') as y FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.id_planilla_de_taller = "+planilla_taller+" and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller and pa.Fecha = '"+fecha+"' UNION SELECT 'AUSENCIAS' as name, SUM(presente = 'NO') as y FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.id_planilla_de_taller = "+planilla_taller+" and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller and pa.Fecha ='"+fecha+"'",[],(err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{ 
            res.json(0);
        }
    });
});


router.get('/estadistica_general/:planilla_taller/:fecha/:tarde',(req,res) => {

    const {planilla_taller,fecha} = req.params;
    
    mysqlConnection.query("SELECT 'TARDE' as nombre, SUM(LlegoTarde = 'SI') as total FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.id_planilla_de_taller = ? and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller and pa.Fecha = ?",[planilla_taller,fecha],(err,rows,fields) => {
        if(!err){
            res.json(rows[0]);
        }else{ 
            res.json(0);
        }
    });
});


module.exports = router;
