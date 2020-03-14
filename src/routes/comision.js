const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/comision/:fecha/:asignatura',(req,res) => {

    const {fecha,asignatura} = req.params;
    
    mysqlConnection.query("SELECT pt.id_planilla_de_taller as codigo,pt.id_asignatura as codigo_asignatura,pt.Tcurso as curso,pt.division,pt.comision,pt.ciclo_lectivo,pt.Id_Profesor as codigo_profesor, p.nombre_y_apellido as profesor,DATE_FORMAT(pt.FechaInicio, '%Y-%m-%d') as fecha_inicio,DATE_FORMAT(pt.FechaFinalizacion, '%Y-%m-%d') as fecha_finalizacion, pt.Bimestre as bimestre FROM planilla_de_taller pt, profesores p, planilla_de_asistencia_por_alumnos pa where pt.id_asignatura = ? and pt.Id_Profesor = p.id_profesores and pt.id_planilla_de_taller = pa.id_planilla_de_taller and pa.Fecha = ? group by comision",[asignatura,fecha],
        (err,rows,fields) => {
            if(!err){
            	if(Object.keys(rows).length > 0){
            		res.json(rows[0]);
            	}else{
            		res.json(0);
            	}
                
            }else{
                res.json(0);
            }
    });
});



router.get('/comision/:fecha/:asignatura/:docente',(req,res) => {

    const {fecha,asignatura,docente} = req.params;
    
    mysqlConnection.query("SELECT pt.id_planilla_de_taller as codigo,pt.id_asignatura as codigo_asignatura,pt.Tcurso as curso,pt.division,pt.comision,pt.ciclo_lectivo,pt.Id_Profesor as codigo_profesor, p.nombre_y_apellido as profesor,DATE_FORMAT(pt.FechaInicio, '%Y-%m-%d') as fecha_inicio,DATE_FORMAT(pt.FechaFinalizacion, '%Y-%m-%d') as fecha_finalizacion, pt.Bimestre as bimestre FROM planilla_de_taller pt, profesores p, planilla_de_asistencia_por_alumnos pa where pt.id_asignatura = ? and pt.Id_Profesor = p.id_profesores and pt.id_planilla_de_taller = pa.id_planilla_de_taller and pt.Id_Profesor = ? and ? BETWEEN pt.FechaInicio and pt.FechaFinalizacion group by comision",[asignatura,docente,fecha],
        (err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
    });
});



router.get('/comision/:planilla_taller',(req,res) => {

    const {planilla_taller} = req.params;
    
    mysqlConnection.query("SELECT al.id_alumno as codigo, al.ApellidoyNombre as nombre_apellido FROM `alumnos_por_taller` alt, alumnos al WHERE alt.Id_Planilla_Taller = 66 and alt.Id_Alumno = al.id_alumno order by nombre_apellido ASC",[planilla_taller],
        (err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
    });
});

module.exports = router;