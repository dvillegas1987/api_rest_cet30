const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");

    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
    	res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    	return res.status(200).json({});
    }

    next();
});

//setting
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.json());

//routes
//app.use(require('./routes/notificaciones'));
app.use(require('./routes/asistencia'));
app.use(require('./routes/curso'));
app.use(require('./routes/estadistica'));
app.use(require('./routes/estadistica_general'));
app.use(require('./routes/orientacion'));
app.use(require('./routes/autenticacion'));
app.use(require('./routes/mesa'));
app.use(require('./routes/asignatura'));
app.use(require('./routes/comision'));
app.use(require('./routes/email'));
app.use(require('./routes/notificacion_inasistencia'));

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});