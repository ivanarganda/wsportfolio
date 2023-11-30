const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

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

app.get('/download', (req, res) => {
  res.download(__dirname + '/documents/cv.pdf');
});

// Catch-all route handler for unknown paths
app.all('*', (req, res) => {
  res.status(404).json({
    'Error': 404,
    'Msg': 'Not found services path ' + req.originalUrl,
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
