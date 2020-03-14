const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'cet_30'

});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('La conexion ha sido exitosa!');
    }
});

module.exports = mysqlConnection;