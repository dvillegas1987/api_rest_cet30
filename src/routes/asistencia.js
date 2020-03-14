
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/asistencia/:fecha/:planilla_taller',(req,res) => {

    const {fecha,planilla_taller} = req.params;
    
    mysqlConnection.query("SELECT pa.id_planilla_de_asistencia as codigo, al.id_alumno as codigo_alumno, al.ApellidoyNombre as alumno,al.telefono_padre as telefono_padre,al.telefono_madre as telefono_madre,al.telefono_tutor1 as telefono_tutor1,al.telefono_tutor2 as telefono_tutor2,al.telefono_tutor3 as telefono_tutor3,al.mail_padre as mp,al.mail_madre as mm,al.mail_tutor1 as mt1,al.mail_tutor2 as mt2,al.mail_tutor3 as mt3,pt.id_asignatura as codigo_asignatura,(select DetalleAsignatura from asignaturas where IdAsignarutas = pt.id_asignatura) as asignatura,DATE_FORMAT(pa.Fecha ,'%Y-%m-%d') as fecha_asistencia,DATE_FORMAT(pa.Fecha ,'%d-%m-%Y') as fecha_asistencia_formateada, pa.Presente as presente, pa.LlegoTarde as llego_tarde FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.id_planilla_de_taller = ? and pa.Fecha = ? and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller",[planilla_taller,fecha],(err,rows,fields) => {
        if(!err){
        	if(rows.length > 0){
        		res.json(rows);
        	}else{
        		res.json(0);
        	}
            
        }else{ 
            res.json(0);
        }
    });
});

//se obtiene todas las inasistencias del dia de la fecha de taller
router.get('/asistencia/:fecha',(req,res) => {

    const {fecha} = req.params;
    
    mysqlConnection.query("SELECT pa.id_planilla_de_asistencia as codigo,pa.id_planilla_de_taller as planilla_taller, al.id_alumno as codigo_alumno, al.ApellidoyNombre as alumno,al.telefono_padre as telefono_padre,al.telefono_madre as telefono_madre,al.telefono_tutor1 as telefono_tutor1,al.telefono_tutor2 as telefono_tutor2,al.telefono_tutor3 as telefono_tutor3,al.mail_padre as mp,al.mail_madre as mm,al.mail_tutor1 as mt1,al.mail_tutor2 as mt2,al.mail_tutor3 as mt3,    pt.id_asignatura as codigo_asignatura,(select DetalleAsignatura from asignaturas where IdAsignarutas = pt.id_asignatura) as asignatura,DATE_FORMAT(pa.Fecha ,'%Y-%m-%d') as fecha_asistencia,DATE_FORMAT(pa.Fecha ,'%d-%m-%Y') as fecha_asistencia_formateada, pa.Presente as presente, pa.LlegoTarde as llego_tarde FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.Fecha = ? and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller and pa.Presente = 'NO'",[fecha],(err,rows,fields) => {
        if(!err){
        	if(rows.length > 0){
        		res.json(rows);
        	}else{
        		res.json(0);
        	}
            
        }else{ 
            res.json(0);
        }
    });
});


router.get('/asistencia/:fecha/:planilla_taller/:alumno',(req,res) => {

    const {fecha,planilla_taller,alumno} = req.params;
    
    mysqlConnection.query("SELECT pa.id_planilla_de_asistencia as codigo, al.id_alumno as codigo_alumno, al.ApellidoyNombre as alumno,pt.id_asignatura as codigo_asignatura,(select DetalleAsignatura from asignaturas where IdAsignarutas = pt.id_asignatura) as asignatura,DATE_FORMAT(pa.Fecha ,'%Y-%m-%d') as fecha_asistencia, pa.Presente as presente, pa.LlegoTarde as llego_tarde FROM planilla_de_asistencia_por_alumnos pa,alumnos al, planilla_de_taller pt WHERE pa.id_planilla_de_taller = ? and pa.Fecha = ? and pa.id_alumnos = al.id_alumno and pa.id_planilla_de_taller = pt.id_planilla_de_taller and al.id_alumno = ?",[planilla_taller,fecha,alumno],(err,rows,fields) => {
        if(!err){
            res.json(rows[0]);
        }else{ 
            res.json(0);
        }
    });
});


router.post('/asistencia',(req,res) => {

    const {planilla_taller,alumno,presente,llego_tarde} = req.body;
    
    mysqlConnection.query('insert into planilla_de_asistencia_por_alumnos (id_planilla_de_taller,id_alumnos,Fecha,Presente,LlegoTarde) values(?,?,NOW(),?,?)',[planilla_taller,alumno,presente,llego_tarde],
        (err,rows,fields) => {
            if(!err){
                res.json('Se ha guardado exitosamente!');
            }else{
                console.log(err);
            }
    });
});


module.exports = router;

/*SELECT c.codigo, cv.descripcion,pl.descripcion, p.nombre_comercial 
FROM cura c, plaga pl, producto p, cultivo cv 
where c.producto = p.codigo and c.cultivo = cv.codigo and c.plaga = pl.codigo*/