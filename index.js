const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

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

// Catch-all route handler for unknown paths
app.all('*', (req, res) => {

  let json_message = { 'Error': 404, 'Msg': 'Not found services path ' + req.originalUrl };

  res.status(404).json(json_message);
  console.log(json_message);

});

server.listen(3000);
