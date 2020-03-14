const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host:'8ef208b3e6cc.sn.mynetname.net:12222',
    user:'root',
    password:'6200591',
    port:'13306',
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
