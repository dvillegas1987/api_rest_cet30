const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host:'8ef208b3e6cc.sn.mynetname.net:13306',
    user:'root',
    password:'6200591',
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
