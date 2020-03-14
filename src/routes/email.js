const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

router.post('/email',(req,res) => {

	const {alumno,fecha,asignatura,correo} = req.body;

	if(correo != "" || correo != null)
	{

		    var transporter = nodemailer.createTransport({
		      service: 'gmail', //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
		      host: 'smtp.gmail.com',
		      port: 465,
		      secure: true,
		      auth: {
		        user: 'cet30.desarrollo@gmail.com',
		        pass: 'Paraguay1050'
		      },
		      //proxy: 'http://proxy-chain.intel.com:911'
		    });

		    var cuerpo_mail = [];

		    if(correo == 'cet30.desarrollo@gmail.com')
		    {
			    var cuerpo_mail = [

			 		"<div style='max-width:550px;font-family:Arial, Helvetica, sans-serif;padding: 15px;border-width:1px;border-radius:4px; border-style:solid; border-color:#000;border-width: 2px;'><div style='background-color:#FE2E2E;padding:12px;border-radius:4px;'>",
			            "<div align='center' style='color:white;font-size:16px'><b>NOTIFICACIÓN DE INASISTENCIA</b></div>",
			            "<div align='center' style='color:white;font-size:12.5px'><b>CET N°30</b></div>",
			            "</div>&nbsp;",
			            "<div style='padding: 8px;border-width:1px;border-radius:4px; border-style:solid; border-color:#000;border-width: 2px;'>",
			                "<div  style='padding-left: 8px;padding-top: 1px;'>",
			                	"Se notifica que los correos fueron <b style='color:red'>RECHAZADOS</b> el día de la fecha <b>"+fecha+"</b> correspondiente a él/la alumno/a <b>"+alumno+"</b> en el taller de <b>"+asignatura+"</b>.",
			                "</div>",
			            "</div>&nbsp;",

			            "<div align='center' style='padding-top: 8px;'><span>",
			            	"<img style='width:30%' src='https://www.cet30.edu.ar/images/logos/logo-trans-300.png' />",
			            "</div>",
			        "</div>"

			 	].join("");

		    }else{

		    

			 	var cuerpo_mail = [

			 		"<div style='max-width:550px;font-family:Arial, Helvetica, sans-serif;padding: 15px;border-width:1px;border-radius:4px; border-style:solid; border-color:#000;border-width: 2px;'><div style='background-color:#015db0;padding:12px;border-radius:4px;'>",
			            "<div align='center' style='color:white;font-size:16px'><b>NOTIFICACIÓN DE INASISTENCIA</b></div>",
			            "<div align='center' style='color:white;font-size:12.5px'><b>CET N°30</b></div>",
			            "</div>&nbsp;",
			            "<div style='padding: 8px;border-width:1px;border-radius:4px; border-style:solid; border-color:#000;border-width: 2px;'>",
			                "<div  style='padding-left: 8px;padding-top: 1px;'>",
			                	"Desde el establecimiento se notifica que el día de la fecha <b>"+fecha+"</b> él/la alumno/a <b>"+alumno+"</b> se encuentra <b style='color:red'>AUSENTE</b> en el taller de <b>"+asignatura+"</b>.",
			                "</div>",
			            "</div>&nbsp;",


			            "<div align='center' style='padding-top: 8px;'><span>",

			            	"<img style='width:30%' src='https://www.cet30.edu.ar/images/logos/logo-trans-300.png' />",

			            "</div>",
			        "</div>"

			 	].join("");
			}


	 		var mailOptions = {
		      from: 'delfor87@gmail.com',
		      to: correo,
		      //to: 'dvillegas.soft@gmail.com',
		      subject: 'Notificación de inasistencia',
		      text: 'Su hijo/a se encuentra ausente el dia de hoy',
		      html:cuerpo_mail
		    };


		    transporter.sendMail(mailOptions, function (error, info) {

			    if(error){
	                res.json(0);
	            }else{
	                res.json(1);
	            }

		    });
			

	 	}

		    


});


module.exports = router;