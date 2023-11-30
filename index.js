const express = require('express'),
cors = require('cors'),
app = express(),
server = require('http').createServer(app);

const allowedOrigins = [ 'https://igvdeveloper.com' , 'http://localhost:5173', 'https://igvdeveloper-ws-com.onrender.com' ];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

let pathFound = true;

if ( app.mountpath  != '/download' || app.mountpath  != '/sendemail' ){ 

    pathFound = false;

}

if ( !pathFound ){

    app.get(app.mountpath , ( req , res)=>{
        res.send({
            'Error':404,
            'Msg':'Not found services path: /download or /sendemail'
        })
    }) 

}

app.get('/download', (req, res) => {
    const filePath = __dirname + '/documents/cv.pdf';

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');

    // Send the file for download
    res.download(filePath, 'cv.pdf', (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send({'Error':500,'Msg':'Internal Server Error'});
        } else {
            res.status(200).send({'OK':200,'Msg':'File sent succesfully'});
        }
    });
});

server.listen(3000)
