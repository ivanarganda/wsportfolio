const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

const bodyParser = require("body-parser");

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));

//Importando la biblioteca nodemailer en tu archivo
const nodemailer = require("nodemailer"); 

const transporter = nodemailer.createTransport({ 
  /**
   * Para utilizar otro servicio de correo electrónico, como Yahoo o Outlook, debes
   * cambiar el valor de la propiedad service y ajustar la configuración de autenticación correspondiente.
   */
  service: "gmail",
  auth: {
    user: "ivanartista96@gmail.com",
    pass: "znuq dwbl wxra ekkg",
  },
});

const API_KEY = 'rnd_n8GiDBzS6xnXLrk11SEbQ7l85hrw';

const allowedOrigins = ['https://igvdeveloper.com', 'http://localhost:5173', 'https://igvdeveloper-ws-com.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get('/download/:key', (req, res) => {

  let json_message = {'Error':401, 'Msg':'No autorized to download'};

  if ( req.params.key !== API_KEY ){

    res.status(401).json( json_message );

  } else {

    res.download(__dirname + '/documents/cv.pdf');

  }
});

app.post('/sendemail',(req,res)=>{

  const mailOptions = {
    from: req.body.from,
    to: 'ivanartista96@gmail.com',
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).json('Email error');
      console.log("Error al enviar el correo:", error);
    } else {
      res.status(200).json('Email sent ' + req.body );
      console.log("Correo enviado:", info.response); 
    } 
  }); 

}) 

// Catch-all route handler for unknown paths
app.all('*', (req, res) => {

  let json_message = { 'Error': 404, 'Msg': 'Not found services path ' + req.originalUrl };

  res.status(404).json(json_message);
  console.log(json_message);

});

server.listen(3000);
