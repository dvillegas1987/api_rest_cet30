const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


router.get('/curso/:curso/:division/:ciclo_lectivo',(req,res) => {

    const {curso,division,ciclo_lectivo} = req.params;
    
    mysqlConnection.query("select * from alumnos_por_comisiones where Tcurso = ? and Division = ? and ciclo_lectivo = ?",[curso,division,ciclo_lectivo],
        (err,rows,fields) => {
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
    });
});

module.exports = router;
