const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.post('/notificaciones',(req,res) => {

    const {emisor,receptor,mensaje} = req.body;
    
    mysqlConnection.query('insert into notificaciones (emisor,receptor,mensaje,fecha_hora_mensaje) values(?,?,?,NOW())',[emisor,receptor,mensaje],
        (err,rows,fields) => {
            if(!err){
                res.json('Aplicación exitosa!');
            }else{
                console.log(err);
            }
    });
});

router.get('/notificaciones', (req,res) => {
	
    mysqlConnection.query('select * from notificaciones',(err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.put('/notificaciones',(req,res) => {

    const {codigo,estado} = req.body;
    
    mysqlConnection.query('update notificaciones set estado = ?, fecha_hora_lectura_mensaje = NOW() where codigo = ?',[estado,codigo],
        (err,rows,fields) => {
            if(!err){
                res.json('Finalización de cura exitosa!');
            }else{
                console.log(err);
            }
    });
});

module.exports = router;